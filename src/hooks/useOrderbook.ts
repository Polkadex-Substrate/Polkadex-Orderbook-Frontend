import { useEffect, useState } from "react";

import { useMarketsProvider } from "../providers/public/marketsProvider/useMarketsProvider";
import { useRecentTradesProvider } from "../providers/public/recentTradesProvider";

import { useOrderBook } from "@polkadex/orderbook/providers/public/orderBook";
import { decimalPlaces } from "@polkadex/orderbook/helpers/Utils";

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
  const [sizeState, setSizeState] = useState(initialState[1]);
  const orderBookState = useOrderBook();

  const handleChange = (select: string) => setFilterState(select);
  const handleAction = (select: { size: number; length: number }) => setSizeState(select);

  const bids = orderBookState.depth.bids;
  const asks = orderBookState.depth.asks;
  const loading = orderBookState.depth.loading;

  const { currentMarket } = useMarketsProvider();
  const pricePrecision = decimalPlaces(currentMarket?.price_tick_size);

  const { getCurrentTradePrice, getLastTradePrice } = useRecentTradesProvider();
  const currentTrade = getCurrentTradePrice();
  const lastTrade = getLastTradePrice();
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

  useEffect(() => {
    const precision = Math.min(initialState.length - 1, Math.max(1, pricePrecision - 1));
    setSizeState(initialState[precision - 1]);
  }, [pricePrecision, setSizeState]);

  return {
    isPriceUp,
    lastPriceValue: currentPrice,
    hasMarket: !!currentMarket,
    loading,
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
