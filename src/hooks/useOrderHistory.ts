import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { sortOrdersDescendingTime } from "../helpers/sortOrderDescendingTime";

import {
  selectCurrentMarket,
  selectOrdersHistory,
  userOrdersHistoryFetch,
  selectOpenOrders,
  userOpenOrdersHistoryFetch,
  selectUserSession,
  selectHasSelectedAccount,
  selectUsingAccount,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Ifilters } from "@polkadex/orderbook-ui/organisms";

export function useOrderHistory(filters: Ifilters) {
  const dispatch = useDispatch();
  const orderList = useReduxSelector(selectOrdersHistory);
  const openOrders = useReduxSelector(selectOpenOrders);
  const list = sortOrdersDescendingTime(orderList);
  const openOrdersSorted = sortOrdersDescendingTime(openOrders);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectHasSelectedAccount);
  const userSession = useReduxSelector(selectUserSession);
  const usingAccount = useReduxSelector(selectUsingAccount);
  const [updatedList, setUpdatedList] = useState(list);
  const [updatedOpenOrdersSorted, setUpdatedOpenOrdersSorted] = useState(openOrdersSorted);

  useEffect(() => {
    const { dateFrom, dateTo } = userSession;
    console.log("session change:", dateFrom.toLocaleString(), dateTo.toLocaleString());
    if (userLoggedIn) {
      dispatch(userOpenOrdersHistoryFetch());
      dispatch(
        userOrdersHistoryFetch({ dateFrom, dateTo, tradeAddress: usingAccount.tradeAddress })
      );
    }
  }, [userLoggedIn, dispatch, userSession, usingAccount]);

  useEffect(() => {
    if (filters?.onlyBuy && filters?.onlySell) {
      setUpdatedList(list);
      setUpdatedOpenOrdersSorted(openOrdersSorted);
    } else if (filters?.onlyBuy) {
      setUpdatedList(list.filter((data) => data.side?.toUpperCase() === "BID"));
      setUpdatedOpenOrdersSorted(
        openOrdersSorted.filter((data) => data.side?.toUpperCase() === "BID")
      );
    } else if (filters?.onlySell) {
      setUpdatedList(list.filter((data) => data.side.toUpperCase() === "ASK"));
      setUpdatedOpenOrdersSorted(
        openOrdersSorted.filter((data) => data.side?.toUpperCase() === "ASK")
      );
    } else if (filters?.hiddenPairs) {
      setUpdatedList(
        list.filter((data) => {
          return data.side.toUpperCase() !== "ASK" || data.side.toUpperCase() !== "BID";
        })
      );
      setUpdatedOpenOrdersSorted(
        openOrdersSorted.filter((data) => {
          return data.side.toUpperCase() !== "ASK" || data.side.toUpperCase() !== "BID";
        })
      );
    } else {
      setUpdatedList(list);
      setUpdatedOpenOrdersSorted(openOrdersSorted);
    }
  }, [filters, openOrdersSorted, list]);

  return {
    orders: updatedList,
    trades: [],
    openOrders: updatedOpenOrdersSorted,
    priceFixed: currentMarket?.quote_precision,
    amountFixed: currentMarket?.base_precision,
    userLoggedIn,
  };
}
