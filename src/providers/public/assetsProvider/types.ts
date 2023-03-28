import { CommonError } from "@polkadex/orderbook/modules/types";
import { FC, PropsWithChildren } from "react";

export type IPublicAsset = {
  assetId: string;
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

export interface AssetsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type AssetsComponent = FC<PropsWithChildren<AssetsProps>>;
