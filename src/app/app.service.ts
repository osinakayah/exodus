import { exec, fork, ChildProcess } from 'child_process';
import { OpReturnService } from "../op.return/op.return.service";



export class AppService {

    private backgroundProccess: ChildProcess;
    private opreturnService: OpReturnService;

    constructor() {

        this.opreturnService = new OpReturnService();
    }

    startBitcoindProcess() {
        exec('./node_modules/bitcoind/bin/bitcoind -txindex -daemon');
    }


    readBlockChainAndUpdateDatabase() {
        this.backgroundProccess = fork(__dirname+'/background.index.js');
    }

    registerListeners() {
        this.backgroundProccess.on('message', async (msg) => {
            await this.opreturnService.saveTransactionOpDetails(msg.blockHash, msg.opData, msg.transactionHash);
        });
    }
}
