import { IPublicAsset } from "@orderbook/core/providers/public/assetsProvider";

export interface FilteredAssetProps extends IPublicAsset {
  onChainBalance?: string;
}
