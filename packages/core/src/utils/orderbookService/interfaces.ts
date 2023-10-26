import {
  Asset,
  Balance,
  Kline,
  MarketConfig,
  MarketHistoryProps,
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
} from "./types";

export interface OrderbookReadStrategy {
  getOrderbook: (market: string) => Promise<Orderbook>;
  getMarkets: () => Promise<Market[]>;
  getTickers: () => Promise<Ticker[]>;
  getAssets: () => Promise<Asset[]>;
  getMarketsConfig: () => Promise<MarketConfig[]>;
  getOpenOrders: (args: UserHistoryProps) => Promise<Order[]>;
  getOrderHistory: (args: UserHistoryProps) => Promise<Order[]>;
  getTradeHistory: (args: UserHistoryProps) => Promise<Trade[]>;
  getTrades: (args: UserHistoryProps) => Promise<PublicTrade[]>;
  getBalance: () => Promise<Balance[]>;
  getTradingAddresses: (fundingAddress: string) => Promise<string[]>;
  getFundingAddress: (tradeAddress: string) => Promise<string>;
  getCandles: (args: MarketHistoryProps) => Promise<Kline[]>;
  getTransactions: (args: UserHistoryProps) => Promise<Transaction[]>;
}

export interface OrderbookSubscriptionStrategy {
  getOrderbookSubscriber(market: string): Subscription<PriceLevel[]>;
  getBalancesSubscriber(address: string): Subscription<Balance>;
  getTradesSubscriber(market: string): Subscription<Trade[]>;
  getOrdersSubscriber(address: string): Subscription<Order>;
  getTransactionSubscriber(address: string): Subscription<Transaction>;
  getKlineSubscriber(market: string): Subscription<Kline>;
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
