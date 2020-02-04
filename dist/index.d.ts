import { Token, ConversionPaths } from './path_generation';
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
declare const _default: {
    init: typeof init;
    getRate: typeof getRate;
    generatePath: (sourceToken: Token, targetToken: Token) => Promise<ConversionPaths>;
    getRateByPath: (paths: ConversionPaths, amount: any) => Promise<any>;
};
export default _default;
