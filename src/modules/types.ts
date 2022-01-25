import { MarketsState, TickerEvent, OrderBookState, OrdersState } from "./";

export type CommonError = {
  code: number;
  message: string[];
};

export type CommonState = {
  error?: CommonError;
  loading?: boolean;
};
export type OrderStatus = "Open" | "Closed" | "Expired" | "Canceled" | "Failed";
export type OrderSide = "Sell" | "Buy";
export type OrderType = "Limit" | "Market";
export type OrderKind = "bid" | "ask";

// TODO: Integrate new Types.
export interface OrderCommon {
  amount: string;
  base_asset: number;
  quote_asset: number;
  fee: Fee;
  filled_qty: string;
  main_acc: string;
  order_id: string;
  order_side: OrderSide;
  order_type: OrderType;
  price: string;
  status: OrderStatus;
  timestamp: string;
  trades: TradesEntity[];
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
  currency: { Asset: number };
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
