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

export type onGetExtensionWallet = {
  extensionName: string;
  saveInLocalStorage?: boolean;
};

export type ExtensionWalletContextProps = ExtensionWalletState & {
  onLinkEmail: (value: A.RegisterMainAccountLinkEmailFetch["payload"]) => void;
  onRegisterMainAccountReset: () => void;
  onRegisterMainAccountUpdate: (
    value: A.RegisterMainAccountUpdateEvent["payload"]
  ) => void;
  onRegisterMainAccount: (value: A.RegisterMainAccountFetch["payload"]) => void;
  onConnectExtensionWallet: (value: onGetExtensionWallet) => void;
  selectMainAccount: (value: string) => ExtensionAccount | undefined;
};

export interface ExtensionWalletProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type ExtensionWalletComponent = FC<
  PropsWithChildren<ExtensionWalletProps>
>;
