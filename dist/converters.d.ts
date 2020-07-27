import { SDKModule } from "./sdk_module";
export declare class Converters extends SDKModule {
    getAnchors(): Promise<string[]>;
    getConvertibleTokens(): Promise<string[]>;
}
