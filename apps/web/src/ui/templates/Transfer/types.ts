import { IPublicAsset } from "@orderbook/core/providers/public/assetsProvider";

export interface FilteredAssetProps extends IPublicAsset {
  free_balance?: string;
  onChainBalance?: string;
}
