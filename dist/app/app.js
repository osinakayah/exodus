"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app_service_1 = require("./app.service");
const op_return_routes_1 = __importDefault(require("../op.return/op.return.routes"));
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
typeorm_1.createConnection().then(() => {
    const appService = new app_service_1.AppService();
    appService.startBitcoindProcess();
    appService.readBlockChainAndUpdateDatabase();
    appService.registerListeners();
});
const app = express_1.default();
app.use("/", op_return_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map