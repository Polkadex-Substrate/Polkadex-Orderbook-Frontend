import { OrderCommon } from "../../types";

import { OrdersHistoryAction } from "./actions";
import {
  OPEN_ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_ERROR,
  ORDERS_HISTORY_FETCH,
  ORDER_UPDATE_EVENT_DATA,
} from "./constants";

import { sliceArray } from "@polkadex/web-helpers";
import { defaultConfig } from "@polkadex/orderbook-config";

const { defaultStorageLimit } = defaultConfig;
export interface OrdersHistoryState {
  list: OrderCommon[];
  openOrders: OrderCommon[];
  loading: boolean;
  pageIndex: number;
  success: boolean;
}

export const initialOrdersHistoryState: OrdersHistoryState = {
  list: [],
  openOrders: [],
  loading: false,
  pageIndex: 0,
  success: false,
};

export const ordersHistoryReducer = (
  state = initialOrdersHistoryState,
  action: OrdersHistoryAction
): OrdersHistoryState => {
  switch (action.type) {
    case ORDERS_HISTORY_FETCH:
      return { ...state, loading: true };
    case ORDERS_HISTORY_DATA:
      return {
        ...state,
        list: sliceArray(action.payload.list, defaultStorageLimit),
        loading: false,
        success: true,
      };
    case ORDERS_HISTORY_ERROR:
      return { ...state, list: [], pageIndex: 0, loading: false };

    case OPEN_ORDERS_HISTORY_DATA:
      return { ...state, openOrders: sliceArray(action.payload.list, defaultStorageLimit) };

    case ORDER_UPDATE_EVENT_DATA: {
      const openOrders = [...state.openOrders];
      const allOrders = [...state.list];
      const newOrder = action.payload;
      // add to orderhistory for all cases
      const updatedOrderHistory = replaceOrPushOrder(allOrders, newOrder);
      let updatedOpenOrders = [];
      if (newOrder.status === "OPEN") {
        updatedOpenOrders = replaceOrPushOrder(openOrders, newOrder);
      } else {
        // remove from open orders if it is closed
        updatedOpenOrders = removeOrderFromList(openOrders, newOrder);
      }
      return {
        ...state,
        list: updatedOrderHistory,
        openOrders: updatedOpenOrders,
      };
    }
    default:
      return state;
  }
};

// TODO: add test cases for this
const replaceOrPushOrder = (orders: OrderCommon[], newOrder: OrderCommon): OrderCommon[] => {
  const index = orders.findIndex((order) => order.id === newOrder.id);
  if (index === -1) {
    return [...orders, newOrder];
  }
  return [...orders.slice(0, index), newOrder, ...orders.slice(index + 1)];
};

// TODO: add test cases for this
const removeOrderFromList = (orders: OrderCommon[], newOrder: OrderCommon): OrderCommon[] => {
  const index = orders.findIndex((order) => order.id === newOrder.id);
  if (index === -1) {
    return orders;
  }
  return [...orders.slice(0, index), ...orders.slice(index + 1)];
};
