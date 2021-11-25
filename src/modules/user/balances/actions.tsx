import { CommonError } from "../../types";
import { ProxyAccount } from "../profile";

import { BALANCES_DATA, BALANCES_ERROR, BALANCES_FETCH } from "./constants";

export interface UserBalance {
  timestamp: number;
  free: FreeOrUsedOrTotal;
  used: FreeOrUsedOrTotal;
  total: FreeOrUsedOrTotal;
}
export type FreeOrUsedOrTotal = Record<string, number>;

export interface BalancesFetch {
  type: typeof BALANCES_FETCH;
  payload: { account: ProxyAccount };
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

export const balancesFetch = (payload: BalancesFetch["payload"]): BalancesFetch => ({
  type: BALANCES_FETCH,
  payload,
});

export const balancesData = (payload: BalancesData["payload"]): BalancesData => ({
  type: BALANCES_DATA,
  payload,
});

export const balancesError = (error: CommonError): BalancesError => ({
  type: BALANCES_ERROR,
  error,
});
