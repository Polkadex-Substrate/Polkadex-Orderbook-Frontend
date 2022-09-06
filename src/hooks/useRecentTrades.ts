import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getIsDecreasingArray } from "../helpers";

import {
  selectCurrentMarket,
  selectRecentTradesOfCurrentMarket,
  recentTradesChannelFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
export function useRecentTrades() {
  const dispatch = useDispatch();

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const recentTrades = useReduxSelector(selectRecentTradesOfCurrentMarket);
  const recentTradesSorted = recentTrades.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  useEffect(() => {
    if (currentMarket?.m) dispatch(recentTradesChannelFetch(currentMarket));
  }, [dispatch, currentMarket]);

  const isDecreasing = getIsDecreasingArray(recentTrades);

  return {
    isDecreasing,
    recentTrades: recentTradesSorted,
    quoteUnit: currentMarket?.quote_ticker,
    baseUnit: currentMarket?.base_ticker,
    pricePrecision: currentMarket?.price_precision,
    amountPrecision: currentMarket?.amount_precision,
  };
}
