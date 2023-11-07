import {
  Asset,
  Balance,
  Kline,
  Order,
  Orderbook,
  Subscription,
  Trade,
  UserHistoryProps,
  Market,
  Ticker,
  Transaction,
  PublicTrade,
  PriceLevel,
  KlineHistoryProps,
  OrderHistoryProps,
  MaybePaginated,
  LatestTradesPropsForMarket,
  AccountUpdateEvent,
} from "./types";

export interface BaseStrategy {
  init: () => Promise<void>;
  isReady: () => boolean;
}
export interface OrderbookReadStrategy extends BaseStrategy {
  getOrderbook: (market: string) => Promise<Orderbook>;
  getMarkets: () => Promise<Market[]>;
  getTicker: (market: string) => Promise<Ticker>;
  getAssets: () => Promise<Asset[]>;
  getOpenOrders: (args: OrderHistoryProps) => Promise<Order[]>;
  getOrderHistory: (args: UserHistoryProps) => Promise<MaybePaginated<Order[]>>;
  getTradeHistory: (args: UserHistoryProps) => Promise<MaybePaginated<Trade[]>>;
  getLatestTradesForMarket: (
    args: LatestTradesPropsForMarket
  ) => Promise<PublicTrade[]>;
  getBalance: (fundingAddress: string) => Promise<Balance[]>;
  getTradingAddresses: (fundingAddress: string) => Promise<string[]>;
  getFundingAddress: (
    tradeAddress: string
  ) => Promise<string | null | undefined>;
  getCandles: (args: KlineHistoryProps) => Promise<Kline[]>;
  getTransactions: (
    args: UserHistoryProps
  ) => Promise<MaybePaginated<Transaction[]>>;
}

export type SubscriptionCallBack<T> = (data: T) => void;
export interface OrderbookSubscriptionStrategy extends BaseStrategy {
  subscribeOrderbook(
    market: string,
    onUpdate: SubscriptionCallBack<PriceLevel[]>
  ): Subscription;
  subscribeBalances(
    address: string,
    onUpdate: SubscriptionCallBack<Balance>
  ): Subscription;
  subscribeTicker(
    market: string,
    onUpdate: SubscriptionCallBack<Ticker>
  ): Subscription;
  subscribeUserTrades(
    address: string,
    onUpdate: SubscriptionCallBack<Trade>
  ): Subscription;
  subscribeLatestTrades(
    market: string,
    onUpdate: SubscriptionCallBack<PublicTrade>
  ): Subscription;
  subscribeOrders(
    address: string,
    onUpdate: SubscriptionCallBack<Order>
  ): Subscription;
  subscribeTransactions(
    address: string,
    onUpdate: SubscriptionCallBack<Transaction>
  ): Subscription;
  subscribeKLines(
    market: string,
    onUpdate: SubscriptionCallBack<Kline>
  ): Subscription;
  subscribeAccountUpdate(
    address: string,
    onUpdate: SubscriptionCallBack<AccountUpdateEvent>
  ): Subscription;
}

export interface OrderbookOperationStrategy {
  placeOrder: (order: any) => Promise<any>;
  cancelOrder: (order: any) => Promise<any>;
  withdraw: (order: any) => Promise<any>;
}
export interface OrderbookService {
  query: OrderbookReadStrategy;
  operation: OrderbookOperationStrategy;
  subscriber: OrderbookSubscriptionStrategy;
}
