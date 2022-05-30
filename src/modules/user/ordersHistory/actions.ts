import { CommonError, OrderCommon, OrderSide, OrderType } from "../../types";

import {
  ORDERS_CHANNEL_FETCH,
  ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_ERROR,
  ORDERS_HISTORY_FETCH,
  ORDER_CHANNEL_UPDATE_DATA,
} from "./constants";

export interface UserOrdersHistoryFetch {
  type: typeof ORDERS_HISTORY_FETCH;
}
export interface UserOrdersHistoryData {
  type: typeof ORDERS_HISTORY_DATA;
  payload: { list: OrderCommon[] };
}

export interface UserOrdersHistoryError {
  type: typeof ORDERS_HISTORY_ERROR;
  error: CommonError;
}
export interface FetchOrderUpdatesChannel {
  type: typeof ORDERS_CHANNEL_FETCH;
}
// {
//   trading_pair: "PDEX/1",
//   update: {
//     Accepted: {
//       order_id: 335613430048268376252486492096633622314,
//       user: "5DwPy8LFTXReZtboaDH3tFN9jqjMpqqnavLuimD2a5s7dHa5",
//       side: "Bid",
//       order_type: "LIMIT",
//       price: "1",
//       qty: "1",
//     },
//   },
// };

type OrderUpdatePayload = {
  order_id: string;
  user: string;
  side: OrderSide;
  order_type: OrderType;
  price: string;
  qty: string;
};

type OrderAccepted = {
  Accepted: OrderUpdatePayload;
};
type OrderPartiallyFilled = {
  PartiallyFilled: OrderUpdatePayload;
};
type OrderFilled = {
  Filled: OrderUpdatePayload;
};

export type OrderUpdateEvent = {
  trading_pair: string;
  update: OrderAccepted | OrderPartiallyFilled | OrderFilled;
};

export interface OrderUpdatesChannelData {
  type: typeof ORDER_CHANNEL_UPDATE_DATA;
  payload: OrderUpdateEvent;
}
export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError
  | FetchOrderUpdatesChannel
  | OrderUpdatesChannelData;

export const userOrdersHistoryFetch = (): UserOrdersHistoryFetch => ({
  type: ORDERS_HISTORY_FETCH,
});

export const userOrdersHistoryData = (
  payload: UserOrdersHistoryData["payload"]
): UserOrdersHistoryData => ({
  type: ORDERS_HISTORY_DATA,
  payload,
});

export const userOrdersHistoryError = (error: CommonError): UserOrdersHistoryError => ({
  type: ORDERS_HISTORY_ERROR,
  error,
});

export const userOrderUpdatesChannelFetch = (): FetchOrderUpdatesChannel => ({
  type: ORDERS_CHANNEL_FETCH,
});

export const userOrderChannelUpdateData = (
  payload: OrderUpdatesChannelData["payload"]
): OrderUpdatesChannelData => ({
  type: ORDER_CHANNEL_UPDATE_DATA,
  payload,
});
