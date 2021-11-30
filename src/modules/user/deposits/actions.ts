import { CommonError } from "../../types";

import { DEPOSITS_FETCH, DEPOSITS_DATA, DEPOSITS_ERROR } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";
export interface Deposits {
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

export interface DepositsFetch {
  type: typeof DEPOSITS_FETCH;
  payload: { account: ProxyAccount };
}

export interface DepositsData {
  type: typeof DEPOSITS_DATA;
  payload: Deposits[];
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

export const depositsData = (payload: Deposits[]): DepositsData => ({
  type: DEPOSITS_DATA,
  payload,
});

export const depositsError = (error: CommonError): DepositsError => ({
  type: DEPOSITS_ERROR,
  error,
});
