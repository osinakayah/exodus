import { IBitCoinCli } from "./interfaces/i.bit.coin.cli";
export declare class MockBitCoinCli implements IBitCoinCli {
    getBlock(blockHash: string): Promise<{
        "hash": string;
        "confirmations": number;
        "strippedsize": number;
        "size": number;
        "weight": number;
        "height": number;
        "version": number;
        "versionHex": string;
        "merkleroot": string;
        "tx": {
            "txid": string;
            "hash": string;
            "version": number;
            "size": number;
            "vsize": number;
            "weight": number;
            "locktime": number;
            "vin": {
                "coinbase": string;
                "sequence": number;
            }[];
            "vout": {
                "value": number;
                "n": number;
                "scriptPubKey": {
                    "asm": string;
                    "hex": string;
                    "reqSigs": number;
                    "type": string;
                    "addresses": string[];
                };
            }[];
            "hex": string;
        }[];
        "time": number;
        "mediantime": number;
        "nonce": number;
        "bits": string;
        "difficulty": number;
        "chainwork": string;
        "nTx": number;
        "previousblockhash": string;
    }>;
    getBlockHash(blockHeight: number): Promise<string>;
}
