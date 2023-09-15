import { defaultConfig } from "@orderbook/core/config";

export function filterBlockedAssets<T extends { assetId: string }>(
  list: T[],
): T[] {
  return list.filter(
    (item) =>
      !defaultConfig.blockedAssets?.some((value) => item.assetId === value),
  );
}
