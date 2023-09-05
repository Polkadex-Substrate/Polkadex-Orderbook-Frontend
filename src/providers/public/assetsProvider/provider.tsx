import { useCallback } from "react";
import { useQuery } from "react-query";

import { useSettingsProvider } from "../settings";

import { Provider } from "./context";
import * as T from "./types";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllAssets } from "@polkadex/orderbook/graphql/queries";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { QUERY_KEYS } from "@polkadex/orderbook/utils/queryKeys";

export const AssetsProvider: T.AssetsComponent = ({ children }) => {
  const { onHandleError } = useSettingsProvider();

  async function fetchAllAssetMetadata(): Promise<T.IPublicAsset[]> {
    const assetEntries: any = await sendQueryToAppSync({ query: getAllAssets });
    const assets = assetEntries.data.getAllAssets.items;
    return assets.map((asset) => {
      return {
        assetId: asset.asset_id,
        name: asset.name,
        symbol: asset.symbol,
        withdrawal_fee: asset.withdrawal_fee,
      };
    });
  }

  const { isLoading, isSuccess, data } = useQuery(QUERY_KEYS.assets(), fetchAllAssetMetadata, {
    onError: onHandleError,
    initialData: [],
  });

  const selectGetAsset = useCallback(
    (assetId: string | number | Record<string, string>): T.IPublicAsset | null => {
      if (!assetId) {
        return null;
      }
      if (typeof assetId === "object" && "asset" in assetId) {
        assetId = assetId.asset;
      }
      return isAssetPDEX(assetId.toString())
        ? POLKADEX_ASSET
        : data.find((asset) => asset.assetId === assetId.toString());
    },
    [data]
  );

  return (
    <Provider
      value={{
        loading: isLoading,
        success: isSuccess,
        list: data,
        selectGetAsset,
      }}>
      {children}
    </Provider>
  );
};
