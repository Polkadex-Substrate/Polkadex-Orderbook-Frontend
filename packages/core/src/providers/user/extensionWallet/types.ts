import { FC, PropsWithChildren } from "react";

import { ExtensionAccount } from "../../types";

import * as A from "./actions";

export type LinkEmailData = { email: string; main_address: string };
export type RegisterEmailData = { email: string; main_address: string };

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

export type ExtensionWalletContextProps = ExtensionWalletState & {
  onRegisterMainAccountReset: () => void;
  onRegisterMainAccountUpdate: (
    value: A.RegisterMainAccountUpdateEvent["payload"]
  ) => void;
  onRegisterMainAccount: (value: A.RegisterMainAccountFetch["payload"]) => void;
  onPolkadotExtensionWallet: () => void;
  selectMainAccount: (value: string) => ExtensionAccount | undefined;
};

export interface ExtensionWalletProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type ExtensionWalletComponent = FC<
  PropsWithChildren<ExtensionWalletProps>
>;
