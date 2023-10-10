import { Maybe } from "@orderbook/core/helpers";

const PREFIX = "@orderbook";
export const QUERY_KEYS = {
  blockchainTransfers: (id: Maybe<string>) => [
    PREFIX,
    "blockchainTransfers",
    id,
  ],
  assets: () => [PREFIX, "assets"],
  markets: (assets: string) => [PREFIX, "markets", assets],
  recentTrades: (market: string) => [PREFIX, "recentTrades", market],
  orderBook: (market: string) => [PREFIX, "orderbook", market],
  miniGraph: (market: string) => [PREFIX, `mini-graph-${market}`],
  tradeHistory: (dateFrom: Date, dateTo: Date, tradeAddress: string) => [
    PREFIX,
    "tradeHistory",
    dateFrom,
    dateTo,
    tradeAddress,
  ],
  orderHistory: (dateFrom: Date, dateTo: Date, tradeAddress: string) => [
    PREFIX,
    "orderHistory",
    dateFrom,
    dateTo,
    tradeAddress,
  ],
  openOrders: (tradeAddress: string) => [PREFIX, "openOrders", tradeAddress],
};
