"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const op_return_controller_1 = require("./op.return.controller");
const opReturnDataROutes = express_1.default.Router();
const opReturnController = new op_return_controller_1.OpReturnController();
opReturnDataROutes.get("/opreturn/:opReturnData", opReturnController.getTransactionDetails);
exports.default = opReturnDataROutes;
//# sourceMappingURL=op.return.routes.js.map