export declare class OpReturnService {
    private getUserRepository;
    saveTransactionOpDetails(blockHash: string, opReturnData: string, transactionHash: string): Promise<void>;
    fetchTransaction(opReturnData: string): Promise<any>;
    private formatResponseToController;
    decodeMessage(opReurnDataHex: string): string;
}
