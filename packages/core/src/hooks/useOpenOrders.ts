import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentMarket, sortOrdersDescendingTime } from "../helpers";
import { Ifilters } from "../providers/types";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { appsyncOrderbookService, Order } from "../utils/orderbookService";
import { QUERY_KEYS } from "../constants";
import {
  removeOrderFromList,
  replaceOrPushOrder,
} from "../utils/orderbookService/appsync_v1/helpers";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

import { useMarkets } from "./useMarkets";

export const useOpenOrders = (filters: Ifilters, defaultMarket: string) => {
  const queryClient = useQueryClient();
  const { isReady } = useOrderbookService();
  const { onHandleError } = useSettingsProvider();
  const {
    selectedAccount: { tradeAddress },
  } = useProfile();

  const { list: markets } = useMarkets();
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

  const onOrderUpdates = useCallback(
    (payload: Order) => {
      try {
        // Update OpenOrders Realtime
        queryClient.setQueryData(
          QUERY_KEYS.openOrders(tradeAddress),
          (oldOpenOrders: typeof openOrders) => {
            const prevOpenOrders = [...oldOpenOrders];

            let updatedOpenOrders: Order[] = [];
            if (payload.status === "OPEN") {
              updatedOpenOrders = replaceOrPushOrder(prevOpenOrders, payload);
            } else {
              // Remove from Open Orders if it is closed
              updatedOpenOrders = removeOrderFromList(prevOpenOrders, payload);
            }
            return updatedOpenOrders;
          }
        );
      } catch (error) {
        onHandleError(`Order updates channel ${error?.message ?? error}`);
      }
    },
    [onHandleError, queryClient, tradeAddress]
  );

  useEffect(() => {
    if (tradeAddress?.length && isReady) {
      const subscription = appsyncOrderbookService.subscriber.subscribeOrders(
        tradeAddress,
        onOrderUpdates
      );

      return () => subscription.unsubscribe();
    }
  }, [tradeAddress, onOrderUpdates, isReady]);

  return {
    openOrders: filteredOpenOrders,
    isLoading: isLoading || isFetching,
  };
};
