import { useReducer } from "react";

import * as A from "./actions";
import { Provider } from "./context";
import { assetsReducer, initialState } from "./reducer";
import * as T from "./types";
import { fetchAllFromAppSync, sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllAssets } from "@polkadex/orderbook/graphql/queries";
import { isKeyPresentInObject } from "@polkadex/orderbook/helpers/isKeyPresentInObject";
import { POLKADEX_ASSET } from "@polkadex/web-constants";

export const AssetsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assetsReducer, initialState);
  const fetchAssets = async () => {
    try {
      const assetsList: T.IPublicAsset[] = await (() => fetchAllAssetMetadata())();

      // const allowedList = assetsList.filter((asset) =>
      //   ALLOWED_ASSET_IDS.includes(asset.assetId)
      // );
      // const assetIdMap = assetsList.reduce((acc, asset) => {
      //   acc[asset.asset_id] = asset;
      //   return acc;
      // }, {});
      dispatch(A.assetsData({ list: assetsList }));
    } catch (error) {
      console.warn("something has gone wrong with fetchassets");
    }
  };

  async function fetchAllAssetMetadata(): Promise<T.IPublicAsset[]> {
    const assetEntries: any = await sendQueryToAppSync({ query: getAllAssets });

    const assets = assetEntries.data.getAllAssets.items;
    return assets;
  }

  const selectAssetsFetchSuccess = () => {
    return state.success;
  };

  const selectAllAssets = () => {
    return state.list;
  };

  const selectGetAsset = (
    assetId: string | number | Record<string, string>
  ): T.IPublicAsset | null => {
    if (!assetId) {
      return null;
    }
    if (isKeyPresentInObject(assetId, "asset")) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      assetId = assetId.asset;
    }
    return isAssetPDEX(assetId.toString())
      ? POLKADEX_ASSET
      : state.list.find((asset) => asset.asset_id === assetId.toString());
  };

  const isAssetPDEX = (assetId: string | null | undefined | number): boolean =>
    assetId === "-1" ||
    assetId === null ||
    assetId === -1 ||
    assetId === "POLKADEX" ||
    assetId === "PDEX" ||
    assetId === "polkadex";

  return (
    <Provider
      value={{
        ...state,
        fetchAssets,
        selectAssetsFetchSuccess,
        selectAllAssets,
        selectGetAsset,
      }}>
      {children}
    </Provider>
  );
};
