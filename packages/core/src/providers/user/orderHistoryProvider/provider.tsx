import { useCallback, useEffect, useReducer } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core/constants";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useMarketsProvider } from "@orderbook/core/providers/public/marketsProvider";
import {
  sortOrdersDescendingTime,
  eventHandler,
  sliceArray,
} from "@orderbook/core/helpers";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useSessionProvider } from "@orderbook/core/providers/user/sessionProvider";
import { defaultConfig } from "@orderbook/core/config";

import { OrderCommon } from "../../types";
import { useProfile } from "../profile";

import { OrderHistoryFetchResult, SetOrder } from "./types";
import * as A from "./actions";
import { Provider } from "./context";
import { initialOrdersHistoryState, ordersHistoryReducer } from "./reducer";
import { fetchOpenOrders, fetchOrderHistory } from "./helper";

export const OrderHistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    ordersHistoryReducer,
    initialOrdersHistoryState
  );
  const { selectedAccount: account } = useProfile();
  const { onHandleError } = useSettingsProvider();
  const { currentMarket } = useMarketsProvider();
  const { selectGetAsset } = useAssetsProvider();
  const { dateFrom, dateTo } = useSessionProvider();

  const { tradeAddress } = account;

  const userLoggedIn = tradeAddress !== "";

  const shouldFetchOrderHistory = Boolean(
    userLoggedIn && currentMarket && tradeAddress
  );

  const {
    data: orderHistoryList,
    fetchNextPage: fetchNextOrderHistoryPage,
    isLoading: isOrderHistoryLoading,
    hasNextPage: hasNextOrderHistoryPage,
    isSuccess: isOrderHistorySuccess,
    error: orderHistoryError,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.orderHistory(dateFrom, dateTo, tradeAddress),
    enabled: shouldFetchOrderHistory,
    queryFn: async ({ pageParam = null }) => {
      return await onOrdersHistoryFetch({
        dateFrom,
        dateTo,
        tradeAddress,
        orderHistoryNextToken: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      // If the last page contains nextToken as null, don't fetch the next page
      if (!lastPage.nextToken) {
        return false;
      }
      return lastPage.nextToken;
    },
  });

  const onOpenOrdersHistoryFetch = useCallback(async () => {
    try {
      if (account.tradeAddress) {
        const transactions: OrderCommon[] = await fetchOpenOrders(
          account.tradeAddress
        );
        dispatch(A.userOpenOrderHistoryData({ list: transactions }));
      }
    } catch (error) {
      console.error(error);
      onHandleError(`Open orders fetch error: ${error?.message ?? error}`);
      dispatch(A.userOpenOrdersHistoryError(error));
    }
  }, [account.tradeAddress, onHandleError]);

  const onOrdersHistoryFetch = async ({
    dateFrom,
    dateTo,
    tradeAddress,
    orderHistoryNextToken,
  }) => {
    if (tradeAddress) {
      const { orders, nextToken }: OrderHistoryFetchResult =
        await fetchOrderHistory(
          tradeAddress,
          dateFrom,
          dateTo,
          orderHistoryNextToken
        );

      return {
        data: sliceArray(orders, defaultConfig.defaultStorageLimit),
        nextToken,
      };
    }
    return { data: [], nextToken: null };
  };

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
          "Something has gone wrong (order updates channel)..."
        );
        onHandleError(`Order updates channel ${error?.message ?? error}`);
        dispatch(A.orderUpdateEventError(error));
      }
    },
    [onHandleError]
  );

  const openOrders = state.openOrders;
  const openOrdersSorted = sortOrdersDescendingTime(openOrders);

  const isMarketMatch = useCallback(
    (order: OrderCommon) => {
      const market = currentMarket?.name;
      const [base, quote] = order.m.split("-");
      const baseUnit = selectGetAsset(base)?.symbol;
      const quoteUnit = selectGetAsset(quote)?.symbol;
      const marketForOrder = `${baseUnit}/${quoteUnit}`;
      return marketForOrder === market;
    },
    [selectGetAsset, currentMarket?.name]
  );

  // TODO: Refactor filter process. Should do it on server rather than client
  // const filterOrders = useCallback(
  //   (filters: Ifilters) => {
  //     let openOrdersList = openOrdersSorted;

  //     if (filters?.hiddenPairs) {
  //       openOrdersList = openOrdersList.filter((order) => {
  //         return isMarketMatch(order) && order;
  //       });
  //     }

  //     if (filters?.onlyBuy && filters.onlySell) {
  //       // Nothing to do
  //     } else if (filters?.onlyBuy) {
  //       openOrdersList = openOrdersList.filter(
  //         (data) => data.side?.toUpperCase() === "BID"
  //       );
  //     } else if (filters?.onlySell) {
  //       openOrdersList = openOrdersList.filter(
  //         (data) => data.side?.toUpperCase() === "ASK"
  //       );
  //     }

  //     setUpdatedOpenOrdersSorted(openOrdersList);
  //   },
  //   [openOrdersSorted, isMarketMatch]
  // );

  useEffect(() => {
    onOpenOrdersHistoryFetch();
  }, [onOpenOrdersHistoryFetch]);

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
        onOrderUpdates,
        orderHistory:
          orderHistoryList?.pages.flatMap((page) => page.data) ?? [],
        openOrders: openOrdersSorted,
        hasNextOrderHistoryPage,
        fetchNextOrderHistoryPage,
        isOrderHistoryLoading,
        isOrderHistorySuccess,
        isMarketMatch,
        orderHistoryError: orderHistoryError as string,
      }}
    >
      {children}
    </Provider>
  );
};
