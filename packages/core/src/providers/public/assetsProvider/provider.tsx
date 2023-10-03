import { useCallback } from "react";
import { useQuery } from "react-query";
import { sendQueryToAppSync, isAssetPDEX } from "@orderbook/core/helpers";
import { getAllAssets } from "@orderbook/core/graphql/queries";
import { POLKADEX_ASSET, QUERY_KEYS } from "@orderbook/core/constants";

import { useSettingsProvider } from "../settings";

import { Provider } from "./context";
import * as T from "./types";

export const AssetsProvider: T.AssetsComponent = ({ children }) => {
  const { onHandleError } = useSettingsProvider();

  async function fetchAllAssetMetadata(): Promise<T.IPublicAsset[]> {
    const assetEntries = await sendQueryToAppSync({
      query: getAllAssets,
    });
    if (!assetEntries?.data?.getAllAssets) return [];
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

  const { isLoading, isSuccess, data } = useQuery<T.IPublicAsset[]>(
    QUERY_KEYS.assets(),
    fetchAllAssetMetadata,
    {
      onError: onHandleError,
      initialData: [],
    }
  );

  const selectGetAsset = useCallback(
    (
      assetId: string | number | Record<string, string>
    ): T.IPublicAsset | undefined => {
      if (!assetId || !data) {
        return;
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
        list: data ?? [],
        loading: isLoading,
        success: isSuccess,
        selectGetAsset,
      }}
    >
      {children}
    </Provider>
  );
};
