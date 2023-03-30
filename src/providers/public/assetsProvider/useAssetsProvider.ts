import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentMarket } from "@polkadex/orderbook-modules";
import { getIsDecreasingArray } from "@polkadex/web-helpers";
import { stat } from "fs";
import { useContext, useEffect } from "react";

import { Context } from "./context";

export function useAssetsProvider() {
  const state = useContext(Context);
  const { fetchAssets, selectAllAssets, selectGetAsset, selectAssetsFetchSuccess } = state;
  if (!Context) {
    const error = new Error("Recent trades context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return {
    state,
    fetchAssets,
    selectAllAssets,
    selectGetAsset,
    selectAssetsFetchSuccess,
  };
}
