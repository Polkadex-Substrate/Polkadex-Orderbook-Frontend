import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectUsingAccount, UserAccount } from "@polkadex/orderbook-modules";
import { OrderCommon } from "@polkadex/orderbook/modules/types";
import { useCallback, useEffect, useReducer } from "react";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "../../../graphql/queries";

import * as A from "./actions";
import { Provider } from "./context";
import { ordersHistoryReducer, initialOrdersHistoryState } from "./reducer";
import { Utils } from "@polkadex/web-helpers";
import { SetOrder } from "./types";
export const OrderHistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersHistoryReducer, initialOrdersHistoryState);
  type orderHistoryQueryResult = {
    u: string;
    cid: string;
    id: string;
    t: string;
    m: string;
    s: string;
    ot: string;
    st: string;
    p: string;
    q: string;
    afp: string;
    fq: string;
    fee: string;
  };

  const openOrdersHistory = async () => {
    try {
      const account: UserAccount = useReduxSelector(selectUsingAccount);
      console.log("account from saga", account);

      if (account.tradeAddress) {
        const transactions: OrderCommon[] = await fetchOpenOrders(account.tradeAddress);
        dispatch(A.userOpenOrderHistoryData({ list: transactions }));
      }
    } catch (error) {
      console.error(error);
      dispatch(A.userOrdersHistoryError(error));
    }
  };

  const fetchOpenOrders = async (proxy_acc: string): Promise<OrderCommon[]> => {
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
  };

  const ordersHistory = async ({ dateFrom, dateTo, tradeAddress }) => {
    try {
      if (tradeAddress) {
        const orders: OrderCommon[] = await fetchOrders(tradeAddress, dateFrom, dateTo);
        dispatch(A.userOrdersHistoryData({ list: orders }));
      }
    } catch (error) {
      dispatch(A.userOrdersHistoryError(error));
    }
  };
  const fetchOrders = async (
    proxy_acc: string,
    dateFrom: Date,
    dateTo: Date
  ): Promise<OrderCommon[]> => {
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
  };

  const orderUpdates = (setOrder: SetOrder) => {
    try {
      const order = processOrderData(setOrder);
      dispatch(A.orderUpdateEventData(order));
    } catch (error) {
      console.log(error, "Something has gone wrong (order updates channel)...");
    }
  };

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

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
