import { OrderCommon } from "../../types";

import { OrdersHistoryAction } from "./actions";
import { ORDERS_HISTORY_DATA, ORDERS_HISTORY_ERROR, ORDERS_HISTORY_FETCH } from "./constants";

import { sliceArray } from "@polkadex/web-helpers";
import { defaultConfig } from "@polkadex/orderbook-config";

const { defaultStorageLimit } = defaultConfig;
export interface OrdersHistoryState {
  list: OrderCommon[];
  loading: boolean;
  pageIndex: number;
  success: boolean;
}

export const initialOrdersHistoryState: OrdersHistoryState = {
  list: [],
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
    default:
      return state;
  }
};
