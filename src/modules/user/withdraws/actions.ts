import { CommonError } from "../../types";

import { WITHDRAWS_DATA, WITHDRAWS_FETCH, WITHDRAWS_ERROR } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";
export interface UserWithdraws {
  id: string;
  timestamp: number;
  currency: string;
  amount: number;
  from: string;
  to: string;
  fee: Fee;
}
export interface Fee {
  currency: string;
  cost: number;
}

export interface WithdrawsFetch {
  type: typeof WITHDRAWS_FETCH;
  payload: { account: ProxyAccount };
}
export interface WithdrawsData {
  type: typeof WITHDRAWS_DATA;
  payload: UserWithdraws[];
}
export interface WithdrawsError {
  type: typeof WITHDRAWS_ERROR;
  error: CommonError;
}

export type WithdrawsAction = WithdrawsFetch | WithdrawsData | WithdrawsError;

export const withdrawsFetch = (payload: WithdrawsFetch["payload"]): WithdrawsFetch => ({
  type: WITHDRAWS_FETCH,
  payload,
});

export const withdrawsData = (payload: UserWithdraws[]): WithdrawsData => ({
  type: WITHDRAWS_DATA,
  payload,
});

export const withdrawsError = (error: CommonError): WithdrawsError => ({
  type: WITHDRAWS_ERROR,
  error,
});
