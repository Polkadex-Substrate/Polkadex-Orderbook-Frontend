import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { getIsDecreasingArray } from "../helpers/getIsDecreasingArray";

import {
  selectCurrentMarket,
  selectRecentTradesOfCurrentMarket,
  recentTradesChannelFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useRecentTrades() {
  const [fieldValue, setFieldValue] = useState({
    filterBy: "all",
  });

  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const recentTrades = useReduxSelector(selectRecentTradesOfCurrentMarket);
  const allRecentTrades = useMemo(
    () =>
      recentTrades.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [recentTrades]
  );

  useEffect(() => {
    if (currentMarket?.m) dispatch(recentTradesChannelFetch(currentMarket));
  }, [dispatch, currentMarket]);

  const isDecreasing = getIsDecreasingArray(recentTrades);
  return {
    isDecreasing,
    recentTrades: allRecentTrades,
    quoteUnit: currentMarket?.quote_ticker,
    baseUnit: currentMarket?.base_ticker,
    pricePrecision: currentMarket?.quote_precision,
    amountPrecision: currentMarket?.base_precision,
    filter: fieldValue.filterBy,
    handleChangeFilter: setFieldValue,
  };
}
