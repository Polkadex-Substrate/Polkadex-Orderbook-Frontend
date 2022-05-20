import { CommonError } from "../../types";

import {
  BALANCES_DATA,
  BALANCES_ERROR,
  BALANCES_FETCH,
  BALANCE_CHANNEL_FETCH,
} from "./constants";

export interface BalanceBase {
  asset_type: string;
  reserved_balance: string;
  free_balance: string;
}
export interface Balance extends BalanceBase {
  name: string;
  symbol: string;
}
export type FreeOrUsedOrTotal = Record<string, number>;

export type BalanceMessage = {
  asset_a: string;
  amount_a: number;
  asset_b: string;
  amount_b: number;
};
export interface BalancesFetch {
  type: typeof BALANCES_FETCH;
}

export interface BalancesError {
  type: typeof BALANCES_ERROR;
  error: CommonError;
}

export interface BalancesData {
  type: typeof BALANCES_DATA;
  payload: { timestamp: number; balances: Balance[] };
}
export interface BalanceChannelFetch {
  type: typeof BALANCE_CHANNEL_FETCH;
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

export const balanceChannelFetch = (): BalanceChannelFetch => ({
  type: BALANCE_CHANNEL_FETCH,
});
