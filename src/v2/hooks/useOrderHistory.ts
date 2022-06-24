import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { sortOrdersDescendingTime } from "../helpers/sortOrderDescendingTime";

import {
  selectCurrentMarket,
  selectOrdersHistory,
  userOrdersHistoryFetch,
  selectUserLoggedIn,
  transactionsFetch,
  selectOpenOrders,
  userOpenOrdersHistoryFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useOrderHistory() {
  const dispatch = useDispatch();

  const orderlist = useReduxSelector(selectOrdersHistory);
  const openOrders = useReduxSelector(selectOpenOrders);
  const list = sortOrdersDescendingTime(orderlist);
  const openOrdersSorted = sortOrdersDescendingTime(openOrders);

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(userOrdersHistoryFetch());
      dispatch(userOpenOrdersHistoryFetch());
    }
  }, [userLoggedIn, dispatch]);

  return {
    orders: list,
    trades: [],
    openOrders: openOrdersSorted,
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
  };
}
