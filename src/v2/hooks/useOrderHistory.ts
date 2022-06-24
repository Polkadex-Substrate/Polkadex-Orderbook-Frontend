import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { sortOrdersDescendingTime } from "../helpers/sortOrderDescendingTime";

import {
  selectCurrentMarket,
  selectOrdersHistory,
  userOrdersHistoryFetch,
  selectUserLoggedIn,
  transactionsFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useOrderHistory() {
  const dispatch = useDispatch();

  const orderlist = useReduxSelector(selectOrdersHistory);
  const list = sortOrdersDescendingTime(orderlist);

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(userOrdersHistoryFetch());
    }
  }, [userLoggedIn, dispatch]);

  return {
    orders: list,
    trades: [],
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
  };
}
