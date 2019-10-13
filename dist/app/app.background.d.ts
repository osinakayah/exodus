import { IBitCoinCli } from "./interfaces/i.bit.coin.cli";
export declare class AppBackground {
    private readonly mbitCoinCli;
    bitCoinCli: IBitCoinCli;
    constructor(mbitCoinCli: IBitCoinCli);
    loopThroughSingleBlock(blockHeight: number, blockHash?: string): Promise<void>;
    start(): void;
    getHexSectionFromOpReturnData(rawHex: string): string;
    emitDataToMainProcess(blockHash: string, transactionHash: string, opData: string): void;
    isNextBlockAvailable(blockDetails: any): boolean;
    getLastBlockStopped(): number;
    updateLastReadBlock(height: number): void;
    getBlockHeightCachePath(): string;
}
