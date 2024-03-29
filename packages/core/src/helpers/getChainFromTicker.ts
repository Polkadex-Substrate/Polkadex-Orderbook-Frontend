// Returns chain name for an asset ticker
export const getChainFromTicker = (ticker: string): string => {
  // Should update it whenever any new asset is added to orderbook
  switch (ticker) {
    case "USDT":
      return "Asset Hub";
    case "ASTR":
      return "Astar Network";
    case "DOT":
      return "Polkadot";
    case "IBTC":
      return "Interlay";
    case "PHA":
      return "Phala Network";
    case "GLMR":
      return "Moonbeam Network";
    case "PDEX":
      return "Polkadex";
    case "DED":
      return "Asset Hub";
    case "UNQ":
      return "Unique Network";
    case "USDC":
      return "Asset Hub";
    case "PINK":
      return "Asset Hub";
    default:
      return "Unknown";
  }
};
