import { useCallback, useEffect, useReducer, useState } from "react";

import * as queries from "../../../graphql/queries";
import { useSettingsProvider } from "../../public/settings";
import { useProfile } from "../profile";
import { useSessionProvider } from "../sessionProvider/useSessionProvider";

import { Provider } from "./context";
import { ordersHistoryReducer, initialOrdersHistoryState } from "./reducer";
import * as A from "./actions";
import { SetOrder, orderHistoryQueryResult } from "./types";

import { UserAccount } from "@polkadex/orderbook/providers/user/profile/types";
import { OrderCommon } from "@polkadex/orderbook/modules/types";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import { Utils } from "@polkadex/web-helpers";
import { sortOrdersDescendingTime } from "@polkadex/orderbook/helpers/sortOrderDescendingTime";
import { Ifilters } from "@polkadex/orderbook-ui/organisms";

export const OrderHistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersHistoryReducer, initialOrdersHistoryState);
  const profileState = useProfile();
  const { onHandleAlert } = useSettingsProvider();

  const account: UserAccount = profileState.selectedAccount;

  const fetchOpenOrders = useCallback(async (proxy_acc: string): Promise<OrderCommon[]> => {
    const ordersRaw: orderHistoryQueryResult[] = await fetchAllFromAppSync(
      queries.listOpenOrdersByMainAccount,
      {
        main_account: proxy_acc,
        limit: 100,
      },
      "listOpenOrdersByMainAccount"
    );
    const orders = ordersRaw.map((order) => ({
      main_account: proxy_acc,
      id: order.id,
      client_order_id: order.cid,
      time: new Date(Number(order.t)).toISOString(),
      m: order.m, // marketid
      side: order.s,
      order_type: order.ot,
      status: order.st,
      price: Number(order.p),
      qty: Number(order.q),
      avg_filled_price: order.afp,
      filled_quantity: order.fq,
      fee: order.fee,
    }));
    return orders;
  }, []);

  const onOpenOrdersHistoryFetch = useCallback(async () => {
    try {
      if (account.tradeAddress) {
        const transactions: OrderCommon[] = await fetchOpenOrders(account.tradeAddress);
        dispatch(A.userOpenOrderHistoryData({ list: transactions }));
      }
    } catch (error) {
      console.error(error);
      onHandleAlert({
        message: {
          title: "Something has gone wrong (openOrderHistory)..",
          description: error.message,
        },
        type: "Error",
      });
      dispatch(A.userOpenOrdersHistoryError(error));
    }
  }, [account.tradeAddress, fetchOpenOrders, onHandleAlert]);

  const fetchOrders = useCallback(
    async (proxy_acc: string, dateFrom: Date, dateTo: Date): Promise<OrderCommon[]> => {
      // TODO: make limit resonable by utilizing nextToken
      const dateFromStr = Utils.date.formatDateToISO(dateFrom);
      const dateToStr = Utils.date.formatDateToISO(dateTo);
      const ordersRaw: orderHistoryQueryResult[] = await fetchAllFromAppSync(
        queries.listOrderHistorybyMainAccount,
        {
          main_account: proxy_acc,
          from: dateFromStr,
          to: dateToStr,
          limit: 100,
        },
        "listOrderHistorybyMainAccount"
      );
      const orders: OrderCommon[] = ordersRaw.map((order) => ({
        main_account: proxy_acc,
        id: order.id,
        client_order_id: order.cid,
        time: new Date(Number(order.t)).toISOString(),
        m: order.m, // marketid
        side: order.s,
        order_type: order.ot,
        status: order.st,
        price: Number(order.p),
        qty: Number(order.q),
        avg_filled_price: order.afp,
        filled_quantity: order.fq,
        fee: order.fee,
      }));

      return orders;
    },
    []
  );

  const onOrdersHistoryFetch = useCallback(
    async ({ dateFrom, dateTo, tradeAddress }) => {
      try {
        if (tradeAddress) {
          const orders: OrderCommon[] = await fetchOrders(tradeAddress, dateFrom, dateTo);

          dispatch(A.userOrdersHistoryData({ list: orders }));
        }
      } catch (error) {
        onHandleAlert({
          message: {
            title: "Something has gone wrong (orderHistory)..",
            description: error.message,
          },
          type: "Error",
        });
        dispatch(A.userOrdersHistoryError(error));
      }
    },
    [fetchOrders, onHandleAlert]
  );
  function processOrderData(eventData: SetOrder): OrderCommon {
    const base = eventData.pair.base_asset;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const quote = eventData.pair.quote_asset;

    return {
      main_account: eventData.user,
      id: eventData.id.toString(),
      client_order_id: eventData.client_order_id,
      time: new Date(Number(eventData.timestamp) * 1000).toISOString(),
      m: `${base}-${quote}`, // marketid
      side: eventData.side,
      order_type: eventData.order_type,
      status: eventData.status.toUpperCase(),
      price: Number(eventData.price),
      qty: Number(eventData.qty),
      avg_filled_price: eventData.avg_filled_price.toString(),
      filled_quantity: eventData.filled_quantity.toString(),
      fee: eventData.fee.toString(),
    };
  }
  const onOrderUpdates = (payload: A.OrderUpdateEvent["payload"]) => {
    try {
      const order = processOrderData(payload);
      dispatch(A.orderUpdateEventData(order));
    } catch (error) {
      console.log(error, "Something has gone wrong (order updates channel)...");
      onHandleAlert({
        message: {
          title: "Something has gone wrong (order updates channel)...",
          description: error.message,
        },
        type: "Error",
      });
      dispatch(A.orderUpdateEventError(error));
    }
  };

  const { dateTo, dateFrom } = useSessionProvider();
  const usingAccount = profileState.selectedAccount;

  const orderList = state.list;
  const openOrders = state.openOrders;
  const list = sortOrdersDescendingTime(orderList);
  const openOrdersSorted = sortOrdersDescendingTime(openOrders);
  const userLoggedIn = profileState.selectedAccount.tradeAddress !== "";

  const [updatedList, setUpdatedList] = useState(list);
  const [updatedOpenOrdersSorted, setUpdatedOpenOrdersSorted] = useState(openOrdersSorted);

  useEffect(() => {
    onOpenOrdersHistoryFetch();
    onOrdersHistoryFetch({ dateFrom, dateTo, tradeAddress: usingAccount.tradeAddress });
  }, [
    usingAccount.tradeAddress,
    dateFrom,
    dateTo,
    onOpenOrdersHistoryFetch,
    onOrdersHistoryFetch,
  ]);

  const filterOrders = useCallback(
    (filters: Ifilters) => {
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
    },
    [list, openOrdersSorted]
  );

  return (
    <Provider
      value={{
        ...state,
        onOpenOrdersHistoryFetch,
        onOrdersHistoryFetch,
        onOrderUpdates,
        orders: updatedList,
        openOrders: updatedOpenOrdersSorted,
        userLoggedIn,
        filterOrders,
      }}>
      {children}
    </Provider>
  );
};
