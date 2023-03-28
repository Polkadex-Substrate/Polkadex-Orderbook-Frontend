import { FC, PropsWithChildren } from "react";
import { CommonActionState } from "../../types";
import * as A from "./actions";

export interface OrdersState {
  execute: CommonActionState;
  currentPrice: number | undefined;
  amount: string;
  orderType: string;
  cancel: CommonActionState;
}

export type OrdersProviderProps = PropsWithChildren<{
  value: OrdersContextProps;
}>;

export type OrdersContextProps = OrdersState & {
  onPlaceOrders: (value: A.OrderExecuteFetch["payload"]) => void;
  onCancelOrder: (value: A.OrderCancelFetch["payload"]) => void;
};

export interface OrdersProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type OrdersComponent = FC<PropsWithChildren<OrdersProps>>;
