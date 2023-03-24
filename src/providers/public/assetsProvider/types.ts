import { CommonError } from "@polkadex/orderbook/modules/types";
import { PropsWithChildren } from "react";

export type IPublicAsset = {
  asset_id: string;
  name: string;
  symbol: string;
};

export interface AssetsState {
  error?: CommonError;
  list: IPublicAsset[];
  assetIdMap: Record<string, IPublicAsset>;
  loading: boolean;
  success: boolean;
}

export type AssetsContextProps = AssetsState & {
  fetchAssets: () => void;
};

export type AssetsProviderProps = PropsWithChildren<{
  value: AssetsContextProps;
}>;
