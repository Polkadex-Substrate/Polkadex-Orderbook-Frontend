import { useEffect, useState } from "react";
import { useRecentTradesProvider } from "@orderbook/core/providers/public/recentTradesProvider";
import { decimalPlaces } from "@orderbook/core/helpers";
import { MAX_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import { useOrderbookData, useMarketsData } from "@orderbook/core/hooks";

const initialState = [
  { size: 0.1, length: 1 },
  { size: 0.01, length: 2 },
  { size: 0.001, length: 3 },
  { size: 0.0001, length: 4 },
  { size: 0.00001, length: 5 },
  { size: 0.000001, length: 6 },
];

export function useOrderbook(defaultMarket: string) {
  const [isPriceUp, setIsPriceUp] = useState(true);
  const [prevTradePrice, setPrevTradePrice] = useState(0);
  const [filterState, setFilterState] = useState("Order");
  const [sizeState, setSizeState] = useState(initialState[1]);
  const orderBookState = useOrderbookData(defaultMarket);

  const handleChange = (select: string) => setFilterState(select);
  const handleAction = (select: { size: number; length: number }) =>
    setSizeState(select);

  const bids = orderBookState.depth.bids;
  const asks = orderBookState.depth.asks;
  const loading = orderBookState.depth.loading;

  const { currentMarket } = useMarketsData(defaultMarket);
  const pricePrecision = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : MAX_DIGITS_AFTER_DECIMAL;
  const qtyPrecision = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : MAX_DIGITS_AFTER_DECIMAL;

  const { getCurrentTradePrice, getLastTradePrice } = useRecentTradesProvider();
  const currentTrade = getCurrentTradePrice();
  const lastTrade = getLastTradePrice();
  const bidsSorted = sortArrayDescending(bids);
  const asksSorted = sortArrayDescending(asks);

  const currentPrice = Number(currentTrade);
  const lastPrice = Number(lastTrade);
  const isPriceUpValue =
    currentPrice > lastPrice
      ? true
      : lastPrice === prevTradePrice
        ? isPriceUp
        : false;

  useEffect(() => {
    setIsPriceUp(isPriceUpValue);
    setPrevTradePrice(lastPrice);
  }, [currentPrice, isPriceUpValue, lastPrice, currentMarket]);

  useEffect(() => {
    const precision = Math.min(
      initialState.length - 1,
      Math.max(1, pricePrecision - 1)
    );
    setSizeState(initialState[precision]);
  }, [pricePrecision, setSizeState]);

  return {
    isPriceUp,
    qtyPrecision,
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
