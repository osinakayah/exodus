export interface IBitCoinCli {
    getBlockHash: (blockHeight: number)=>Promise<string>,
    getBlock: (blockHash: string) => Promise<any>,
}
