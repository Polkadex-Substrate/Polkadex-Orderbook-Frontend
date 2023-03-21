import { FC, PropsWithChildren } from "react";
import { CommonActionState } from "../../types";

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

export type OrdersContextProps = OrdersState & {};

export interface OrdersProps {
  onError?: (value: string) => void;
}

export type OrdersComponent = FC<PropsWithChildren<OrdersProps>>;
