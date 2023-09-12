import { useCallback, useEffect, useReducer } from "react";

import { useSettingsProvider } from "../settings";

import * as A from "./actions";
import { Provider } from "./context";
import { assetsReducer, initialState } from "./reducer";
import * as T from "./types";

import { sendQueryToAppSync, isAssetPDEX } from "@/helpers";
import { getAllAssets } from "@/graphql/queries";
import { POLKADEX_ASSET } from "@/constants";

export const AssetsProvider: T.AssetsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(assetsReducer, initialState);
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

  const fetchAssets = useCallback(async () => {
    dispatch(A.assetsFetch());
    try {
      const assetsList = await fetchAllAssetMetadata();

      dispatch(A.assetsData({ list: assetsList }));
    } catch (error) {
      console.warn("something has gone wrong with fetchassets");
      onHandleError(
        `Something has gone wrong, could not fetch assets ${error}`,
      );
      dispatch(A.assetsError(error));
    }
  }, [onHandleError]);

  const selectGetAsset = useCallback(
    (
      assetId: string | number | Record<string, string>,
    ): T.IPublicAsset | undefined => {
      if (!assetId) {
        return;
      }
      if (typeof assetId === "object" && "asset" in assetId) {
        assetId = assetId.asset;
      }
      return isAssetPDEX(assetId.toString())
        ? POLKADEX_ASSET
        : state.list.find((asset) => asset.assetId === assetId.toString());
    },
    [state.list],
  );

  useEffect(() => {
    if (state.list?.length === 0) fetchAssets();
  }, [fetchAssets, state.list]);

  return (
    <Provider
      value={{
        ...state,
        fetchAssets,
        selectGetAsset,
      }}
    >
      {children}
    </Provider>
  );
};
