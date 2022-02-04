import { marketIdMap } from "@polkadex/web-constants";

export const getSymbolFromAssetId = (assetId: number): string => {
  if (assetId >= 0) {
    return marketIdMap[assetId].symbol;
  }
  return "";
};

export const getNameFromAssetId = (assetId: number): string => {
  if (assetId >= 0) {
    return marketIdMap[assetId].name;
  }
  return "";
};
