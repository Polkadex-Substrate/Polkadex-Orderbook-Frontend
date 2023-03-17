import { useContext, useState, useEffect } from "react";
import { Ifilters } from "@polkadex/orderbook-ui/organisms";
import * as A from "./actions";

import { Context } from "./context";
import { useDispatch } from "react-redux";
import { sortOrdersDescendingTime } from "@polkadex/orderbook/helpers/sortOrderDescendingTime";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectCurrentMarket,
  selectUserSession,
  selectHasSelectedAccount,
  selectUsingAccount,
} from "@polkadex/orderbook-modules";

export function useOrderHistoryProvider(filters: Ifilters) {
  const state = useContext(Context);
  const userSession = useReduxSelector(selectUserSession);
  const usingAccount = useReduxSelector(selectUsingAccount);

  const orderList = state.list;
  const openOrders = state.openOrders;
  const list = sortOrdersDescendingTime(orderList);
  const openOrdersSorted = sortOrdersDescendingTime(openOrders);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectHasSelectedAccount);

  const [updatedList, setUpdatedList] = useState(list);
  const [updatedOpenOrdersSorted, setUpdatedOpenOrdersSorted] = useState(openOrdersSorted);
  useEffect(() => {
    const { dateFrom, dateTo } = userSession;
    console.log("useeffect because of usersession and using account");
    state.onOpenOrdersHistoryFetch();
    state.onOrdersHistoryFetch({ dateFrom, dateTo, tradeAddress: usingAccount.tradeAddress });
  }, [usingAccount, userSession]);

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

  if (!Context) {
    const error = new Error("Order history context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return {
    orders: updatedList,
    openOrders: updatedOpenOrdersSorted,
    priceFixed: currentMarket?.quote_precision,
    amountFixed: currentMarket?.base_precision,
    userLoggedIn,
    state,
  };
}
