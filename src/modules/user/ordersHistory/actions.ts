import { CommonError, OrderCommon } from "../../types";

import {
  OPEN_ORDERS_HISTORY_DATA,
  OPEN_ORDERS_HISTORY_FETCH,
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
export interface UserOpenOrdersHistoryFetch {
  type: typeof OPEN_ORDERS_HISTORY_FETCH;
}

export interface UserOpenOrdersHistoryData {
  type: typeof OPEN_ORDERS_HISTORY_DATA;
  payload: { list: OrderCommon[] };
}
export interface FetchOrderUpdatesChannel {
  type: typeof ORDERS_CHANNEL_FETCH;
}

export interface OrderUpdatesChannelData {
  type: typeof ORDER_CHANNEL_UPDATE_DATA;
  payload: OrderCommon;
}

export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError
  | FetchOrderUpdatesChannel
  | OrderUpdatesChannelData
  | UserOpenOrdersHistoryData;

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

export const userOpenOrdersHistoryFetch = (): UserOpenOrdersHistoryFetch => ({
  type: OPEN_ORDERS_HISTORY_FETCH,
});

export const userOpenOrderHistoryData = (
  payload: UserOpenOrdersHistoryData["payload"]
): UserOpenOrdersHistoryData => ({
  type: OPEN_ORDERS_HISTORY_DATA,
  payload,
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
