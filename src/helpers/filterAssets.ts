import { defaultConfig } from "@polkadex/orderbook-config";

export const filterAssets = (list) => {
  return list.filter(
    (item) => !defaultConfig.blockedAssets?.some((value) => item.assetId === value)
  );
};
