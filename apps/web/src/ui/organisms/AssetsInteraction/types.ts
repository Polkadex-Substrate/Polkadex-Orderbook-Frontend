import { IPublicAsset } from "@orderbook/core/providers/public/assetsProvider";

export interface AssetsProps extends IPublicAsset {
  free_balance: string;
  onChainBalance: string;
  reserved_balance: string;
}
