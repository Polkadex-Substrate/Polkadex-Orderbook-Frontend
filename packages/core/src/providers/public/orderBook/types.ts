import { FC, PropsWithChildren } from "react";

export type OrderbookRawUpdate = {
  side: "Bid" | "Ask";
  price: string;
  qty: string;
  seq: number;
};

export type OBIncrementData = {
  i: number;
  m: string;
  b: Record<string, string>;
  a: Record<string, string>;
};

export interface OrderBookDbState {
  p: string;
  q: string;
  s: "Bid" | "Ask";
}

export interface OrderBookState {
  depth: { asks: string[][]; bids: string[][]; loading?: boolean };
}

export type OrderBookProviderProps = PropsWithChildren<{
  value: OrderBookContextProps;
}>;

export type OrderBookContextProps = OrderBookState;

export interface OrderBookProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type OrderBookComponent = FC<PropsWithChildren<OrderBookProps>>;
