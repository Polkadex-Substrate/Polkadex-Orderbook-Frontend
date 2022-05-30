import { OrderCommon } from "../../types";

import { OrdersHistoryAction } from "./actions";
import {
  ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_ERROR,
  ORDERS_HISTORY_FETCH,
  ORDER_CHANNEL_UPDATE_DATA,
} from "./constants";

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

    case ORDER_CHANNEL_UPDATE_DATA: {
      const update = action.payload.update;
      const orders = [...state.list];
      const idx = orders.findIndex(
        (order) =>
          order.txid ===
          (update?.PartiallyFilled?.order_id || order.txid === update?.Filled?.order_id)
      );
      if (idx < 0) {
        return state;
      }
      const order = orders[idx];
      order.status = Object.keys(update)[0];
      return { ...state, list: [...orders] };
    }
    default:
      return state;
  }
};
