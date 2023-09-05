export const QUERY_KEY_PREFIX = "@orderbook";

export const QUERY_KEYS = {
  tradingBalances: (accountId: string) => ["tradingBalances", accountId?.toString()],
  onChainBalances: (accountId: string, ids: string[]) => [
    "onChainBalances",
    accountId.toString(),
    ...ids,
  ],
  onChainBalance: (accountId: string, assetId: string) => [
    QUERY_KEY_PREFIX,
    accountId.toString(),
    assetId.toString(),
  ],
  assets: () => [QUERY_KEY_PREFIX, "assets"],
};
