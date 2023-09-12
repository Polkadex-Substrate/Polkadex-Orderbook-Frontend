import { FC, PropsWithChildren } from "react";

import { TradeAccount } from "../../types";

import * as A from "./actions";

import { IUserTradeAccount } from "@/hooks";

export interface TradeWalletState {
  isFetching: boolean;
  allBrowserAccounts: TradeAccount[];
  registerAccountLoading: boolean;
  registerAccountSuccess: boolean;
  removesInLoading: Array<string>;
  registerAccountModal: RegisterTradeAccount;
  importAccountSuccess: boolean;
  previewAccountModal: PreviewAccountModal;
  exportAccountLoading: boolean;
}

export type RegisterTradeAccount = {
  isActive?: boolean;
  selectedAddress?: {
    name?: string;
    address: string;
  };
  defaultImportActive?: boolean;
  mnemonic?: string;
  account?: {
    name?: string;
    address: string;
  };
};

export type OnRegisterTradeAccountData = {
  mnemonic?: string;
  account: {
    name: string;
    address: string;
  };
};

export type PreviewAccountModal = {
  isActive?: boolean;
  selected?: IUserTradeAccount;
};

export type TradeWalletProviderProps = PropsWithChildren<{
  value: TradeWalletContextProps;
}>;

export type TradeWalletContextProps = TradeWalletState & {
  onExportTradeAccount: (value: A.ExportTradeAccountFetch["payload"]) => void;
  onImportTradeAccountJson: (
    value: A.ImportTradeAccountJsonFetch["payload"],
  ) => void;
  onImportTradeAccount: (value: A.ImportTradeAccountFetch["payload"]) => void;
  onLoadTradeAccounts: () => void;
  onTradeAccountUpdate: (value: A.TradeAccountUpdate["payload"]) => void;
  onRegisterTradeAccount: (
    value: A.RegisterTradeAccountFetch["payload"],
  ) => void;
  onRemoveProxyAccountFromChain: (
    value: A.RemoveProxyAccountFromChainFetch["payload"],
  ) => void;
  onRegisterTradeAccountReset: () => void;
  onRegisterTradeAccountData: (value: OnRegisterTradeAccountData) => void;
  onRemoveTradeAccountFromBrowser: (value: string) => void;
  onUnlockTradeAccount: (value: A.UnlockTradeAccount["payload"]) => void;
  onTradeAccountPush: (value: A.TradeAccountPush["payload"]) => void;
  onRegisterAccountModalActive: (
    value?: A.RegisterTradeAccountModalActive["payload"],
  ) => void;
  onRegisterAccountModalCancel: () => void;
  onPreviewAccountModalActive: (
    value?: A.PreviewTradeAccountModalActive["payload"],
  ) => void;
  onPreviewAccountModalCancel: () => void;
  onExportTradeAccountActive: () => void;
};

export interface TradeWalletProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TradeWalletComponent = FC<PropsWithChildren<TradeWalletProps>>;
