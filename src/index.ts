import { Core } from "./core";
import { History } from "./history";
import { Pricing } from "./pricing";
import { Utils } from "./utils";
import { Settings } from "./types";
import { Converters } from "./converters";

/**
 * Main SDK object, should be instantiated using the `create` static method
 */
export class SDK {
  /** History module */
  history: History = null;
  /** Pricing module */
  pricing: Pricing = null;
  /** Utils module */
  utils: Utils = null;
  /** Utils module */
  converters: Converters = null;
  /** @internal */
  _core = new Core();

  /**
   * creates and initializes a new SDK object
   * should be called as the first step before using the SDK
   *
   * @param settings   initialization settings
   *
   * @returns  new SDK object
   */
  static async create(settings: Settings): Promise<SDK> {
    const sdk = new SDK();
    await sdk._core.create(settings);
    sdk.history = new History(sdk._core);
    sdk.pricing = new Pricing(sdk._core);
    sdk.utils = new Utils(sdk._core);
    sdk.converters = new Converters(sdk._core);
    return sdk;
  }

  /**
   * cleans up and destroys an existing SDK object
   * should be called as the last step after the SDK work is complete to free up resources
   *
   * @param sdk   sdk object
   */
  static async destroy(sdk: SDK): Promise<void> {
    sdk.history = null;
    sdk.pricing = null;
    sdk.utils = null;
    sdk.converters = null;
    await sdk._core.destroy();
  }

  /**
   * refreshes the local cache with data from the converter registry
   * should be called periodically to support new pools
   */
  async refresh(): Promise<void> {
    await this._core.refresh();
  }
}
