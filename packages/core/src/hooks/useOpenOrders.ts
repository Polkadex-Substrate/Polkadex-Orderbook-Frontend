import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentMarket, sortOrdersDescendingTime } from "../helpers";
import { Ifilters } from "../providers/types";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { appsyncOrderbookService } from "../utils/orderbookService";
import { QUERY_KEYS } from "../constants";

import { useMarketsData } from "./useMarketsData";

export const useOpenOrders = (filters: Ifilters, defaultMarket: string) => {
  const queryClient = useQueryClient();
  const { onHandleError } = useSettingsProvider();
  const {
    selectedAccount: { tradeAddress },
  } = useProfile();
  const { list: markets } = useMarketsData();
  const currentMarket = getCurrentMarket(markets, defaultMarket);

  const userLoggedIn = tradeAddress !== "";
  const shouldFetchOpenOrders = Boolean(
    userLoggedIn && currentMarket && tradeAddress
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
  const [filteredOpenOrders, setFilteredOpenOrders] =
    useState(openOrdersSorted);

  useEffect(() => {
    let openOrdersList = openOrdersSorted;

    if (filters?.hiddenPairs) {
      openOrdersList = openOrdersList.filter((order) => {
        return order.market.id === currentMarket?.id;
      });
    }

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

    setFilteredOpenOrders(openOrdersList);
  }, [
    filters?.hiddenPairs,
    filters?.onlyBuy,
    filters?.onlySell,
    openOrdersSorted,
    currentMarket?.id,
  ]);

  return {
    openOrders: filteredOpenOrders,
    isLoading: isLoading || isFetching,
  };
};
