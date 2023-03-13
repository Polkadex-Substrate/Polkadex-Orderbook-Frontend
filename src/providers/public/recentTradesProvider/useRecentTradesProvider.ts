import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentMarket } from "@polkadex/orderbook-modules";
import { getIsDecreasingArray } from "@polkadex/web-helpers";
import { useContext } from "react";

import { Context } from "./context";

export function useRecentTradesProvider() {
  const state = useContext(Context);
  const currentMarket = useReduxSelector(selectCurrentMarket);

  const isDecreasing = getIsDecreasingArray(state.list);
  if (!Context) {
    const error = new Error("Recent trades context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return {
    state,
    isDecreasing,
    quoteUnit: currentMarket?.quote_ticker,
    baseUnit: currentMarket?.base_ticker,
    pricePrecision: currentMarket?.quote_precision,
    amountPrecision: currentMarket?.base_precision,
  };
}
