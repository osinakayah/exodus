import { AppBackground } from "./app.background";
import * as fs from 'fs';
import {MockBitCoinCli } from "./mock.bit.coin.cli";
import dotenv from 'dotenv';
dotenv.config();

describe("AppBackground Service", ()=> {

    let appBackroundTask: AppBackground;
    beforeAll(() => {
        appBackroundTask = new AppBackground(new MockBitCoinCli());
        try{
            const path = appBackroundTask.getBlockHeightCachePath();
            fs.unlinkSync(path);
        }
        catch (e) {}
    });

    afterAll(() => {
        try{
            const path = appBackroundTask.getBlockHeightCachePath();
            fs.unlinkSync(path);
        }
        catch (e) {}
    });


    test('Read Block Height from file', async ()=> {
        const blockHeight: number = await appBackroundTask.getLastBlockStopped();
        expect(blockHeight).toEqual(500000);
    });

    test('Update file in block', async ()=> {
        await appBackroundTask.updateLastReadBlock(500001);
        const blockHeight: number = await appBackroundTask.getLastBlockStopped();
        expect(blockHeight).toEqual(500001);
    });

    test('Cant Update file in block with smaller number', async ()=> {
        await appBackroundTask.updateLastReadBlock(500004);
        await appBackroundTask.updateLastReadBlock(500003);
        const blockHeight: number = await appBackroundTask.getLastBlockStopped();
        expect(blockHeight).toEqual(500004);
    });

    test('Get OP return data', ()=> {

        const mockEmitDataToMainProcess = jest.spyOn(appBackroundTask, 'emitDataToMainProcess');

        return appBackroundTask.loopThroughSingleBlock(1).then(() => {
            expect(mockEmitDataToMainProcess).toHaveBeenCalledWith('00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048', '999e1c837c76a1b7fbb7e57baf87b309960f5ffefbf2a9b95dd890602272f644', 'OP_RETURN 636861726c6579206c6f766573206865696469', 3);

        });

    });

    test('Does looping start when start() is called', async ()=> {
        jest.useFakeTimers();
        const mockLoopThroughSingleBlock = jest.spyOn(appBackroundTask, 'loopThroughSingleBlock');
        await appBackroundTask.start();
        expect(mockLoopThroughSingleBlock).not.toBeCalled();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(mockLoopThroughSingleBlock).toHaveBeenCalledTimes(1);

    });

    test ('Get Hex From OP_RETURN data Input invalid', () => {
        expect(appBackroundTask.getHexSectionFromOpReturnData('')).toEqual('')
        expect(appBackroundTask.getHexSectionFromOpReturnData(null)).toEqual('')
        expect(appBackroundTask.getHexSectionFromOpReturnData(undefined)).toEqual('')
    });

    test ('Get Hex From OP_RETURN data', () => {
        const rawData = 'OP_RETURN 636861726c6579206c6f766573206865696469';
        expect(appBackroundTask.getHexSectionFromOpReturnData(rawData)).toEqual('636861726c6579206c6f766573206865696469')
    });

    test('is Next block Available', () =>{
        let blockDetail: any = { hash:
                '000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd',
            confirmations: 40250,
            strippedsize: 215,
            size: 215,
            weight: 860,
            height: 2,
            version: 1,
            versionHex: '00000001',
            merkleroot:
                '9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
            tx:
                [ { txid:
                        '9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
                    hash:
                        '9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
                    version: 1,
                    size: 134,
                    vsize: 134,
                    weight: 536,
                    locktime: 0,
                    vin: [Array],
                    vout: [Array],
                    hex:
                        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d010bffffffff0100f2052a010000004341047211a824f55b505228e4c3d5194c1fcfaa15a456abdf37f9b9d97a4040afc073dee6c89064984f03385237d92167c13e236446b417ab79a0fcae412ae3316b77ac00000000' } ],
            time: 1231469744,
            mediantime: 1231469665,
            nonce: 1639830024,
            bits: '1d00ffff',
            difficulty: 1,
            chainwork:
                '0000000000000000000000000000000000000000000000000000000300030003',
            nTx: 1,
            previousblockhash:
                '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
            nextblockhash:
                '0000000082b5015589a3fdf2d4baff403e6f0be035a5d9742c1cae6295464449' };

        let isNextHasAvailabl = appBackroundTask.isNextBlockAvailable(blockDetail);
        expect(isNextHasAvailabl).toBeTruthy();
        // A cleaner implementation is to have the sample block detail json on a different file and import it, but i used this for brevity sake
        blockDetail =  { hash:
                '000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd',
            confirmations: 40250,
            strippedsize: 215,
            size: 215,
            weight: 860,
            height: 2,
            version: 1,
            versionHex: '00000001',
            merkleroot:
                '9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
            tx:
                [ { txid:
                        '9b0fc92260312ce44e74' +
                        'ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
                    hash:
                        '9b0fc92260312ce44e74ef369f5c66bbb85848f2eddd5a7a1cde251e54ccfdd5',
                    version: 1,
                    size: 134,
                    vsize: 134,
                    weight: 536,
                    locktime: 0,
                    vin: [Array],
                    vout: [Array],
                    hex:
                        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d010bffffffff0100f2052a010000004341047211a824f55b505228e4c3d5194c1fcfaa15a456abdf37f9b9d97a4040afc073dee6c89064984f03385237d92167c13e236446b417ab79a0fcae412ae3316b77ac00000000' } ],
            time: 1231469744,
            mediantime: 1231469665,
            nonce: 1639830024,
            bits: '1d00ffff',
            difficulty: 1,
            chainwork:
                '0000000000000000000000000000000000000000000000000000000300030003',
            nTx: 1,
            previousblockhash:
                '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048', };

        isNextHasAvailabl = appBackroundTask.isNextBlockAvailable(blockDetail);
        expect(isNextHasAvailabl).toBeFalsy();
    });
});
