import { CommonError, ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { PropsWithChildren } from "react";

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
};

export type DepositProviderProps = PropsWithChildren<{
  value: DepositContextProps;
}>;
