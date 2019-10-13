"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const op_return_service_1 = require("./op.return.service");
describe('OpReturnService Test', () => {
    test('decodes hash successfully', () => {
        const opReturnService = new op_return_service_1.OpReturnService();
        expect(opReturnService.decodeMessage('636861726c6579206c6f766573206865696469')).toEqual('charley loves heidi');
    });
});
//# sourceMappingURL=op.return.test.js.map