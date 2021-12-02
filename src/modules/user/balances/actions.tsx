import { CommonError } from "../../types";

import { BALANCES_DATA, BALANCES_ERROR, BALANCES_FETCH } from "./constants";

export type Balance = {
  ticker: string;
  free: string | number;
  used: string | number;
  total: string | number;
};
export interface UserBalance {
  timestamp: number;
  userBalance: Balance[];
}
export type FreeOrUsedOrTotal = Record<string, number>;

export interface BalancesFetch {
  type: typeof BALANCES_FETCH;
}

export interface BalancesError {
  type: typeof BALANCES_ERROR;
  error: CommonError;
}

export interface BalancesData {
  type: typeof BALANCES_DATA;
  payload: UserBalance;
}

export type BalancesAction = BalancesFetch | BalancesData | BalancesError;

export const balancesFetch = (): BalancesFetch => ({
  type: BALANCES_FETCH,
});

export const balancesData = (payload: BalancesData["payload"]): BalancesData => ({
  type: BALANCES_DATA,
  payload,
});

export const balancesError = (error: CommonError): BalancesError => ({
  type: BALANCES_ERROR,
  error,
});
