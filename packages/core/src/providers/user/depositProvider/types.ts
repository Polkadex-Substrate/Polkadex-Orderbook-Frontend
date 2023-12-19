import { FC, PropsWithChildren } from "react";
import { ApiPromise } from "@polkadot/api";
import { ExtensionAccount } from "@polkadex/react-providers";

import { CommonError } from "../../types";
// todo: replace when providers are ready

export interface DepositsState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
}

export interface onFetchDeposit {
  amount: string | number;
  asset: Record<string, string | null>;
  account: ExtensionAccount;
}
export interface DepositToEnclave extends onFetchDeposit {
  api: ApiPromise;
}

export type DepositContextProps = DepositsState & {
  onFetchDeposit: (value: onFetchDeposit) => Promise<void>;
};

export type DepositProviderProps = PropsWithChildren<{
  value: DepositContextProps;
}>;

export interface DepositsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type DepositsComponent = FC<PropsWithChildren<DepositsProps>>;
