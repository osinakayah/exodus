"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const op_return_service_1 = require("../op.return/op.return.service");
class AppService {
    constructor() {
        this.opreturnService = new op_return_service_1.OpReturnService();
    }
    startBitcoindProcess() {
        child_process_1.exec('./node_modules/bitcoind/bin/bitcoind -txindex -daemon');
    }
    readBlockChainAndUpdateDatabase() {
        this.backgroundProccess = child_process_1.fork(__dirname + '/background.index.js');
    }
    registerListeners() {
        this.backgroundProccess.on('message', async (msg) => {
            await this.opreturnService.saveTransactionOpDetails(msg.blockHash, msg.opData, msg.transactionHash);
        });
    }
}
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map