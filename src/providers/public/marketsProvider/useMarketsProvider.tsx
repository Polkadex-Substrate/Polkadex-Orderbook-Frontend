import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { useContext, useEffect } from "react";
import { Context } from "./context";
import { IPublicAsset, selectAllAssets } from "@polkadex/orderbook/modules/public/assets";

export function useMarketsProvider() {
  const state = useContext(Context);
  const allAssets: IPublicAsset[] = useReduxSelector(selectAllAssets);

  useEffect(() => {
    if (allAssets.length > 0) {
      console.log("use effect");
      state.marketsFetch(allAssets);
      state.marketTickersFetch();
    }
  }, [allAssets]);

  if (!Context) {
    const error = new Error("Recent trades context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return {
    state,
  };
}
