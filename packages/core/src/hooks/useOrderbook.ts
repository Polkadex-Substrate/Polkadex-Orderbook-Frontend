import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import {
  decimalPlaces,
  deleteFromBook,
  getCurrentMarket,
  replaceOrAddToBook,
} from "@orderbook/core/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MAX_DIGITS_AFTER_DECIMAL,
  QUERY_KEYS,
} from "@orderbook/core/constants";
import { useMarkets, useRecentTrades } from "@orderbook/core/hooks";

import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import { PriceLevel, appsyncOrderbookService } from "../utils/orderbookService";

const initialState = [
  { size: 0.1, length: 1 },
  { size: 0.01, length: 2 },
  { size: 0.001, length: 3 },
  { size: 0.0001, length: 4 },
  { size: 0.00001, length: 5 },
  { size: 0.000001, length: 6 },
];

export function useOrderbook(defaultMarket: string) {
  const [filterState, setFilterState] = useState("Order");
  const [sizeState, setSizeState] = useState(initialState[1]);

  const queryClient = useQueryClient();
  const { isReady } = useOrderbookService();
  const { onHandleError } = useSettingsProvider();
  const { list } = useMarkets();
  const { currentTrade, lastTrade } = useRecentTrades(defaultMarket);

  const {
    data: { asks, bids },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: QUERY_KEYS.orderBook(defaultMarket),
    queryFn: async () => {
      const orderbook =
        await appsyncOrderbookService.query.getOrderbook(defaultMarket);

      const bids = orderbook.bids.map((bid) => {
        return [String(bid.price), String(bid.qty)];
      });
      bids.sort((a, b) => Number(a[0]) - Number(b[0]));
      const asks = orderbook.asks.map((ask) => {
        return [String(ask.price), String(ask.qty)];
      });
      asks.sort((a, b) => Number(a[0]) - Number(b[0]));

      return { bids, asks };
    },
    enabled: Boolean(defaultMarket?.length > 0),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
    initialData: {
      asks: [],
      bids: [],
    },
  });

  const bidsSorted = sortArrayDescending(bids);
  const asksSorted = sortArrayDescending(asks);
  const currentMarket = getCurrentMarket(list, defaultMarket);

  const handleChange = (select: string) => setFilterState(select);

  const handleAction = (select: { size: number; length: number }) =>
    setSizeState(select);

  const pricePrecision = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : MAX_DIGITS_AFTER_DECIMAL;

  const qtyPrecision = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : MAX_DIGITS_AFTER_DECIMAL;

  useEffect(() => {
    const precision = Math.min(
      initialState.length - 1,
      Math.max(1, pricePrecision - 1)
    );
    setSizeState(initialState[precision]);
  }, [pricePrecision, setSizeState]);

  useEffect(() => {
    if (!defaultMarket || !isReady) return;

    const subscription = appsyncOrderbookService.subscriber.subscribeOrderbook(
      defaultMarket,
      (payload: PriceLevel[]) => {
        let book = {
          ask: [...asks],
          bid: [...bids],
        };

        const incrementalData = payload;
        incrementalData.forEach((item) => {
          if (Number(item.qty) === 0) {
            book = deleteFromBook(
              book,
              String(item.price),
              item.side.toLowerCase()
            );
          } else
            book = replaceOrAddToBook(
              book,
              String(item.price),
              String(item.qty),
              item.side.toLowerCase()
            );
        });

        queryClient.setQueryData(QUERY_KEYS.orderBook(defaultMarket), () => {
          const newData = {
            asks: _.cloneDeep(book.ask),
            bids: _.cloneDeep(book.bid),
          };
          return newData;
        });
      }
    );
    return () => subscription.unsubscribe();
  }, [asks, bids, defaultMarket, isReady, queryClient]);

  const isPriceUp = useMemo(() => {
    const currentPrice = Number(currentTrade?.price);
    const lastPrice = Number(lastTrade?.price);
    return currentPrice > lastPrice;
  }, [currentTrade, lastTrade]);

  return {
    isPriceUp,
    qtyPrecision,
    lastPriceValue: Number(currentTrade?.price),
    hasMarket: !!currentMarket,
    loading: isLoading || isFetching,
    asks: asksSorted,
    bids: bidsSorted,
    initialState,
    filterState,
    sizeState,
    quoteUnit: currentMarket?.quoteAsset?.ticker,
    baseUnit: currentMarket?.baseAsset?.ticker,
    handleChange,
    handleAction,
  };
}

function sortArrayDescending(arr: string[][]) {
  return arr?.sort((a, b) => Number(b[0]) - Number(a[0]));
}
