"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockBitCoinCli {
    async getBlock(blockHash) {
        return {
            "hash": "0000000082b5015589a3fdf2d4baff403e6f0be035a5d9742c1cae6295464449",
            "confirmations": 156536,
            "strippedsize": 215,
            "size": 215,
            "weight": 860,
            "height": 3,
            "version": 1,
            "versionHex": "00000001",
            "merkleroot": "999e1c837c76a1b7fbb7e57baf87b309960f5ffefbf2a9b95dd890602272f644",
            "tx": [{
                    "txid": "999e1c837c76a1b7fbb7e57baf87b309960f5ffefbf2a9b95dd890602272f644",
                    "hash": "999e1c837c76a1b7fbb7e57baf87b309960f5ffefbf2a9b95dd890602272f644",
                    "version": 1,
                    "size": 134,
                    "vsize": 134,
                    "weight": 536,
                    "locktime": 0,
                    "vin": [{ "coinbase": "04ffff001d010e", "sequence": 4294967295 }],
                    "vout": [{
                            "value": 50,
                            "n": 0,
                            "scriptPubKey": {
                                "asm": "OP_RETURN 636861726c6579206c6f766573206865696469",
                                "hex": "410494b9d3e76c5b1629ecf97fff95d7a4bbdac87cc26099ada28066c6ff1eb9191223cd897194a08d0c2726c5747f1db49e8cf90e75dc3e3550ae9b30086f3cd5aaac",
                                "reqSigs": 1,
                                "type": "pubkey",
                                "addresses": ["1FvzCLoTPGANNjWoUo6jUGuAG3wg1w4YjR"]
                            }
                        }],
                    "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d010effffffff0100f2052a0100000043410494b9d3e76c5b1629ecf97fff95d7a4bbdac87cc26099ada28066c6ff1eb9191223cd897194a08d0c2726c5747f1db49e8cf90e75dc3e3550ae9b30086f3cd5aaac00000000"
                }],
            "time": 1231470173,
            "mediantime": 1231469744,
            "nonce": 1844305925,
            "bits": "1d00ffff",
            "difficulty": 1,
            "chainwork": "0000000000000000000000000000000000000000000000000000000400040004",
            "nTx": 1,
            "previousblockhash": "000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd",
        };
    }
    async getBlockHash(blockHeight) {
        return '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048';
    }
}
exports.MockBitCoinCli = MockBitCoinCli;
//# sourceMappingURL=mock.bit.coin.cli.js.map