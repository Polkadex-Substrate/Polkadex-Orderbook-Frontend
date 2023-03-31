import { FC, PropsWithChildren } from "react";
import { ExtensionAccount } from "@polkadex/orderbook/providers/types";

export interface ExtensionWalletState {
  success?: boolean;
  isFetching: boolean;
  allAccounts: ExtensionAccount[];
  registerMainAccountLoading: boolean;
  registerMainAccountSuccess: boolean;
}

export type ExtensionWalletProviderProps = PropsWithChildren<{
  value: ExtensionWalletContextProps;
}>;

export type ExtensionWalletContextProps = ExtensionWalletState & {};

export interface ExtensionWalletProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type ExtensionWalletComponent = FC<PropsWithChildren<ExtensionWalletProps>>;
