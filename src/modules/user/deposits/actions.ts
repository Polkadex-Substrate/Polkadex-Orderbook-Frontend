import { DEPOSITS_FETCH, DEPOSITS_DATA, DEPOSITS_ERROR } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";
export interface Deposits {
  // we don't know the types yet
  deposit: any;
}
export interface DepositsFetch {
  type: typeof DEPOSITS_FETCH;
  payload: { account: ProxyAccount };
}

export interface DepositsData {
  type: typeof DEPOSITS_DATA;
  payload: Deposits;
}

export interface DepositsError {
  type: typeof DEPOSITS_ERROR;
  error: string;
}

export type DepositsAction = DepositsFetch | DepositsData | DepositsError;

export const depositsFetch = (payload: DepositsFetch["payload"]): DepositsFetch => ({
  type: DEPOSITS_FETCH,
  payload,
});

export const depositsData = (payload: Deposits): DepositsData => ({
  type: DEPOSITS_DATA,
  payload,
});

export const depositsError = (error): DepositsError => ({
  type: DEPOSITS_ERROR,
  error,
});
