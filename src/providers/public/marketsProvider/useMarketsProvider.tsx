import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { useContext, useEffect } from "react";
import { Context } from "./context";
import { useAssetsProvider } from "../assetsProvider/useAssetsProvider";
import { IPublicAsset } from "../assetsProvider";

export function useMarketsProvider() {
  const state = useContext(Context);
  const assetsState = useAssetsProvider();
  const allAssets: IPublicAsset[] = assetsState.state.selectAllAssets();

  useEffect(() => {
    if (allAssets.length > 0) {
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
