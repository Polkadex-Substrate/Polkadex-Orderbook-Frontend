import { Maybe } from "@orderbook/core/helpers";

const PREFIX = "@orderbook";
export const QUERY_KEYS = {
  blockchainTransfers: (id: Maybe<string>, PER_PAGE_LIMIT: number) => [
    PREFIX,
    "blockchainTransfers",
    id,
    PER_PAGE_LIMIT,
  ],
  assets: () => [PREFIX, "assets"],
  markets: () => [PREFIX, "markets"],
  tickers: () => [PREFIX, "tickers"],
  recentTrades: (market: string) => [PREFIX, "recentTrades", market],
  orderBook: (market: string) => [PREFIX, "orderbook", market],
  miniGraph: (market: string) => [PREFIX, `mini-graph-${market}`],
  tradeHistory: (
    dateFrom: Date,
    dateTo: Date,
    address: string,
    rowsPerPage: number,
    basedOnFundingAccount?: boolean
  ) => [
    PREFIX,
    "tradeHistory",
    dateFrom,
    dateTo,
    address,
    rowsPerPage,
    String(basedOnFundingAccount),
  ],
  orderHistory: (
    dateFrom: Date,
    dateTo: Date,
    address: string,
    rowsPerPage: number,
    basedOnFundingAccount?: boolean
  ) => [
    PREFIX,
    "orderHistory",
    dateFrom,
    dateTo,
    address,
    rowsPerPage,
    String(basedOnFundingAccount),
  ],
  openOrders: (address: string, basedOnFundingAccount?: boolean) => [
    PREFIX,
    "openOrders",
    address,
    String(basedOnFundingAccount),
  ],
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
  proxyAccounts: (mainAddresses: string[]) => [
    PREFIX,
    "proxyAccounts",
    ...mainAddresses,
  ],
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
  transactionFees: (address: string, extrinsicName: string) => [
    PREFIX,
    "transactionFees",
    address,
    extrinsicName,
  ],
  epochs: () => [PREFIX, "epochs"],
  lmpMarkets: (epoch: number) => [PREFIX, "lmpMarkets", epoch],
  lmpLeaderboard: (market: string) => [PREFIX, "lmpLeaderboard", market],
  lmpRewards: (market: string, mainAddress: string) => [
    PREFIX,
    "lmpRewards",
    market,
    mainAddress,
  ],
  traderMetrics: (market: string, mainAddress: string) => [
    PREFIX,
    "traderMetrics",
    market,
    mainAddress,
  ],
  poolReserves: (swapConnection: boolean, assetsLength: number) => [
    PREFIX,
    "poolReserves",
    swapConnection,
    assetsLength,
  ],
  quotePrice: (assetName: string, assetsAmount: number) => [
    PREFIX,
    "quotePrice",
    assetName,
    assetsAmount,
  ],
  queryPools: () => [PREFIX, "queryPools"],
  googleSession: () => [PREFIX, "googleSession"],
  googleAccounts: () => [PREFIX, "googleAccounts"],
};
