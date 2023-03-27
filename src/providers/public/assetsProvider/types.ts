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
  loading: boolean;
  success: boolean;
}

export type AssetsContextProps = AssetsState & {
  fetchAssets: () => void;
  selectAssetsFetchSuccess: () => boolean;
  selectAllAssets: () => IPublicAsset[];
  selectGetAsset: (assetId: string | number | Record<string, string>) => IPublicAsset;
};

export type AssetsProviderProps = PropsWithChildren<{
  value: AssetsContextProps;
}>;
