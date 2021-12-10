import { CommonError } from "../../types";

import { WITHDRAWS_DATA, WITHDRAWS_FETCH, WITHDRAWS_ERROR } from "./constants";

export interface UserWithdraws {
  id: string;
  timestamp: number;
  currency: string;
  amount: number;
  from: string;
  to: string;
  fee: Fee;
}
interface Fee {
  currency: string;
  cost: number;
}

export interface WithdrawsFetch {
  type: typeof WITHDRAWS_FETCH;
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

export const withdrawsFetch = (): WithdrawsFetch => ({
  type: WITHDRAWS_FETCH,
});

export const withdrawsData = (payload: UserWithdraws[]): WithdrawsData => ({
  type: WITHDRAWS_DATA,
  payload,
});

export const withdrawsError = (error: CommonError): WithdrawsError => ({
  type: WITHDRAWS_ERROR,
  error,
});
