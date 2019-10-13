export declare class AppService {
    private backgroundProccess;
    private opreturnService;
    constructor();
    startBitcoindProcess(): void;
    readBlockChainAndUpdateDatabase(): void;
    registerListeners(): void;
}
