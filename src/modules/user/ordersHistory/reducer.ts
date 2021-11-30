import { OrderCommon } from "../../types";

import { OrdersHistoryAction } from "./actions";
import { ORDERS_HISTORY_DATA, ORDERS_HISTORY_ERROR, ORDERS_HISTORY_FETCH } from "./constants";

import { sliceArray } from "@polkadex/web-helpers";
import { defaultConfig } from "@polkadex/orderbook-config";

const { defaultStorageLimit } = defaultConfig;
export interface OrdersHistoryState {
  list: OrderCommon[];
  fetching: boolean;
  pageIndex: number;
  cancelAllFetching: boolean;
  cancelAllError: boolean;
  cancelError: boolean;
  cancelFetching: boolean;
  nextPageExists: boolean;
}

export const initialOrdersHistoryState: OrdersHistoryState = {
  list: [],
  fetching: false,
  pageIndex: 0,
  cancelAllFetching: false,
  cancelAllError: false,
  cancelError: false,
  cancelFetching: false,
  nextPageExists: false,
};

export const ordersHistoryReducer = (
  state = initialOrdersHistoryState,
  action: OrdersHistoryAction
): OrdersHistoryState => {
  switch (action.type) {
    case ORDERS_HISTORY_FETCH:
      return { ...state, fetching: true };
    case ORDERS_HISTORY_DATA:
      return {
        ...state,
        list: sliceArray(action.payload.list, defaultStorageLimit),
        fetching: false,
      };
    case ORDERS_HISTORY_ERROR:
      return { ...state, list: [], pageIndex: 0, fetching: false };
    default:
      return state;
  }
};
