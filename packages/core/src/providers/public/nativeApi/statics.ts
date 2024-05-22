import { ApiPromise, WsProvider } from "@polkadot/api";
import { RECONNECT_TIME_MS } from "@orderbook/core/providers/public/nativeApi/constants";
import { apiTypes } from "@polkadex/polkadex-api";
import { apiOptions } from "@polkadex/blockchain-api";
import { orderbookTypes } from "@orderbook/core/providers/public/nativeApi/types";

export interface Statics {
  api: ApiPromise;
}

export const statics: Statics = {
  api: undefined as unknown as ApiPromise,
};
const { runtime, rpc, types } = apiOptions;
export async function createApi(apiUrl: string[]): Promise<void> {
  const provider = new WsProvider(apiUrl, RECONNECT_TIME_MS);
  statics.api = new ApiPromise({
    provider,
    runtime: { ...runtime, ...apiTypes.runtime },
    types: { ...types, ...orderbookTypes },
    rpc: { ...rpc, ...apiTypes.rpc },
    signedExtensions: {
      ChargeAssetTxPayment: {
        extrinsic: {
          tip: "Compact<Balance>",
          assetId: "Option<u128>",
        },
        payload: {},
      },
    },
  });
}
