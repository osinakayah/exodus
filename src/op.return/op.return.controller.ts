import { OpReturnService } from "./op.return.service";
import  {Request, Response,} from "express";

export  class OpReturnController {

    async getTransactionDetails(req: Request, res: Response){
        const opReturnService: OpReturnService  = new OpReturnService();

        const response =  await opReturnService.fetchTransaction(req.params.opReturnData);

        res.status(response.statusCode);
        return res.json(response);
    }
}
