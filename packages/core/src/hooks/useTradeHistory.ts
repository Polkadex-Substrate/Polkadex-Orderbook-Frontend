import { useEffect, useMemo, useState, useCallback } from "react";
import { Ifilters } from "@orderbook/core/providers/types";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { decimalPlaces, getCurrentMarket } from "../helpers";
import {
  MIN_DIGITS_AFTER_DECIMAL,
  QUERY_KEYS,
  TRADE_HISTORY_PER_PAGE_LIMIT,
} from "../constants";
import { appsyncOrderbookService, Trade } from "../utils/orderbookService";
import { useSessionProvider } from "../providers/user/sessionProvider";
import { useSettingsProvider } from "../providers/public/settings";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

import { useMarketsData } from "./useMarketsData";

export function useTradeHistory(filters: Ifilters, defaultMarket: string) {
  const queryClient = useQueryClient();
  const {
    selectedAccount: { tradeAddress },
  } = useProfile();
  const { isReady } = useOrderbookService();
  const { onHandleError } = useSettingsProvider();
  const { dateFrom, dateTo } = useSessionProvider();
  const { list: markets } = useMarketsData();
  const currentMarket = getCurrentMarket(markets, defaultMarket);

  const userLoggedIn = tradeAddress !== "";

  const shouldFetchTradeHistory = Boolean(
    userLoggedIn && currentMarket && tradeAddress
  );

  const {
    data,
    fetchNextPage: onFetchNextPage,
    isLoading: fetching,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.tradeHistory(dateFrom, dateTo, tradeAddress),
    enabled: shouldFetchTradeHistory,
    queryFn: async ({ pageParam = null }) => {
      return await appsyncOrderbookService.query.getTradeHistory({
        address: tradeAddress,
        from: dateFrom,
        to: dateTo,
        pageParams: pageParam,
        limit: TRADE_HISTORY_PER_PAGE_LIMIT,
      });
    },
    getNextPageParam: (lastPage) => {
      // If the last page contains nextToken as null, don't fetch the next page
      if (!lastPage.nextToken) {
        return false;
      }
      return lastPage.nextToken;
    },
  });

  const list = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages]
  );
  const listSorted = useMemo(() => {
    return list.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [list]);

  const [updatedTradeList, setUpdatedTradeList] = useState(listSorted);

  useEffect(() => {
    let tradeHistoryList = list.filter((item) => !item.isReverted);

    if (filters?.showReverted) {
      tradeHistoryList = list.filter((item) => item.isReverted);
    }

    if (filters?.onlyBuy) {
      tradeHistoryList = tradeHistoryList.filter(
        (data) => data.side?.toUpperCase() === "BID"
      );
    } else if (filters?.onlySell) {
      tradeHistoryList = tradeHistoryList.filter(
        (data) => data.side.toUpperCase() === "ASK"
      );
    }

    if (filters?.hiddenPairs) {
      tradeHistoryList = tradeHistoryList.filter((trade) => {
        const baseUnit = trade.market?.baseAsset?.ticker || "";
        const quoteUnit = trade.market?.quoteAsset?.ticker || "";
        const market = currentMarket?.name;
        const marketForTrade = `${baseUnit}/${quoteUnit}`;
        return market === marketForTrade && trade;
      });
    }

    setUpdatedTradeList(tradeHistoryList);
  }, [filters, list, currentMarket?.name]);

  const priceFixed = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const amountFixed = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const onUserTradeUpdate = useCallback(
    (trade: Trade) => {
      try {
        queryClient.setQueryData(
          QUERY_KEYS.tradeHistory(dateFrom, dateTo, tradeAddress),
          (oldTradeHistory: any) => {
            const payload = {
              data: [trade],
              nextToken: null,
            };
            return {
              pages: [payload, ...(oldTradeHistory?.pages ?? [])],
              pageParams: [...oldTradeHistory?.pageParams],
            };
          }
        );
      } catch (error) {
        onHandleError(`User trades channel error: ${error?.message ?? error}`);
      }
    },
    [dateFrom, dateTo, onHandleError, queryClient, tradeAddress]
  );

  useEffect(() => {
    if (tradeAddress?.length && isReady) {
      const subscription =
        appsyncOrderbookService.subscriber.subscribeUserTrades(
          tradeAddress,
          onUserTradeUpdate
        );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [tradeAddress, isReady, onUserTradeUpdate]);

  return {
    trades: updatedTradeList,
    priceFixed,
    amountFixed,
    isLoading: fetching,
    hasNextPage,
    error: error as string,
    onFetchNextPage,
  };
}
