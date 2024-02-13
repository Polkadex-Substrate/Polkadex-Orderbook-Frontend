// Returns chain name for an asset ticker
import { de } from "date-fns/locale";

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
    default:
      return "Unknown";
  }
};
