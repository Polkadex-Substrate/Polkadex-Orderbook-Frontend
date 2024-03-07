import { ApiPromise, WsProvider } from "@polkadot/api";
import { RECONNECT_TIME_MS } from "@orderbook/core/providers/public/nativeApi/constants";
import { apiTypes } from "@polkadex/polkadex-api";

export interface Statics {
  api: ApiPromise;
}

export const statics: Statics = {
  api: undefined as unknown as ApiPromise,
};

export async function createApi(apiUrl: string[]): Promise<void> {
  const provider = new WsProvider(apiUrl, RECONNECT_TIME_MS);
  statics.api = new ApiPromise({
    provider,
    ...apiTypes,
  });
}
