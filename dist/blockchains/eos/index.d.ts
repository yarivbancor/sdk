import { JsonRpc } from 'eosjs';
import { Blockchain, Converter, ConversionEvent, Token } from '../../types';
export declare class EOS implements Blockchain {
    jsonRpc: JsonRpc;
    converters: any;
    static create(nodeEndpoint: string): Promise<EOS>;
    static destroy(eos: EOS): Promise<void>;
    refresh(): Promise<void>;
    getAnchorToken(): Token;
    getPaths(from: Token, to: Token): Promise<Token[][]>;
    getRates(paths: Token[][], amount: string): Promise<string[]>;
    getConverterVersion(converter: Converter): Promise<string>;
    getConversionEvents(token: Token, fromBlock: number, toBlock: number): Promise<ConversionEvent[]>;
    getConversionEventsByTimestamp(token: Token, fromTimestamp: number, toTimestamp: number): Promise<ConversionEvent[]>;
    private getRateByPath;
    private getConverters;
    private getConverterSettings;
    private getSmartTokenStat;
    private getReserves;
    private getReserveBalance;
    private getConversionRate;
    private getTokenSmartTokens;
    private getPathToAnchor;
    private static getShortestPath;
    private static getReserve;
    private static getBalance;
    private static getSymbol;
    private static getDecimals;
}
