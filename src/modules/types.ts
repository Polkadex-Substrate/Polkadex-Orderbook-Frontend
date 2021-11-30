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
  // TODO: Check order types
  // date: string;
  // baseUnit: string;
  // quoteUnit: string;
  // side: string;
  // isSell: boolean;
  // price: string;
  // amount: string;
  // total: string;
  // filled: string;
  // type: string;
  // uuid: string;
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
  state?: "wait" | "filled" | "cancel" | "pending" | "reject"; // TODO: Verify states & filled
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
