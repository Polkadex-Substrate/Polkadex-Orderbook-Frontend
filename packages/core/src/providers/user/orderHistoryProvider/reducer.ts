import { sliceArray } from "@orderbook/core/helpers";
import { defaultConfig } from "@orderbook/core/config";

import { OrderCommon } from "../../types";

import { OrdersHistoryAction } from "./actions";
import { ORDER_UPDATE_EVENT_DATA, ORDER_UPDATE_EVENT_ERROR } from "./constants";
import { OrdersHistoryState } from "./types";

const { defaultStorageLimit } = defaultConfig;

export const initialOrdersHistoryState: OrdersHistoryState = {
  openOrders: [],
  isOrderHistorySuccess: false,
  isOrderHistoryLoading: false,
  hasNextOrderHistoryPage: undefined,
  orderHistoryError: undefined,
  isOpenOrdersLoading: false,
};

export const ordersHistoryReducer = (
  state = initialOrdersHistoryState,
  action: OrdersHistoryAction
): OrdersHistoryState => {
  switch (action.type) {
    // case ORDER_UPDATE_EVENT_DATA: {
    //   const openOrders = [...state.openOrders];
    //   const allOrders = [...state.list];
    //   const newOrder = action.payload;
    //   // add to orderhistory for all cases
    //   const updatedOrderHistory = replaceOrPushOrder(allOrders, newOrder);
    //   let updatedOpenOrders: OrderCommon[] = [];
    //   if (newOrder.status === "OPEN") {
    //     updatedOpenOrders = replaceOrPushOrder(openOrders, newOrder);
    //   } else {
    //     // remove from open orders if it is closed
    //     updatedOpenOrders = removeOrderFromList(openOrders, newOrder);
    //   }
    //   return {
    //     ...state,
    //     list: updatedOrderHistory,
    //     openOrders: updatedOpenOrders,
    //   };
    // }
    // case ORDER_UPDATE_EVENT_ERROR:
    //   return { ...state, list: [], openOrders: [] };

    default:
      return state;
  }
};

// TODO: add test cases for this
export const replaceOrPushOrder = (
  orders: OrderCommon[],
  newOrder: OrderCommon
): OrderCommon[] => {
  const index = orders.findIndex((order) => order.id === newOrder.id);
  if (index === -1) {
    return [...orders, newOrder];
  }
  return [...orders.slice(0, index), newOrder, ...orders.slice(index + 1)];
};

// TODO: add test cases for this
export const removeOrderFromList = (
  orders: OrderCommon[],
  newOrder: OrderCommon
): OrderCommon[] => {
  const index = orders.findIndex((order) => order.id === newOrder.id);
  if (index === -1) {
    return orders;
  }
  return [...orders.slice(0, index), ...orders.slice(index + 1)];
};
