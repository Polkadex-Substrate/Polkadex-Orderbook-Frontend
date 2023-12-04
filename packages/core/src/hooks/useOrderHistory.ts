import { useEffect, useMemo, useCallback } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { Ifilters } from "../providers/types";
import { getCurrentMarket, sortOrdersDescendingTime } from "../helpers";
import { QUERY_KEYS } from "../constants";
import { useProfile } from "../providers/user/profile";
import { useSessionProvider } from "../providers/user/sessionProvider";
import { appsyncOrderbookService, Order } from "../utils/orderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import { replaceOrPushOrder } from "../utils/orderbookService/appsync_v1/helpers";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

import { useMarkets } from "./useMarkets";

export const useOrderHistory = (filters: Ifilters, defaultMarket: string) => {
  const queryClient = useQueryClient();
  const { isReady } = useOrderbookService();
  const {
    selectedAccount: { tradeAddress },
  } = useProfile();
  const { dateFrom, dateTo } = useSessionProvider();
  const { onHandleError } = useSettingsProvider();
  const { list: markets } = useMarkets();
  const currentMarket = getCurrentMarket(markets, defaultMarket);

  const userLoggedIn = tradeAddress !== "";

  const shouldFetchOrderHistory = Boolean(
    userLoggedIn && currentMarket && tradeAddress
  );

  const {
    data: orderHistoryList,
    fetchNextPage: fetchNextOrderHistoryPage,
    isLoading: isOrderHistoryLoading,
    hasNextPage: hasNextOrderHistoryPage,
    error: orderHistoryError,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.orderHistory(dateFrom, dateTo, tradeAddress),
    enabled: shouldFetchOrderHistory,
    queryFn: async ({ pageParam = null }) => {
      return await appsyncOrderbookService.query.getOrderHistory({
        address: tradeAddress,
        from: dateFrom,
        to: dateTo,
        limit: 30,
        pageParams: pageParam,
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

  const orderHistory = useMemo(
    () =>
      sortOrdersDescendingTime(
        orderHistoryList?.pages.flatMap((page) => page.data) ?? []
      ),
    [orderHistoryList?.pages]
  );

  const filteredOrderHistory = useMemo(() => {
    let orderHistoryList = orderHistory.filter((item) => !item.isReverted);

    if (filters?.showReverted) {
      orderHistoryList = orderHistory.filter((item) => item.isReverted);
    }

    if (filters?.hiddenPairs) {
      orderHistoryList = orderHistoryList.filter((order) => {
        return order.orderId === currentMarket?.id;
      });
    }

    if (filters?.onlyBuy && filters.onlySell) {
      // Nothing to do
    } else if (filters?.onlyBuy) {
      orderHistoryList = orderHistoryList.filter(
        (data) => data.side?.toUpperCase() === "BID"
      );
    } else if (filters?.onlySell) {
      orderHistoryList = orderHistoryList.filter(
        (data) => data.side.toUpperCase() === "ASK"
      );
    }

    const acceptedStatus = {
      "all orders": "all",
      pending: "open",
      completed: "closed",
    };

    const status = filters?.status?.toLowerCase();
    const filterStatus = acceptedStatus[status] ?? status;

    if (filterStatus !== Object.values(acceptedStatus)[0]) {
      orderHistoryList = orderHistoryList.filter((item) => {
        return item.status.toLowerCase() === filterStatus;
      });
    }

    return orderHistoryList;
  }, [
    filters?.hiddenPairs,
    filters?.onlyBuy,
    filters?.onlySell,
    filters?.showReverted,
    filters?.status,
    currentMarket?.id,
    orderHistory,
  ]);

  const onOrderUpdates = useCallback(
    (payload: Order) => {
      try {
        // Update OrderHistory Realtime
        queryClient.setQueryData(
          QUERY_KEYS.orderHistory(dateFrom, dateTo, tradeAddress),
          (oldOrderHistory: typeof orderHistoryList) => {
            const prevOrderHistory = [
              ...(oldOrderHistory?.pages.flatMap((page) => page.data) ?? []),
            ];
            const oldOrderHistoryLength = oldOrderHistory
              ? oldOrderHistory?.pages.length
              : 0;

            const nextToken =
              oldOrderHistory?.pages?.at(oldOrderHistoryLength - 1)
                ?.nextToken || null;

            // Add to OrderHistory for all cases
            const updatedOrderHistory = replaceOrPushOrder(
              prevOrderHistory,
              payload
            );

            const newOrderHistory = {
              pages: [
                {
                  data: [...updatedOrderHistory],
                  nextToken,
                },
              ],
              pageParams: [...(oldOrderHistory?.pageParams ?? [])],
            };

            return newOrderHistory;
          }
        );
      } catch (error) {
        onHandleError(`Order updates channel ${error?.message ?? error}`);
      }
    },
    [onHandleError, dateFrom, dateTo, queryClient, tradeAddress]
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
    orderHistory: filteredOrderHistory,
    isLoading: isOrderHistoryLoading,
    hasNextPage: hasNextOrderHistoryPage,
    onFetchNextPage: fetchNextOrderHistoryPage,
    error: orderHistoryError as string,
  };
};
