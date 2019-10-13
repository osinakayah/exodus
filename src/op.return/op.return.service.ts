import {Repository, getRepository} from "typeorm"
import { OpReturnEntity } from "./op.return.entity";

export class OpReturnService {

    private getUserRepository(): Repository<OpReturnEntity>{
        return getRepository(OpReturnEntity);
    }

    async saveTransactionOpDetails(blockHash: string, opReturnData: string, transactionHash: string){
        const newOpRecordData: OpReturnEntity = new OpReturnEntity();

        newOpRecordData.blockHash = blockHash;
        newOpRecordData.opReturnData = opReturnData;
        newOpRecordData.transactionHash = transactionHash;

        const userRepository = this.getUserRepository();

        await userRepository.save(newOpRecordData);
    }
    async fetchTransaction(opReturnData: string){


        try {
            const userRepository = this.getUserRepository();
            const existingRecord: OpReturnEntity = await userRepository.findOne({opReturnData});
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
            throw new Error('Error trying to retrieve data');
        }
    }

    private formatResponseToController(statusCode: number, message: string, data: any): any{
        return {
            statusCode,
            message,
            data
        }
    }

    decodeMessage(opReurnDataHex: string): string{
        let decodedMessage = '';
        for (let i = 0; (i < opReurnDataHex.length && opReurnDataHex.substr(i, 2) !== '00'); i += 2){
            decodedMessage += String.fromCharCode(parseInt(opReurnDataHex.substr(i, 2), 16));
        }
        return decodedMessage;
    }
}
