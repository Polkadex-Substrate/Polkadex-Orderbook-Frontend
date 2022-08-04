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
import { OpenOrders } from "@polkadex/orderbook-ui/organisms/OpenOrders";

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
      // check if orderId is preseent in open Orders
      let idx = openOrders.findIndex((order) => order.id === newOrder.id);
      if (idx >= 0 && newOrder.status === "OPEN") {
        // order present in open_order list, got partially filled
        openOrders[idx] = newOrder;
      } else if (idx >= 0 && newOrder.status !== "OPEN") {
        // order present in open_order list, got fully filled or cancelled, remove from list
        openOrders.splice(idx, 1);
      } else if (idx < 0 && newOrder.status === "OPEN") {
        // not present in open_orders list , ie order just created
        openOrders.push(newOrder);
      }
      // check if orderId is preseent in all Orders
      idx = allOrders.findIndex((order) => order.id === newOrder.id);
      if (idx >= 0) {
        allOrders[idx] = newOrder;
      } else {
        allOrders.push(newOrder);
      }
      return {
        ...state,
        list: allOrders,
        openOrders,
      };
    }
    default:
      return state;
  }
};
