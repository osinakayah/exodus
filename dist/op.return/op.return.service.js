"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const op_return_entity_1 = require("./op.return.entity");
class OpReturnService {
    getUserRepository() {
        return typeorm_1.getRepository(op_return_entity_1.OpReturnEntity);
    }
    async saveTransactionOpDetails(blockHash, opReturnData, transactionHash) {
        const newOpRecordData = new op_return_entity_1.OpReturnEntity();
        newOpRecordData.blockHash = blockHash;
        newOpRecordData.opReturnData = opReturnData;
        newOpRecordData.transactionHash = transactionHash;
        const userRepository = this.getUserRepository();
        await userRepository.save(newOpRecordData);
    }
    async fetchTransaction(opReturnData) {
        try {
            const userRepository = this.getUserRepository();
            const existingRecord = await userRepository.findOne({ opReturnData });
            if (existingRecord) {
                return this.formatResponseToController(200, "Transaction Found", {
                    tx: existingRecord.transactionHash,
                    hash: existingRecord.blockHash,
                    decodedMessage: this.decodeMessage(opReturnData)
                });
            }
            else {
                return this.formatResponseToController(404, "Transaction Not Found", {});
            }
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    formatResponseToController(statusCode, message, data) {
        return {
            statusCode,
            message,
            data
        };
    }
    decodeMessage(opReurnDataHex) {
        let decodedMessage = '';
        for (let i = 0; (i < opReurnDataHex.length && opReurnDataHex.substr(i, 2) !== '00'); i += 2) {
            decodedMessage += String.fromCharCode(parseInt(opReurnDataHex.substr(i, 2), 16));
        }
        return decodedMessage;
    }
}
exports.OpReturnService = OpReturnService;
//# sourceMappingURL=op.return.service.js.map