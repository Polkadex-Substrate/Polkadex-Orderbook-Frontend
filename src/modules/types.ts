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
export type OrderType = "LIMIT" | "MARKET";
export type OrderKind = "bid" | "ask";

// TODO: Integrate new Types.
export interface OrderCommon {
  txid: string;
  base_asset_type: string;
  quote_asset_type: string;
  order_side: string;
  filled_qty: string;
  timestamp: string;
  order_type: string;
  status: string;
  qty: string;
  price: string;
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
