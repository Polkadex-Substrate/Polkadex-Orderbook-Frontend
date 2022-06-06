import { OrderCommon } from "../../types";

import { OrdersHistoryAction } from "./actions";
import {
  ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_ERROR,
  ORDERS_HISTORY_FETCH,
  ORDER_CHANNEL_UPDATE_DATA,
  ORDER_UPDATE_ACCEPTED,
  ORDER_UPDATE_FILLED,
  ORDER_UPDATE_PARTIALLYFILLED,
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

    case ORDER_UPDATE_ACCEPTED: {
      const orderUpdate = action.payload.update.Accepted;
      const [baseAsset, quoteAsset] = action.payload.trading_pair.split("/");
      const order: OrderCommon = {
        txid: orderUpdate.order_id,
        base_asset_type: baseAsset,
        quote_asset_type: quoteAsset,
        order_type: orderUpdate.order_type,
        status: "Accepted",
        qty: orderUpdate.qty,
        price: orderUpdate.price,
        order_side: orderUpdate.side,
        trade_history: "",
        filled_price: "0",
        filled_qty: "0",
        timestamp: (new Date().getTime() / 1000).toString(),
      };
      const list = [...state.list, order];
      return { ...state, list: sliceArray(list, defaultStorageLimit) };
    }
    case ORDER_UPDATE_FILLED: {
      const list = [...state.list];
      const orderUpdate = action.payload.update.Filled;
      const curr_qty = Number(orderUpdate.qty);
      const curr_price = Number(orderUpdate.price);
      const order = list.find((order) => order.txid === orderUpdate.order_id);
      const orderIdx = list.findIndex((order) => order.txid === orderUpdate.order_id);
      const curr_trade = `${curr_qty}-${curr_price}-${new Date().getTime() / 1000}`;
      if (order) {
        order.filled_price = (curr_price + Number(order.filled_price)).toString();
        order.filled_qty = (curr_qty + Number(order.filled_qty)).toString();
        order.status = "Filled";
        order.trade_history = `${order.trade_history},${curr_trade}`;
      }
      list[orderIdx] = order;
      console.log("filled", order);
      return { ...state, list: sliceArray([...list], defaultStorageLimit) };
    }
    case ORDER_UPDATE_PARTIALLYFILLED: {
      const list = [...state.list];
      const orderUpdate = action.payload.update.PartiallyFilled;
      const curr_qty = Number(orderUpdate.qty);
      const curr_price = Number(orderUpdate.price);
      const order = state.list.find((order) => order.txid === orderUpdate.order_id);
      const orderIdx = list.findIndex((order) => order.txid === orderUpdate.order_id);
      const curr_trade = `${curr_qty}-${curr_price}-${new Date().getTime() / 1000}`;
      if (order) {
        order.filled_price = (curr_price + Number(order.filled_price)).toString();
        order.filled_qty = (curr_qty + Number(order.filled_qty)).toString();
        order.status = "PartiallyFilled";
        order.trade_history = `${order.trade_history},${curr_trade}`;
      }
      list[orderIdx] = order;
      console.log("partially filled", order);
      return { ...state, list: sliceArray([...list], defaultStorageLimit) };
    }
    default:
      return state;
  }
};
