import { ConversionPathStep, Token } from '../../path_generation';
export declare function init(ethereumNodeUrl: any, ethereumContractRegistryAddress?: string): Promise<void>;
export declare const getTokenDecimals: (tokenBlockchainId: any) => Promise<any>;
export declare const getAmountInTokenWei: (token: string, amount: string) => Promise<any>;
export declare const getConversionReturn: (converterPair: ConversionPathStep, amount: string, ABI: any, web3: any) => Promise<any>;
export declare function getPathStepRate(converterPair: ConversionPathStep, amount: string): Promise<any>;
export declare const getConverterBlockchainId: (blockchainId: any) => Promise<any>;
export declare function getReserves(converterBlockchainId: any): Promise<{
    reserves: any;
}>;
export declare function getReservesCount(reserves: any): Promise<any>;
export declare const getConnectorBlokchainIdByPosition: (converterContract: any, i: any) => Promise<any>;
export declare function getReserveBlockchainId(converter: any, position: any): Promise<Token>;
export declare function getReserveToken(converterContract: any, i: any): Promise<Token>;
export declare function getSmartTokens(token: Token): Promise<any>;
