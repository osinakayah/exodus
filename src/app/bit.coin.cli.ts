import {IBitCoinCli} from "./interfaces/i.bit.coin.cli";
import Client from 'bitcoin-core'

export class BitCoinCli implements IBitCoinCli{
    bitCoinCli: Client;
    constructor() {
        this.bitCoinCli = this.initBitcoinClient();
    }

    async getBlock(blockHash: string): Promise<any> {
        return await this.bitCoinCli.getBlock(blockHash, 2);
    }

    async getBlockHash(blockHeight: number): Promise<string> {
        return await this.bitCoinCli.getBlockHash(blockHeight);
    }

    private initBitcoinClient(): Client {
        return new Client({
            username: process.env.RPC_USERNAME,
            password: process.env.RPC_PASSWORD,
        });
    }
}
