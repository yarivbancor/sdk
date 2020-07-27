import { SDKModule } from "./sdk_module";

export class Converters extends SDKModule {
  async getAnchors(): Promise<string[]> {
    return this.core.blockchains.ethereum.getAnchors();
  }

  async getConvertibleTokens(): Promise<string[]> {
    return this.core.blockchains.ethereum.getConvertibleTokens();
  }
}
