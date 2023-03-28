import { FC, PropsWithChildren } from "react";
import { Market } from "@polkadex/orderbook/modules/public/markets/types";

export type OrderbookRawUpdate = {
  side: "Bid" | "Ask";
  price: string;
  qty: string;
  seq: number;
};

export interface OrderBookDbState {
  p: string;
  q: string;
  s: "Bid" | "Ask";
}

export interface OrderBookState {
  orderbook: { asks: string[][]; bids: string[][]; loading: boolean };
  depth: { asks?: string[][]; bids?: string[][]; loading?: boolean };
}

export type OrderBookProviderProps = PropsWithChildren<{
  value: OrderBookContextProps;
}>;

export type OrderBookContextProps = OrderBookState & {
  onOrderBook: (value: Market) => void;
  onOrderBookChanel: (value: Market) => void;
};

export interface OrderBookProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type OrderBookComponent = FC<PropsWithChildren<OrderBookProps>>;
