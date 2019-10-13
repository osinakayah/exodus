import { IBitCoinCli } from "./interfaces/i.bit.coin.cli";
import Client from 'bitcoin-core';
export declare class BitCoinCli implements IBitCoinCli {
    bitCoinCli: Client;
    constructor();
    getBlock(blockHash: string): Promise<any>;
    getBlockHash(blockHeight: number): Promise<string>;
    private initBitcoinClient;
}
