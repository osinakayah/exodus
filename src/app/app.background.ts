
import * as fs from 'fs';
import {IBitCoinCli} from "./interfaces/i.bit.coin.cli";




export class AppBackground {

    bitCoinCli: IBitCoinCli;
    constructor(private readonly mbitCoinCli: IBitCoinCli ){
        this.bitCoinCli = mbitCoinCli;
    }


     async loopThroughSingleBlock(blockHeight: number, blockHash: string = null): Promise<any> {
        try {
            if (blockHash == null) {
                blockHash = await this.bitCoinCli.getBlockHash(blockHeight)
            }

            const blockDetails: any = await this.bitCoinCli.getBlock(blockHash);
            await this.updateLastReadBlock(blockDetails.height);

            const numberOfTransactionsInBlock = blockDetails.tx.length;

            for (let i = 0; i < numberOfTransactionsInBlock; i++) {
                const singleTx = blockDetails.tx[i];
                this.emitDataToMainProcess(blockHash, singleTx.txid, singleTx.vout[0].scriptPubKey.asm, blockDetails.height);
            }

            if (this.isNextBlockAvailable(blockDetails)) {
                return this.loopThroughSingleBlock(blockDetails.height + 1, blockDetails.nextblockhash);
            }
            else {
                // Blocks has been synced
                // Try to get block in the next 30 minutes
                setTimeout(() => {
                    return this.loopThroughSingleBlock(blockDetails.height + 1);
                }, 30 *  60 * 1000)
            }
        }
        catch (e) {
            console.error(e);
            setTimeout(() => {
                return this.loopThroughSingleBlock(blockHeight);
            }, 30 *  60 * 1000);
        }
    }

    async start() {
        const startHeight = await this.getLastBlockStopped();

        // Slight delay waiting for blocks to be indexed
        setTimeout(() => {
            return this.loopThroughSingleBlock(startHeight);
        }, 20 * 1000);

    }

    getHexSectionFromOpReturnData(rawHex: string): string{
        return rawHex? rawHex.substring(10): ''
    }

    emitDataToMainProcess(blockHash: string, transactionHash: string, opData: string, blockHeight: number){
        process.send({blockHeight, blockHash, transactionHash, opData: this.getHexSectionFromOpReturnData(opData)});
    }

    isNextBlockAvailable(blockDetails: any): boolean{
        return blockDetails.hasOwnProperty('nextblockhash');
    }

    async getLastBlockStopped(): Promise<number>{
        const path = this.getBlockHeightCachePath();
        try {
            const lastBlockHeight = await fs.promises.readFile(path);
            return parseInt(lastBlockHeight.toString());
        }
        catch (e) {
            // File doesnt exist
            const blockStartHeight: number = parseInt(process.env.BLOCK_START_HEIGHT);
            await fs.promises.writeFile(path, blockStartHeight);
            return blockStartHeight;
        }
    }
    async updateLastReadBlock(height: number){
        const currentValue: number =  await this.getLastBlockStopped();
        if (currentValue >= height) {
            return
        }
        const path = this.getBlockHeightCachePath();
        return await fs.promises.writeFile(path, height);
    }

    getBlockHeightCachePath(): string {
        return __dirname+'/current_height';
    }

}

