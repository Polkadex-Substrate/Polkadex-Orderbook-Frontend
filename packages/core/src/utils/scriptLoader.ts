import { loadScript } from "@orderbook/core/utils/documentHelpers";

export class ScriptLoader {
  static async load(src: string, debug = true): Promise<void> {
    try {
      await loadScript(src);
      if (debug) console.info(`[${this.name}] Script loaded: ${src}`);
    } catch (error) {
      if (debug) console.error(error);
      else throw error;
    }
  }
}
