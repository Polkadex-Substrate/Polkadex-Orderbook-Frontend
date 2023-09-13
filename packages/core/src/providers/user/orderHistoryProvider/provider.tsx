import { useCallback, useEffect, useReducer, useState } from "react";

import { Ifilters, OrderCommon } from "../../types";
import { UserAccount, useProfile } from "../profile";

import {
  OrderHistoryFetchResult,
  orderHistoryQueryResult,
  OrderHistoryResult,
  SetOrder,
} from "./types";
import * as A from "./actions";
import { Provider } from "./context";
import { initialOrdersHistoryState, ordersHistoryReducer } from "./reducer";

import { useAssetsProvider } from "@/providers/public/assetsProvider";
import { useMarketsProvider } from "@/providers/public/marketsProvider";
import {
  fetchAllFromAppSync,
  fetchFromAppSync,
  Utils,
  sortOrdersDescendingTime,
  eventHandler,
} from "@/helpers";
import { useSettingsProvider } from "@/providers/public/settings";
import * as queries from "@/graphql/queries";

export const OrderHistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    ordersHistoryReducer,
    initialOrdersHistoryState,
  );
  const profileState = useProfile();
  const { onHandleError } = useSettingsProvider();

  const { currentMarket } = useMarketsProvider();
  const { selectGetAsset } = useAssetsProvider();

  const account: UserAccount = profileState.selectedAccount;

  const fetchOpenOrders = useCallback(
    async (tradeAccount: string): Promise<OrderCommon[]> => {
      const ordersRaw: orderHistoryQueryResult[] = await fetchAllFromAppSync(
        queries.listOpenOrdersByMainAccount,
        {
          main_account: tradeAccount,
          limit: 100,
        },
        "listOpenOrdersByMainAccount",
      );
      return ordersRaw.map((order) => ({
        main_account: tradeAccount,
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
    },
    [],
  );

  const onOpenOrdersHistoryFetch = useCallback(async () => {
    try {
      if (account.tradeAddress) {
        const transactions: OrderCommon[] = await fetchOpenOrders(
          account.tradeAddress,
        );
        dispatch(A.userOpenOrderHistoryData({ list: transactions }));
      }
    } catch (error) {
      console.error(error);
      onHandleError(`Open orders fetch error: ${error?.message ?? error}`);
      dispatch(A.userOpenOrdersHistoryError(error));
    }
  }, [account.tradeAddress, fetchOpenOrders, onHandleError]);

  const fetchOrders = useCallback(
    async (
      tradeAddress: string,
      dateFrom: Date,
      dateTo: Date,
      nextTokenFetch: string | null,
    ): Promise<{ orders: OrderCommon[]; nextToken: string | null }> => {
      const dateFromStr = Utils.date.formatDateToISO(dateFrom);
      const dateToStr = Utils.date.formatDateToISO(dateTo);
      const { response: ordersRaw, nextToken }: OrderHistoryResult =
        await fetchFromAppSync(
          queries.listOrderHistorybyMainAccount,
          {
            main_account: tradeAddress,
            from: dateFromStr,
            to: dateToStr,
            limit: 10,
            nextToken: nextTokenFetch,
          },
          "listOrderHistorybyMainAccount",
        );

      return {
        nextToken,
        orders: ordersRaw.map((order) => ({
          main_account: tradeAddress,
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
        })),
      };
    },
    [],
  );

  const onOrdersHistoryFetch = useCallback(
    async ({ dateFrom, dateTo, tradeAddress, orderHistoryNextToken }) => {
      dispatch(A.userOrdersHistoryFetch({ tradeAddress, dateFrom, dateTo }));
      try {
        if (tradeAddress) {
          const { orders, nextToken }: OrderHistoryFetchResult =
            await fetchOrders(
              tradeAddress,
              dateFrom,
              dateTo,
              orderHistoryNextToken,
            );

          dispatch(A.userOrdersHistoryData({ list: orders, nextToken }));
        }
      } catch (error) {
        onHandleError(`Order history fetch error: ${error?.message ?? error} `);
        dispatch(A.userOrdersHistoryError(error));
      }
    },
    [fetchOrders, onHandleError],
  );

  function processOrderData(eventData: SetOrder): OrderCommon {
    const base = eventData.pair.base.asset;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const quote = eventData.pair.quote.asset;

    return {
      main_account: eventData.user,
      id: eventData.id.toString(),
      client_order_id: eventData.client_order_id,
      time: new Date(Number(eventData.timestamp)).toISOString(),
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

  const onOrderUpdates = useCallback(
    (payload: A.OrderUpdateEvent["payload"]) => {
      try {
        const order = processOrderData(payload);
        dispatch(A.orderUpdateEventData(order));
      } catch (error) {
        console.log(
          error,
          "Something has gone wrong (order updates channel)...",
        );
        onHandleError(`Order updates channel ${error?.message ?? error}`);
        dispatch(A.orderUpdateEventError(error));
      }
    },
    [onHandleError],
  );

  const usingAccount = profileState.selectedAccount;
  const { tradeAddress } = usingAccount;
  const orderList = state.list;
  const openOrders = state.openOrders;
  const list = sortOrdersDescendingTime(orderList);
  const openOrdersSorted = sortOrdersDescendingTime(openOrders);
  const userLoggedIn = profileState.selectedAccount.tradeAddress !== "";

  const [updatedList, setUpdatedList] = useState(list);
  const [updatedOpenOrdersSorted, setUpdatedOpenOrdersSorted] =
    useState(openOrdersSorted);

  useEffect(() => {
    onOpenOrdersHistoryFetch();
  }, [onOpenOrdersHistoryFetch]);

  useEffect(() => {
    if (usingAccount.tradeAddress) dispatch(A.userOrdersHistoryReset());
  }, [usingAccount.tradeAddress]);

  const isMarketMatch = useCallback(
    (order: OrderCommon) => {
      const market = currentMarket?.name;
      const [base, quote] = order.m.split("-");
      const baseUnit = selectGetAsset(base)?.symbol;
      const quoteUnit = selectGetAsset(quote)?.symbol;
      const marketForOrder = `${baseUnit}/${quoteUnit}`;
      return marketForOrder === market;
    },
    [selectGetAsset, currentMarket?.name],
  );

  // TODO: Refactor filter process. Should do it on server rather than client
  const filterOrders = useCallback(
    (filters: Ifilters) => {
      let orderHistoryList = list;
      let openOrdersList = openOrdersSorted;

      const { dateFrom, dateTo } = filters;

      if (filters?.onlyBuy) {
        orderHistoryList = orderHistoryList.filter(
          (data) => data.side?.toUpperCase() === "BID",
        );
        openOrdersList = openOrdersList.filter(
          (data) => data.side?.toUpperCase() === "BID",
        );
      } else if (filters?.onlySell) {
        orderHistoryList = orderHistoryList.filter(
          (data) => data.side.toUpperCase() === "ASK",
        );
        openOrdersList = openOrdersList.filter(
          (data) => data.side?.toUpperCase() === "ASK",
        );
      }

      const acceptedStatus = {
        "all transactions": "all",
        pending: "open",
        completed: "closed",
      };

      const status = filters?.status?.toLowerCase();
      const filterStatus = acceptedStatus[status] ?? status;

      if (filterStatus !== Object.values(acceptedStatus)[0]) {
        orderHistoryList = orderHistoryList.filter((item) => {
          return item.status.toLowerCase() === filterStatus;
        });
        openOrdersList = openOrdersList.filter((item) => {
          return item.status.toLowerCase() === filterStatus;
        });
      }

      if (filters?.hiddenPairs) {
        orderHistoryList = orderHistoryList.filter((order) => {
          return isMarketMatch(order) && order;
        });
        openOrdersList = openOrdersList.filter((order) => {
          return isMarketMatch(order) && order;
        });
      }

      // Filter by range
      if (dateFrom && dateTo) {
        orderHistoryList = orderHistoryList.filter((order) => {
          return (
            new Date(order.time) >= dateFrom && new Date(order.time) <= dateTo
          );
        });
        openOrdersList = openOrdersList.filter((order) => {
          return (
            new Date(order.time) >= dateFrom && new Date(order.time) <= dateTo
          );
        });
      }

      setUpdatedList(orderHistoryList);
      setUpdatedOpenOrdersSorted(openOrdersList);
    },
    [list, openOrdersSorted, isMarketMatch],
  );

  useEffect(() => {
    if (tradeAddress?.length) {
      const subscription = eventHandler({
        cb: onOrderUpdates,
        name: tradeAddress,
        eventType: "Order",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [onOrderUpdates, tradeAddress]);

  // for markets order errors the event type is error
  useEffect(() => {
    if (tradeAddress?.length) {
      const subscription = eventHandler({
        cb: () =>
          onHandleError(`Cannot fully fill market order: not enough liquidity`),
        name: tradeAddress,
        eventType: "error",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [onHandleError, tradeAddress]);

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
      }}
    >
      {children}
    </Provider>
  );
};