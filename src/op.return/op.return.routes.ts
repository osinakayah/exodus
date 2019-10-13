import  express, { Router} from "express";
import { OpReturnController } from "./op.return.controller";

const opReturnDataROutes: Router = express.Router();

const opReturnController = new OpReturnController();
opReturnDataROutes.get("/opreturn/:opReturnData",  opReturnController.getTransactionDetails);

export default opReturnDataROutes;
