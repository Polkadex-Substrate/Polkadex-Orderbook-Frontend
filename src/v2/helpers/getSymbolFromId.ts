import { Market } from "@polkadex/orderbook-modules";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

/**
 * @description Get symbol from asset id
 */
export const getSymbolFromId = (
  value: "base" | "quote",
  marketArray: Market["symbolArray"]
): string =>
  marketArray && getSymbolFromAssetId(marketArray[value === "base" ? 0 : 1]).toUpperCase();
