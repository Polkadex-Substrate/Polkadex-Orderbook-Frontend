import { useContext, useEffect } from "react";
import { Context } from "./context";
import { useAssetsProvider } from "../assetsProvider/useAssetsProvider";
import { IPublicAsset } from "../assetsProvider";

export function useMarketsProvider() {
  const state = useContext(Context);
  const {
    getMarkets,
    getCurrentMarket,
    setCurrentMarket,
    dispatchMarketFetch,
    isMarketLoading,
    getMarketsTimestamp,
  } = state;
  const { marketsFetch, marketTickersFetch } = state;
  const { selectAllAssets } = useAssetsProvider();
  const allAssets: IPublicAsset[] = selectAllAssets();

  useEffect(() => {
    if (allAssets.length > 0 && state.list.length === 0) {
      marketsFetch(allAssets);
      marketTickersFetch();
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
    getMarkets,
    getCurrentMarket,
    setCurrentMarket,
    dispatchMarketFetch,
    isMarketLoading,
    getMarketsTimestamp,
  };
}
