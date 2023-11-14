import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PublicTrade,
  appsyncOrderbookService,
} from "@orderbook/core/utils/orderbookService";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { QUERY_KEYS, RECENT_TRADES_LIMIT } from "../constants";
import { getIsDecreasingArray, sliceArray } from "../helpers";
import { defaultConfig } from "../config";

export function useRecentTrades(market: string) {
  const { onHandleError } = useSettingsProvider();

  const { data, isLoading, isFetching } = useQuery<PublicTrade[]>({
    queryKey: QUERY_KEYS.recentTrades(market),
    enabled: Boolean(market?.length > 0),
    queryFn: async () =>
      await appsyncOrderbookService.query.getLatestTradesForMarket({
        market,
        limit: RECENT_TRADES_LIMIT,
      }),
    onError: onHandleError,
    initialData: [],
  });

  const recentTradesList: PublicTrade[] = useMemo(() => {
    return sliceArray(data, defaultConfig.defaultStorageLimit);
  }, [data]);

  const isDecreasing = getIsDecreasingArray(recentTradesList);

  const getCurrentTradePrice = () => {
    if (!recentTradesList) return "0";
    return recentTradesList.length > 0 ? recentTradesList[0].price : "0";
  };

  const getLastTradePrice = () => {
    if (!recentTradesList) return "0";
    return recentTradesList.length > 1 ? recentTradesList[1].price : "0";
  };

  return {
    list: recentTradesList,
    loading: isLoading || isFetching,
    currentTrade: recentTradesList.at(0),
    lastTrade: recentTradesList.at(1),
    isDecreasing,
    getCurrentTradePrice,
    getLastTradePrice,
  };
}
