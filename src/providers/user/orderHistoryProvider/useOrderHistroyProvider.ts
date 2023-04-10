import { useContext, useState, useEffect } from "react";

import { useProfile } from "../profile";

import { Context } from "./context";

import { Ifilters } from "@polkadex/orderbook-ui/organisms";
import { sortOrdersDescendingTime } from "@polkadex/orderbook/helpers/sortOrderDescendingTime";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectUserSession, selectCurrentMarket } from "@polkadex/orderbook-modules";

export function useOrderHistoryProvider(filters: Ifilters) {
  const state = useContext(Context);
  const profileState = useProfile();

  if (!Context) {
    const error = new Error("Order history context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }
  const userSession = useReduxSelector(selectUserSession);
  const usingAccount = profileState.selectedAccount;

  const orderList = state.list;
  const openOrders = state.openOrders;
  const list = sortOrdersDescendingTime(orderList);
  const openOrdersSorted = sortOrdersDescendingTime(openOrders);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = profileState.selectedAccount.tradeAddress !== "";

  const [updatedList, setUpdatedList] = useState(list);
  const [updatedOpenOrdersSorted, setUpdatedOpenOrdersSorted] = useState(openOrdersSorted);
  useEffect(() => {
    const { dateFrom, dateTo } = userSession;
    state.onOpenOrdersHistoryFetch();
    state.onOrdersHistoryFetch({ dateFrom, dateTo, tradeAddress: usingAccount.tradeAddress });
  }, [usingAccount, userSession, state]);

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
    openOrders: updatedOpenOrdersSorted,
    priceFixed: currentMarket?.quote_precision,
    amountFixed: currentMarket?.base_precision,
    userLoggedIn,
    state,
  };
}
