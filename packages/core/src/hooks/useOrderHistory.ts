import { useEffect, useState } from "react";
import { useOrderHistoryProvider } from "@orderbook/core/providers/user/orderHistoryProvider";

import { Ifilters } from "../providers/types";
import { sortOrdersDescendingTime } from "../helpers";

export const useOrderHistory = (filters: Ifilters) => {
  const {
    fetchNextOrderHistoryPage,
    isOrderHistoryLoading,
    hasNextOrderHistoryPage,
    orderHistory,
    isMarketMatch,
    orderHistoryError,
  } = useOrderHistoryProvider();

  const list = sortOrdersDescendingTime(orderHistory);

  const [filteredOrderHistory, setFilteredOrderHistory] = useState(list);

  useEffect(() => {
    let orderHistoryList = orderHistory.filter((item) => !item.isReverted);

    if (filters?.showReverted) {
      orderHistoryList = orderHistory.filter((item) => item.isReverted);
    }

    if (filters?.hiddenPairs) {
      orderHistoryList = orderHistoryList.filter((order) => {
        return isMarketMatch(order) && order;
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

    setFilteredOrderHistory(orderHistoryList);
  }, [
    filters?.hiddenPairs,
    filters?.onlyBuy,
    filters?.onlySell,
    filters?.showReverted,
    filters?.status,
    orderHistory,
    isMarketMatch,
  ]);

  return {
    orderHistory: filteredOrderHistory,
    isLoading: isOrderHistoryLoading,
    hasNextPage: hasNextOrderHistoryPage,
    onFetchNextPage: fetchNextOrderHistoryPage,
    error: orderHistoryError,
  };
};
