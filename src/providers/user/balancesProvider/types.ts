import { FC, PropsWithChildren } from "react";

import { CommonError } from "../../types";

export type BalanceQueryResult = {
  a: string;
  f: string;
  r: string;
  p: string;
};

export type IBalanceFromDb = {
  asset_type: string;
  reserved_balance: string;
  free_balance: string;
  pending_withdrawal: string;
};

export interface BalanceBase {
  assetId: string;
  reserved_balance: string;
  free_balance: string;
}

export interface Balance extends BalanceBase {
  name: string;
  symbol: string;
  onChainBalance: string;
}
export type FreeOrUsedOrTotal = Record<string, number>;

export type BalanceUpdatePayload = {
  stid: number;
  asset: { asset: string } & string;
  free: string;
  user: string;
  pending_withdrawal: string;
  reserved: string;
};

export interface BalancesState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
  balances: Balance[];
  timestamp?: number;
}

export type BalancesContextProps = BalancesState & {
  getFreeProxyBalance: (value: string) => string;
  onBalanceUpdate: (value: BalanceUpdatePayload) => void;
  onBalancesFetch: () => void;
};

export type BalancesProviderProps = PropsWithChildren<{
  value: BalancesContextProps;
}>;

export interface BalancesProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type BalancesComponent = FC<PropsWithChildren<BalancesProps>>;
