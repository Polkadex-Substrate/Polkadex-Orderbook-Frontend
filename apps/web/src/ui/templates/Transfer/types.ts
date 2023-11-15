import { Asset } from "@orderbook/core/utils/orderbookService";

export interface FilteredAssetProps extends Asset {
  free_balance?: string;
  onChainBalance?: string;
}

export type SwitchType = "deposit" | "withdraw" | "transfer";
