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
export type OrderSide = "Sell" | "Buy";
export type OrderType = "limit" | "Market";
export type OrderKind = "bid" | "ask";

// TODO: Integrate new Types.
export interface OrderCommon {
  id: string;
  timestamp: number;
  last_trade_timestamp?: null;
  status: "Open" | "Closed";
  symbol?: string[];
  order_type: "Limit" | "Market";
  order_side: "Buy" | "Sell";
  price?: number | null;
  average: number;
  amount: number;
  filled: number;
  trades?: (TradesEntity | null)[] | null;
  fee: Fee;
}
export interface TradesEntity {
  id: string;
  timestamp: number;
  symbol?: string[] | null;
  order_id: string;
  order_type: string;
  order_side: string;
  price: number;
  amount: number;
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
