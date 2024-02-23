import { FC, PropsWithChildren } from "react";

import * as A from "./actions";

export interface OrdersState {
  currentPrice: number | undefined;
  amount: string;
}

export type OrdersProviderProps = PropsWithChildren<{
  value: OrdersContextProps;
}>;

export type OrdersContextProps = OrdersState & {
  onSetCurrentPrice: (value: A.SetCurrentPrice["payload"]) => void;
  onSetCurrentAmount: (value: A.SetAmount["payload"]) => void;
};

export interface OrdersProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type OrdersComponent = FC<PropsWithChildren<OrdersProps>>;
