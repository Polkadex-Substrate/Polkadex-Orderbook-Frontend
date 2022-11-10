import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { getIsDecreasingArray } from "../helpers/getIsDecreasingArray";

import {
  selectCurrentMarket,
  selectRecentTradesOfCurrentMarket,
  recentTradesChannelFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useRecentTrades() {
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const recentTrades = useReduxSelector(selectRecentTradesOfCurrentMarket); // already sorted

  useEffect(() => {
    if (currentMarket?.m) dispatch(recentTradesChannelFetch(currentMarket));
  }, [dispatch, currentMarket]);

  const isDecreasing = getIsDecreasingArray(recentTrades);
  return {
    isDecreasing,
    recentTrades,
    quoteUnit: currentMarket?.quote_ticker,
    baseUnit: currentMarket?.base_ticker,
    pricePrecision: currentMarket?.quote_precision,
    amountPrecision: currentMarket?.base_precision,
  };
}
