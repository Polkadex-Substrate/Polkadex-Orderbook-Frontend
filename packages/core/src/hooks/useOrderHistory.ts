import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Ifilters } from "../providers/types";
import { getCurrentMarket, sortOrdersDescendingTime } from "../helpers";
import { QUERY_KEYS } from "../constants";
import { useProfile } from "../providers/user/profile";
import { useSessionProvider } from "../providers/user/sessionProvider";
import { appsyncOrderbookService } from "../utils/orderbookService";

import { useMarkets } from "./useMarkets";

export const useOrderHistory = (filters: Ifilters, defaultMarket: string) => {
  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();
  const { dateFrom, dateTo } = useSessionProvider();
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
        limit: 25,
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

  return {
    orderHistory: filteredOrderHistory,
    isLoading: isOrderHistoryLoading,
    hasNextPage: hasNextOrderHistoryPage,
    onFetchNextPage: fetchNextOrderHistoryPage,
    error: orderHistoryError as string,
  };
};
