"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const op_return_service_1 = require("./op.return.service");
class OpReturnController {
    async getTransactionDetails(req, res) {
        const opReturnService = new op_return_service_1.OpReturnService();
        const response = await opReturnService.fetchTransaction(req.params.opReturnData);
        res.status(response.statusCode);
        return res.json(response);
    }
}
exports.OpReturnController = OpReturnController;
//# sourceMappingURL=op.return.controller.js.map