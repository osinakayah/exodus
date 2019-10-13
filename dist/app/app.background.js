"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class AppBackground {
    constructor(mbitCoinCli) {
        this.mbitCoinCli = mbitCoinCli;
        this.bitCoinCli = mbitCoinCli;
    }
    async loopThroughSingleBlock(blockHeight, blockHash = null) {
        try {
            if (blockHash == null) {
                blockHash = await this.bitCoinCli.getBlockHash(blockHeight);
            }
            const blockDetails = await this.bitCoinCli.getBlock(blockHash);
            const numberOfTransactionsInBlock = blockDetails.tx.length;
            for (let i = 0; i < numberOfTransactionsInBlock; i++) {
                const singleTx = blockDetails.tx[i];
                this.emitDataToMainProcess(blockHash, singleTx.txid, singleTx.vout[0].scriptPubKey.asm);
            }
            if (this.isNextBlockAvailable(blockDetails)) {
                this.updateLastReadBlock(blockDetails.height + 1);
                setTimeout(() => {
                    return this.loopThroughSingleBlock(blockDetails.height + 1, blockDetails.nextblockhash);
                }, 2000);
            }
            else {
                setTimeout(() => {
                    return this.loopThroughSingleBlock(blockDetails.height + 1);
                }, 30 * 60 * 1000);
            }
        }
        catch (e) {
            setTimeout(() => {
                return this.loopThroughSingleBlock(blockHeight);
            }, 30 * 60 * 1000);
        }
    }
    start() {
        const startHeight = this.getLastBlockStopped();
        setTimeout(() => {
            return this.loopThroughSingleBlock(1);
        }, 20 * 1000);
    }
    getHexSectionFromOpReturnData(rawHex) {
        if (rawHex) {
            return rawHex.substring(10);
        }
        return '';
    }
    emitDataToMainProcess(blockHash, transactionHash, opData) {
        process.send({ blockHash, transactionHash, opData: this.getHexSectionFromOpReturnData(opData) });
    }
    isNextBlockAvailable(blockDetails) {
        if (blockDetails.hasOwnProperty('nextblockhash') && blockDetails.nextblockhash) {
            return true;
        }
        return false;
    }
    getLastBlockStopped() {
        const path = this.getBlockHeightCachePath();
        try {
            return parseInt(fs.readFileSync(path).toString());
        }
        catch (e) {
            fs.writeFileSync(path, 500000);
            return 500000;
        }
    }
    updateLastReadBlock(height) {
        const currentValue = this.getLastBlockStopped();
        if (currentValue >= height) {
            return;
        }
        const path = this.getBlockHeightCachePath();
        fs.writeFileSync(path, height);
    }
    getBlockHeightCachePath() {
        return __dirname + '/current_height';
    }
}
exports.AppBackground = AppBackground;
//# sourceMappingURL=app.background.js.map