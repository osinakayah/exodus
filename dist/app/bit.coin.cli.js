"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_core_1 = __importDefault(require("bitcoin-core"));
class BitCoinCli {
    constructor() {
        this.bitCoinCli = this.initBitcoinClient();
    }
    async getBlock(blockHash) {
        return await this.bitCoinCli.getBlock(blockHash, 2);
    }
    async getBlockHash(blockHeight) {
        return await this.bitCoinCli.getBlockHash(blockHeight);
    }
    initBitcoinClient() {
        return new bitcoin_core_1.default({
            username: process.env.RPC_USERNAME,
            password: process.env.RPC_PASSWORD,
        });
    }
}
exports.BitCoinCli = BitCoinCli;
//# sourceMappingURL=bit.coin.cli.js.map