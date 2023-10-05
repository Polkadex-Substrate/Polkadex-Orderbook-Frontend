import { CommonError, OrderCommon } from "../../types";

import {
  ORDER_UPDATE_EVENT,
  ORDER_UPDATE_EVENT_DATA,
  ORDER_UPDATE_EVENT_ERROR,
} from "./constants";
import { SetOrder } from "./types";

export interface OrderUpdateEvent {
  type: typeof ORDER_UPDATE_EVENT;
  payload: SetOrder;
}

export interface OrderUpdateEventData {
  type: typeof ORDER_UPDATE_EVENT_DATA;
  payload: OrderCommon;
}
export interface OrderUpdateEventError {
  type: typeof ORDER_UPDATE_EVENT_ERROR;
  error: CommonError;
}
export type OrdersHistoryAction = OrderUpdateEventData | OrderUpdateEventError;

export const orderUpdateEvent = (
  payload: OrderUpdateEvent["payload"]
): OrderUpdateEvent => ({
  type: ORDER_UPDATE_EVENT,
  payload,
});

export const orderUpdateEventData = (
  payload: OrderUpdateEventData["payload"]
): OrderUpdateEventData => ({
  type: ORDER_UPDATE_EVENT_DATA,
  payload,
});

export const orderUpdateEventError = (
  error: CommonError
): OrderUpdateEventError => ({
  type: ORDER_UPDATE_EVENT_ERROR,
  error,
});
