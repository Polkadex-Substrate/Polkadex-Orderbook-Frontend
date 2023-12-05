import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PublicTrade,
  appsyncOrderbookService,
} from "@orderbook/core/utils/orderbookService";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { QUERY_KEYS, RECENT_TRADES_LIMIT } from "../constants";
import { getIsDecreasingArray } from "../helpers";

export function useRecentTrades(market: string) {
  const queryClient = useQueryClient();
  const { onHandleError } = useSettingsProvider();

  const {
    data: recentTradesList,
    isLoading,
    isFetching,
  } = useQuery<PublicTrade[]>({
    queryKey: QUERY_KEYS.recentTrades(market),
    enabled: Boolean(market?.length > 0),
    queryFn: async () =>
      await appsyncOrderbookService.query.getLatestTradesForMarket({
        market,
        limit: RECENT_TRADES_LIMIT,
      }),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
    refetchOnMount: false,
  });

  const isDecreasing = getIsDecreasingArray(recentTradesList ?? []);

  const currentTradePrice = useMemo(() => {
    if (!recentTradesList) return 0;
    return recentTradesList.length > 0 ? recentTradesList[0].price : 0;
  }, [recentTradesList]);

  const lastTradePrice = useMemo(() => {
    if (!recentTradesList) return 0;
    return recentTradesList.length > 1 ? recentTradesList[1].price : 0;
  }, [recentTradesList]);

  useEffect(() => {
    const subscription =
      appsyncOrderbookService.subscriber.subscribeLatestTrades(
        market,
        (trade: PublicTrade) => {
          queryClient.setQueryData(
            QUERY_KEYS.recentTrades(market),
            (oldData) => {
              const oldRecentTrades = oldData as PublicTrade[];
              return [trade, ...oldRecentTrades];
            }
          );
        }
      );

    return () => subscription.unsubscribe();
  }, [market, queryClient]);

  return {
    list: recentTradesList,
    loading: isLoading || isFetching,
    isDecreasing,
    isPriceUp: currentTradePrice > lastTradePrice,
  };
}
