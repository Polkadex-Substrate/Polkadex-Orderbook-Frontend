import { KeyringPair } from "@polkadot/keyring/types";

import { PLACE_ORDERS_EXECUTE, CANCEL_ORDERS_EXECUTE, PLACE_SINGLE_ORDER } from "./constants";
import { orderTxn } from "./reducer";

//! Verify ->
export interface IOrderTransactionBase {
  proxyKeyring: KeyringPair;
  mainAddress: string;
  nonce: number;
  baseAsset: string;
  quoteAsset: string;
}

export interface PlaceOrdersExecutionPayload extends IOrderTransactionBase {
  ordertype: string;
  orderSide: string;
  price: number | string;
  quantity: number;
  isSell: boolean;
}

export interface PlaceOrdersExecutionAction {
  type: string;
  payload: PlaceOrdersExecutionPayload;
}

export interface IPlaceSingleOrder {
  date: string;
  baseUnit: string;
  quoteUnit: string;
  side: string;
  isSell: boolean;
  price: string;
  amount: string;
  total: string;
  filled: string;
  type: string;
  uuid: string;
}

export interface CancelOrdersExecutionPayload extends IOrderTransactionBase {
  order_uuid: string;
}

export interface CancelOrdersExecutionAction {
  type: string;
  payload: CancelOrdersExecutionPayload;
}

export interface placeSingleOrder {
  type: string;
  payload: { order: orderTxn };
}

export interface cancelSingleOrder {
  type: string;
  payload: { uuid: string };
}

export type ordersTransactionAction = cancelSingleOrder | placeSingleOrder;

export const placeOrdersExecute = (
  payload: PlaceOrdersExecutionPayload
): PlaceOrdersExecutionAction => ({
  type: PLACE_ORDERS_EXECUTE,
  payload,
});

export const placeSingleOrder = (payload: IPlaceSingleOrder) => ({
  type: PLACE_SINGLE_ORDER,
  payload,
});

export const cancelOrdersExecute = (
  payload: CancelOrdersExecutionPayload
): CancelOrdersExecutionAction => ({
  type: CANCEL_ORDERS_EXECUTE,
  payload,
});
