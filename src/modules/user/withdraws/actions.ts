import { CommonError } from "../../types";

import { WITHDRAWS_DATA, WITHDRAWS_FETCH, WITHDRAWS_ERROR } from "./constants";

interface Fee {
  currency: string;
  cost: number;
}

export interface WithdrawsFetch {
  type: typeof WITHDRAWS_FETCH;
  payload: {
    asset: Record<string, string | null>;
    amount: string | number;
  };
}
export interface WithdrawsData {
  type: typeof WITHDRAWS_DATA;
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

export const withdrawsData = (): WithdrawsData => ({
  type: WITHDRAWS_DATA,
});

export const withdrawsError = (error: CommonError): WithdrawsError => ({
  type: WITHDRAWS_ERROR,
  error,
});
