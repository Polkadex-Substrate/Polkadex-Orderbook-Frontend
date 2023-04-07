import { useEffect, useState } from "react";

import {
  selectCurrentTradePrice,
  selectLastTradePrice,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { useOrderBook } from "@polkadex/orderbook/providers/public/orderBook";
import { useMarketsProvider } from "../providers/public/marketsProvider/useMarketsProvider";

const initialState = [
  { size: 0.1, length: 1 },
  { size: 0.01, length: 2 },
  { size: 0.001, length: 3 },
  { size: 0.0001, length: 4 },
  { size: 0.00001, length: 5 },
  { size: 0.000001, length: 6 },
];

export function useOrderbook() {
  const [isPriceUp, setIsPriceUp] = useState(true);
  const [prevTradePrice, setPrevTradePrice] = useState(0);
  const [filterState, setFilterState] = useState("Order");
  const [sizeState, setSizeState] = useState(initialState[4]);
  const orderBookState = useOrderBook();

  const handleChange = (select: string) => setFilterState(select);
  const handleAction = (select: { size: number; length: number }) => setSizeState(select);

  const bids = orderBookState.depth.bids;
  const asks = orderBookState.depth.asks;
  const  {currentMarket}  = useMarketsProvider();
  
  const currentTrade = useReduxSelector(selectCurrentTradePrice);
  const lastTrade = useReduxSelector(selectLastTradePrice);
  const bidsSorted = sortArrayDescending(bids);
  const asksSorted = sortArrayDescending(asks);

  const currentPrice = Number(currentTrade);
  const lastPrice = Number(lastTrade);
  const isPriceUpValue =
    currentPrice > lastPrice ? true : lastPrice === prevTradePrice ? isPriceUp : false;

  useEffect(() => {
    setIsPriceUp(isPriceUpValue);
    setPrevTradePrice(lastPrice);
  }, [currentPrice, isPriceUpValue, lastPrice, currentMarket]);

  return {
    isPriceUp,
    lastPriceValue: currentPrice,
    hasMarket: !!currentMarket,
    asks: asksSorted,
    bids: bidsSorted,
    initialState,
    filterState,
    sizeState,
    handleChange,
    handleAction,
  };
}
function sortArrayDescending(arr: string[][]) {
  return arr?.sort((a, b) => Number(b[0]) - Number(a[0]));
}
