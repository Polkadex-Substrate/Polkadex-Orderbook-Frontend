// Returns chain name for an asset ticker
export const getChainFromTicker = (ticker: string) => {
  // Should update it whenever any new asset is added to orderbook
  const chains = {
    USDT: "Asset Hub",
    ASTR: "Astar Network",
    DOT: "Polkadot",
  };

  return chains[ticker];
};
