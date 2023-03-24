import { useCallback, useEffect, useReducer } from "react";

import * as A from "./actions";
import { Provider } from "./context";
import { assetsReducer, initialState } from "./reducer";
import * as T from "./types";
import { getRecentTrades } from "@polkadex/orderbook/graphql/queries";
import { fetchAllFromAppSync, sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { Market } from "@polkadex/orderbook-modules";
import { API } from "aws-amplify";
import * as subscriptions from "../../../graphql/subscriptions";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentMarket } from "@polkadex/orderbook-modules";
import { getAllAssets } from "@polkadex/orderbook/graphql/queries";

export const RecentTradesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assetsReducer, initialState);
  const fetchAssets = async () => {
    try {
      const assetsList: T.IPublicAsset[] = await (() => fetchAllAssetMetadata())();
      // const allowedList = assetsList.filter((asset) =>
      //   ALLOWED_ASSET_IDS.includes(asset.assetId)
      // );
      const assetIdMap = assetsList.reduce((acc, asset) => {
        acc[asset.asset_id] = asset;
        return acc;
      }, {});
      dispatch(A.assetsData({ list: assetsList, assetIdMap }));
    } catch (error) {
      console.warn("something has gone wrong with fetchassets");
    }
  };

  async function fetchAllAssetMetadata(): Promise<T.IPublicAsset[]> {
    const assetEntries: any = await sendQueryToAppSync({ query: getAllAssets });
    const assets = assetEntries.data.getAllAssets.items;
    return assets;
  }

  return (
    <Provider
      value={{
        ...state,
        fetchAssets,
      }}>
      {children}
    </Provider>
  );
};
