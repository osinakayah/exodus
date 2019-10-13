import { OpReturnService } from "./op.return.service";

describe('OpReturnService Test', ()=> {
    test('decodes hash successfully', () => {
        const opReturnService: OpReturnService = new OpReturnService();
        expect(opReturnService.decodeMessage('636861726c6579206c6f766573206865696469')).toEqual('charley loves heidi');
    });
});

