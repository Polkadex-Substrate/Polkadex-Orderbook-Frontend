import { CommonError } from "@polkadex/orderbook/modules/types";
import { DEPOSITS_FETCH, DEPOSITS_DATA, DEPOSITS_ERROR, DEPOSITS_RESET } from "./constants";

export interface DepositsData {
  type: typeof DEPOSITS_DATA;
}
export interface DepositsFetch {
  type: typeof DEPOSITS_FETCH;
}

export interface DepositsError {
  type: typeof DEPOSITS_ERROR;
  error: CommonError;
}

export interface DepositsReset {
  type: typeof DEPOSITS_RESET;
}

export type DepositsAction = DepositsFetch | DepositsData | DepositsError | DepositsReset;

export const depositsFetch = (): DepositsFetch => ({
  type: DEPOSITS_FETCH,
});

export const depositsData = (): DepositsData => ({
  type: DEPOSITS_DATA,
});

export const depositsError = (error: CommonError): DepositsError => ({
  type: DEPOSITS_ERROR,
  error,
});

export const depositsReset = (): DepositsReset => ({
  type: DEPOSITS_RESET,
});
