import { MarketsState, TickerEvent, OrderBookState, OrdersState } from "./";

export type CommonError = {
  code: number;
  message: string[];
};

export type CommonState = {
  error?: CommonError;
  loading?: boolean;
};
export type OrderStatus = "wait" | "done" | "cancel" | "pending" | "reject";
export type OrderSide = "sell" | "buy";
export type OrderType = "limit" | "market";
export type OrderKind = "bid" | "ask";

export interface OrderCommon {
  id: string;
  timestamp: number;
  last_trade_timestamp?: null;
  status: string;
  symbol?: string[] | null;
  order_type: string;
  order_side: string;
  price: number;
  average: number;
  amount: number;
  filled: number;
  trades?: null[] | null;
  fee: Fee;
}
export interface Fee {
  currency: string;
  cost: number;
}

export interface OrderEvent extends OrderCommon {
  at: number;
  order_type: OrderType;
}

export interface MarketUpdateEvent {
  asks: Array<[number, number]>;
  bids: Array<[number, number]>;
}

export type RangerEvent = TickerEvent | OrderEvent | MarketUpdateEvent;

export interface CoreState {
  orders: OrdersState;
  orderBook: OrderBookState;
  markets: MarketsState;
}

export interface ClientState {
  coreData: CoreState;
}
