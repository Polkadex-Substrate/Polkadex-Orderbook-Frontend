import { useEffect, useState } from "react";

import { sortOrdersDescendingTime } from "../helpers";
import { Ifilters } from "../providers/types";
import { useOrderHistoryProvider } from "../providers/user/orderHistoryProvider";

export const useOpenOrders = (filters: Ifilters) => {
  const { openOrders, isOpenOrdersLoading, isMarketMatch } =
    useOrderHistoryProvider();

  const openOrdersSorted = sortOrdersDescendingTime(openOrders);
  const [filteredOpenOrders, setFilteredOpenOrders] =
    useState(openOrdersSorted);

  useEffect(() => {
    let openOrdersList = openOrdersSorted;

    if (filters?.hiddenPairs) {
      openOrdersList = openOrdersList.filter((order) => {
        return isMarketMatch(order) && order;
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
    isMarketMatch,
    openOrdersSorted,
  ]);

  return {
    openOrders: filteredOpenOrders,
    isLoading: isOpenOrdersLoading,
  };
};
