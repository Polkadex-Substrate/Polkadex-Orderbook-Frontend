import { defaultConfig } from "@orderbook/core/config";

export function filterBlockedAssets<T extends { id: string }>(list: T[]): T[] {
  return list.filter(
    (item) => !defaultConfig.blockedAssets?.some((value) => item.id === value)
  );
}
