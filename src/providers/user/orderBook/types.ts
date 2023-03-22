import { FC, PropsWithChildren } from "react";

export interface OrderBookState {
  orderbook: { asks: []; bids: []; loading: boolean };
  depth: { asks: []; bids: []; loading: boolean };
}

export type OrderBookProviderProps = PropsWithChildren<{
  value: OrderBookContextProps;
}>;

export type OrderBookContextProps = OrderBookState & {};

export interface OrderBookProps {
  onError?: (value: string) => void;
}

export type OrderBookComponent = FC<PropsWithChildren<OrderBookProps>>;
