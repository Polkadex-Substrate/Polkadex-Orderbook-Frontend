import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCurrentMarket, sortOrdersDescendingTime } from "../helpers";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { appsyncOrderbookService } from "../utils/orderbookService";
import { QUERY_KEYS } from "../constants";
import { Ifilters } from "../providers/types";

import { useMarkets } from "./useMarkets";

export const useOpenOrders = (defaultMarket: string, filters?: Ifilters) => {
  const { onHandleError } = useSettingsProvider();
  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();

  const { list: markets, loading } = useMarkets();
  const currentMarket = getCurrentMarket(markets, defaultMarket);

  const shouldFetchOpenOrders = Boolean(
    currentMarket && tradeAddress?.length > 0 && !loading
  );

  const {
    data: openOrders,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: QUERY_KEYS.openOrders(tradeAddress),
    enabled: shouldFetchOpenOrders,
    queryFn: async () => {
      return await appsyncOrderbookService.query.getOpenOrders({
        address: tradeAddress,
        limit: 25,
      });
    },
    initialData: [],
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "";
      onHandleError(errorMessage);
    },
  });

  const openOrdersSorted = sortOrdersDescendingTime(openOrders);

  const filteredOpenOrders = useMemo(() => {
    let openOrdersList = openOrdersSorted;

    if (filters?.onlyBuy && filters.onlySell) {
      // Nothing to do
    } else if (filters?.onlyBuy) {
      openOrdersList = openOrdersList.filter(
        (data) => data.side?.toUpperCase() === "BID"
      );
    } else if (filters?.onlySell) {
      openOrdersList = openOrdersList.filter(
        (data) => data.side?.toUpperCase() === "ASK"
      );
    }

    return openOrdersList;
  }, [filters?.onlyBuy, filters?.onlySell, openOrdersSorted]);

  return {
    openOrders: filteredOpenOrders,
    isLoading: !shouldFetchOpenOrders || isLoading || isFetching,
  };
};
