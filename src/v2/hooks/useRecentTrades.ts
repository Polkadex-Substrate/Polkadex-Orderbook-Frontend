import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getIsDecreasingArray, getSymbolFromId } from "../helpers";

import {
  selectCurrentMarket,
  recentTradesFetch,
  selectRecentTradesOfCurrentMarket,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
export function useRecentTrades() {
  const dispatch = useDispatch();

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const recentTrades = useReduxSelector(selectRecentTradesOfCurrentMarket);
  useEffect(() => {
    if (currentMarket) dispatch(recentTradesFetch(currentMarket));
  }, [dispatch, currentMarket]);

  const isDecreasing = getIsDecreasingArray(recentTrades);

  return {
    isDecreasing,
    recentTrades,
    quoteUnit: getSymbolFromId("quote", currentMarket?.symbolArray),
    baseUnit: getSymbolFromId("base", currentMarket?.symbolArray),
    pricePrecision: currentMarket?.price_precision,
    amountPrecision: currentMarket?.amount_precision,
  };
}
