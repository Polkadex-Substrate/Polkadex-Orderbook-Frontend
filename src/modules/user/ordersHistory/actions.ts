import { CommonError, OrderCommon } from "../../types";

import { ORDERS_HISTORY_DATA, ORDERS_HISTORY_ERROR, ORDERS_HISTORY_FETCH } from "./constants";

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

export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError;

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
