import { Token, ConversionPaths, Contract } from './path_generation';
interface Settings {
    ethereumNodeEndpoint: string;
    eosNodeEndpoint: string;
    ethereumContractRegistryAddress?: string;
}
export declare function init(args: Settings): Promise<void>;
export declare const generatePath: (sourceToken: Token, targetToken: Token) => Promise<ConversionPaths>;
export declare const calculateRateFromPaths: (paths: ConversionPaths, amount: any) => any;
export declare function calculateRateFromPath(paths: ConversionPaths, amount: any): Promise<any>;
export declare const getRateByPath: (paths: ConversionPaths, amount: any) => Promise<any>;
export declare function getRate(sourceToken: Token, targetToken: Token, amount: string): Promise<any>;
export declare function retrieveContractVersion(nodeAddress: any, contract: Contract): Promise<{
    type: string;
    value: any;
}>;
export declare function fetchConversionEvents(nodeAddress: any, token: Token, fromBlock: any, toBlock: any): Promise<any[]>;
export declare function fetchConversionEventsByTimestamp(nodeAddress: any, token: Token, fromTimestamp: any, toTimestamp: any): Promise<any[]>;
declare const _default: {
    init: typeof init;
    getRate: typeof getRate;
    generatePath: (sourceToken: Token, targetToken: Token) => Promise<ConversionPaths>;
    getRateByPath: (paths: ConversionPaths, amount: any) => Promise<any>;
    retrieveContractVersion: typeof retrieveContractVersion;
    fetchConversionEvents: typeof fetchConversionEvents;
    fetchConversionEventsByTimestamp: typeof fetchConversionEventsByTimestamp;
};
export default _default;
