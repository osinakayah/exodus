import "reflect-metadata";
import dotenv from 'dotenv';
import express from "express";
import { AppService } from "./app.service";
import opReturnDataROutes from '../op.return/op.return.routes';
import {createConnection} from "typeorm";
dotenv.config();

createConnection().then(()=> {

    const appService: AppService = new AppService();

    appService.startBitcoindProcess();
    appService.readBlockChainAndUpdateDatabase();
    appService.registerListeners()
})

const app = express();



app.use("/", opReturnDataROutes);

export default app
