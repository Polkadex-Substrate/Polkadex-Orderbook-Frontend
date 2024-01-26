import { Maybe } from "@orderbook/core/helpers";

const PREFIX = "@orderbook";
export const QUERY_KEYS = {
  blockchainTransfers: (id: Maybe<string>) => [
    PREFIX,
    "blockchainTransfers",
    id,
  ],
  assets: () => [PREFIX, "assets"],
  markets: () => [PREFIX, "markets"],
  tickers: () => [PREFIX, "tickers"],
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
  tradingBalances: (mainAddress: string) => [
    PREFIX,
    "tradingBalances",
    mainAddress,
  ],
  onChainBalances: (accountId: string) => [
    PREFIX,
    "onChainBalances",
    accountId,
  ],
  transactions: (mainAddress: string, tx_type: string) => [
    PREFIX,
    "transactions",
    mainAddress,
    tx_type,
  ],
  proxyAccounts: (extensions) => [PREFIX, "proxyAccounts", extensions],
  singleProxyAccounts: (mainAddress: string) => [
    PREFIX,
    "proxyAccount",
    mainAddress,
  ],
  extensionAccountFromBrowserAccount: (address: string) => [
    PREFIX,
    "extensionAccountFromBrowserAccount",
    address,
  ],
  transactionFee: (mainAddress: string) => [
    PREFIX,
    "transactionFee",
    mainAddress,
  ],
};
