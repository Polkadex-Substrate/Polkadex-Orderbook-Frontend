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
