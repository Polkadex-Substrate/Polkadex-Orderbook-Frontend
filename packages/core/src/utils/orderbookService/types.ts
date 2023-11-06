// number type can be used for all calculations as it supports up to 15 digits after decimal point
// while max precision of backend is 8 digits after decimal point

export interface Market {
  id: string; // eg: "123-231"
  name: string; // eg: "BTC/USDT"
  baseAsset: Asset;
  quoteAsset: Asset;
}

export interface MarketConfig extends Market {
  minPrice: number;
  maxPrice: number;
  minQty: number;
  maxQty: number;
  maxVolume: number;
  minVolume: number;
  basePrecision: number;
  quotePrecision: number;
}

export type Asset = {
  id: string;
  ticker: string;
  name: string;
  decimal: number;
};

export type Orderbook = {
  bids: Array<[number, number]>;
  asks: Array<[number, number]>;
};

export type OrderType = "LIMIT" | "MARKET";
export type OrderStatus = "OPEN" | "CLOSED" | "CANCELLED";
export type OrderSide = "Ask" | "Bid";
export interface Order {
  tradeAddress: string;
  orderId: string;
  price: string;
  averagePrice: number;
  mainAddress: string;
  type: OrderType;
  status: OrderStatus;
  isReverted: boolean;
  fee: number;
  timestamp: Date;
  market: Market;
}

export interface Trade {
  tradeAddress: string;
  mainAddress: string;
  takerOrderId: string;
  makerOrderId: string;
  price: number;
  qty: number;
  isReverted: boolean;
  fee: number;
  timestamp: Date;
}

export interface PublicTrade {
  tradeAddress: string;
  price: number;
  qty: number;
  isReverted: boolean;
}

export type Ticker = {
  open: number;
  close: number;
  high: number;
  low: number;
  baseVolume: number;
  QuoteVolume: number;
  currentPrice: number;
};
export type Balance = {
  asset: Asset;
  free: number;
  reserved: number;
};
export type Kline = {
  open: number;
  high: number;
  low: number;
  close: number;
  baseVolume: number;
  quoteVolume: number;
};

export type Transaction = {
  txType: "DEPOSIT" | "WITHDRAW";
  amount: number;
  fee: number;
  timestamp: Date;
  status: "PENDING" | "CONFIRMED" | "READY" | "CLAIMED";
  asset: Asset;
};

export type PriceLevel = {
  price: number;
  qty: number;
  side: OrderSide;
};
export interface Subscription<T> {
  subscribe: (callback: (data: T) => void) => void;
  unsubscribe: () => void;
}

export interface UserHistoryProps<T = null> {
  address: string;
  from: Date;
  to: Date;
  limit: number;
  pageParams: T;
  market?: string;
}

export interface MarketHistoryProps<T = null> {
  market: string;
  from: Date;
  to: Date;
  limit: number;
  pageParams: T;
}
