import { CommonError } from "../../types";

import { DEPOSITS_FETCH, DEPOSITS_DATA, DEPOSITS_ERROR } from "./constants";

export interface DepositsData {
  type: typeof DEPOSITS_DATA;
}
export interface DepositsFetch {
  type: typeof DEPOSITS_FETCH;
  payload: {
    asset: Record<string, string | null>;
    amount: string | number;
  };
}

export interface DepositsError {
  type: typeof DEPOSITS_ERROR;
  error: CommonError;
}

export type DepositsAction = DepositsFetch | DepositsData | DepositsError;

export const depositsFetch = (payload: DepositsFetch["payload"]): DepositsFetch => ({
  type: DEPOSITS_FETCH,
  payload,
});

export const depositsData = (): DepositsData => ({
  type: DEPOSITS_DATA,
});

export const depositsError = (error: CommonError): DepositsError => ({
  type: DEPOSITS_ERROR,
  error,
});
