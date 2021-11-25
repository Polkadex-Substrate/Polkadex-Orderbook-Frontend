import { CommonError } from "../../types";

import { WITHDRAWS_DATA, WITHDRAWS_FETCH, WITHDRAWS_ERROR } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";
export interface Withdraws {
  // we don't know the types yet
  widthdraws: any;
}
export interface WithdrawsFetch {
  type: typeof WITHDRAWS_FETCH;
  payload: { account: ProxyAccount };
}
export interface WithdrawsData {
  type: typeof WITHDRAWS_DATA;
  payload: Withdraws;
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

export const withdrawsData = (payload: Withdraws): WithdrawsData => ({
  type: WITHDRAWS_DATA,
  payload,
});

export const withdrawsError = (error: CommonError): WithdrawsError => ({
  type: WITHDRAWS_ERROR,
  error,
});
