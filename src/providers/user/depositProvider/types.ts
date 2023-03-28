import { CommonError, ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { FC, PropsWithChildren } from "react";

export interface DepositsState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
}

export interface onFetchDeposit {
  asset: Record<string, string | null>;
  amount: string | number;
  mainAccount: ExtensionAccount;
}

export type DepositContextProps = DepositsState & {
  onfetchDeposit: (value: onFetchDeposit) => void;
  depositsLoading: () => boolean;
};

export type DepositProviderProps = PropsWithChildren<{
  value: DepositContextProps;
}>;

export interface DepositsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type DepositsComponent = FC<PropsWithChildren<DepositsProps>>;
