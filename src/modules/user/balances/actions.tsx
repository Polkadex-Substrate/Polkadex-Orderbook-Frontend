import { CommonError } from "../../types";

import {
  BALANCES_CHANNEL_UPDATE_DATA,
  BALANCES_DATA,
  BALANCES_ERROR,
  BALANCES_FETCH,
  BALANCE_CHANNEL_FETCH,
} from "./constants";

export interface BalanceBase {
  assetId: string;
  reserved_balance: string;
  free_balance: string;
}
export interface Balance extends BalanceBase {
  name: string;
  symbol: string;
}
export type FreeOrUsedOrTotal = Record<string, number>;

export type BalanceMessage = {
  trading_pair: string;
  update: {
    BalanceUpdate?: {
      user: string;
      base_free: string;
      base_reserved: string;
      quote_free: string;
      quote_reserved: string;
    };
  };
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

export interface BalanceChannelUpdateData {
  type: typeof BALANCES_CHANNEL_UPDATE_DATA;
  payload: Balance[];
}
export type BalancesAction =
  | BalancesFetch
  | BalancesData
  | BalancesError
  | BalanceChannelUpdateData;

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

export const balanceChannelUpdateData = (
  payload: BalanceChannelUpdateData["payload"]
): BalanceChannelUpdateData => ({
  type: BALANCES_CHANNEL_UPDATE_DATA,
  payload,
});
