import { CommonError } from "../../types";

import {
  BALANCES_DATA,
  BALANCES_ERROR,
  BALANCES_FETCH,
  BALANCES_UPDATE_EVENT,
  BALANCES_UPDATE_EVENT_DATA,
} from "./constants";

export interface BalanceBase {
  asset_id: string;
  reserved_balance: string;
  free_balance: string;
}
export interface Balance extends BalanceBase {
  name: string;
  symbol: string;
}
export type FreeOrUsedOrTotal = Record<string, number>;

export type BalanceUpdatePayload = {
  stid: number;
  asset: { asset: string };
  free: string;
  user: string;
  pending_withdrawal: string;
  reserved: string;
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

export interface BalancesUpdateEvent {
  type: typeof BALANCES_UPDATE_EVENT;
  payload: BalanceUpdatePayload;
}
export interface BalanceUpdateEventData {
  type: typeof BALANCES_UPDATE_EVENT_DATA;
  payload: Balance;
}
export type BalancesAction =
  | BalancesFetch
  | BalancesData
  | BalancesError
  | BalanceUpdateEventData;

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

export const balanceUpdateEvent = (
  payload: BalancesUpdateEvent["payload"]
): BalancesUpdateEvent => ({
  type: BALANCES_UPDATE_EVENT,
  payload,
});

export const balanceUpdateEventData = (
  payload: BalanceUpdateEventData["payload"]
): BalanceUpdateEventData => ({
  type: BALANCES_UPDATE_EVENT_DATA,
  payload,
});
