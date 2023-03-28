import { FC, PropsWithChildren } from "react";
import { CommonActionState, TradeAccount } from "../../types";
import { IUserTradeAccount } from "@polkadex/orderbook/hooks/types";

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
    name: string;
    address: string;
  };
  defaultImportActive?: boolean;
  mnemonic?: string;
  account?: {
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

export type TradeWalletContextProps = TradeWalletState & {};

export interface TradeWalletProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TradeWalletComponent = FC<PropsWithChildren<TradeWalletProps>>;
