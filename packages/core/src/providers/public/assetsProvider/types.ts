import { FC, PropsWithChildren } from "react";

export type IPublicAsset = {
  assetId: string;
  name: string;
  symbol: string;
};

export interface AssetsState {
  list: IPublicAsset[];
  loading: boolean;
  success: boolean;
}

export type AssetsContextProps = AssetsState & {
  selectGetAsset: (
    assetId: string | number | Record<string, string>
  ) => IPublicAsset | undefined;
};

export type AssetsProviderProps = PropsWithChildren<{
  value: AssetsContextProps;
}>;

export interface AssetsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type AssetsComponent = FC<PropsWithChildren<AssetsProps>>;
