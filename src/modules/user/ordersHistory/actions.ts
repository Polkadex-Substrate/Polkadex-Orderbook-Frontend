import { CommonError, OrderCommon } from "../../types";
import { ProxyAccount } from "../profile";

import { ORDERS_HISTORY_DATA, ORDERS_HISTORY_ERROR, ORDERS_HISTORY_FETCH } from "./constants";

export interface UserOrdersHistoryDataPayload {
  list: OrderCommon[];
}

export interface UserOrdersHistoryFetch {
  type: typeof ORDERS_HISTORY_FETCH;
}

export interface UserOrdersHistoryData {
  type: typeof ORDERS_HISTORY_DATA;
  payload: UserOrdersHistoryDataPayload;
}

export interface UserOrdersHistoryError {
  type: typeof ORDERS_HISTORY_ERROR;
  error: CommonError;
}

export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError;

export const userOrdersHistoryFetch = (): UserOrdersHistoryFetch => ({
  type: ORDERS_HISTORY_FETCH,
});

export const userOrdersHistoryData = (
  payload: UserOrdersHistoryDataPayload
): UserOrdersHistoryData => ({
  type: ORDERS_HISTORY_DATA,
  payload,
});

export const userOrdersHistoryError = (error: CommonError): UserOrdersHistoryError => ({
  type: ORDERS_HISTORY_ERROR,
  error,
});
