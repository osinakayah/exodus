
import * as fs from 'fs';
import {IBitCoinCli} from "./interfaces/i.bit.coin.cli";


export class AppBackground {

    bitCoinCli: IBitCoinCli;

    constructor(private readonly mbitCoinCli: IBitCoinCli ){
        this.bitCoinCli = mbitCoinCli;
    }


     async loopThroughSingleBlock(blockHeight: number, blockHash: string = null){
        try {
            if (blockHash == null) {
                blockHash = await this.bitCoinCli.getBlockHash(blockHeight)
            }


            const blockDetails: any = await this.bitCoinCli.getBlock(blockHash);


            const numberOfTransactionsInBlock = blockDetails.tx.length;

            for (let i = 0; i < numberOfTransactionsInBlock; i++) {
                const singleTx = blockDetails.tx[i];
                this.emitDataToMainProcess(blockHash, singleTx.txid, singleTx.vout[0].scriptPubKey.asm);
            }

            if (this.isNextBlockAvailable(blockDetails)) {
                this.updateLastReadBlock(blockDetails.height + 1);
                // To prevent deep recursion stack
                setTimeout(()=> {
                    return this.loopThroughSingleBlock(blockDetails.height + 1, blockDetails.nextblockhash);
                }, 2000);
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
            setTimeout(() => {
                return this.loopThroughSingleBlock(blockHeight);
            }, 30 *  60 * 1000);
        }
    }

    start() {
        const startHeight = this.getLastBlockStopped();

        // Slight delay waiting for blocks to be indexed
        setTimeout(() => {
            return this.loopThroughSingleBlock(startHeight);
        }, 20 * 1000);

    }

    getHexSectionFromOpReturnData(rawHex: string): string{
        if (rawHex) {
            return rawHex.substring(10);
        }
        return '';
    }

    emitDataToMainProcess(blockHash: string, transactionHash: string, opData: string){
        process.send({blockHash, transactionHash, opData: this.getHexSectionFromOpReturnData(opData)});
    }

    isNextBlockAvailable(blockDetails: any): boolean{
        if (blockDetails.hasOwnProperty('nextblockhash') && blockDetails.nextblockhash){
            return true;
        }
        return false;
    }

    getLastBlockStopped(): number{
        const path = this.getBlockHeightCachePath();
        try {
            // I preferred to read the fine synchronously to prevent bugs, the fact the process will block was not an
            // issue for me since i am in the background process, and most importantly it was a simple task
            return parseInt(fs.readFileSync(path).toString());
        }
        catch (e) {
            fs.writeFileSync(path, 500000);
            return 500000;
        }
    }
    updateLastReadBlock(height: number): void{
        const currentValue: number = this.getLastBlockStopped();
        if (currentValue >= height) {
            return
        }
        const path = this.getBlockHeightCachePath();
        fs.writeFileSync(path, height);
    }

    getBlockHeightCachePath(): string {
        return __dirname+'/current_height';
    }

}

// new AppBackground().start();
