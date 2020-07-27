import { Settings, BlockchainType, Token, Blockchain } from './types';
export declare class Core {
    blockchains: Partial<Record<BlockchainType, Blockchain>>;
    create(settings: Settings): Promise<void>;
    destroy(): Promise<void>;
    refresh(): Promise<void>;
    getPaths(sourceToken: Token, targetToken: Token, amount?: string): Promise<Token[][]>;
    getPathAndRate(sourceToken: Token, targetToken: Token, amount?: string): Promise<{
        path: Token[];
        rate: string;
    }>;
    getRateByPath(path: Token[], amount?: string): Promise<string>;
    private getPathsFunction;
    private getRates;
    private static getBest;
    private static betterRate;
    private static equalRate;
    private static betterPath;
}
