import * as T from "./types";
import {
  // BALANCES_DATA,
  // BALANCES_ERROR,
  // BALANCES_FETCH,
  BALANCES_UPDATE_EVENT,
  BALANCES_UPDATE_EVENT_DATA,
  CHAIN_BALANCE_UPDATE,
} from "./constants";
import { BalanceUpdatePayload } from "./types";

// export interface BalancesFetch {
//   type: typeof BALANCES_FETCH;
// }

// export interface BalancesError {
//   type: typeof BALANCES_ERROR;
//   error: CommonError;
// }

// export interface BalancesData {
//   type: typeof BALANCES_DATA;
//   payload: { timestamp: number; balances: Balance[] };
// }

export interface BalancesUpdateEvent {
  type: typeof BALANCES_UPDATE_EVENT;
  payload: BalanceUpdatePayload;
}
export interface BalanceUpdateEventData {
  type: typeof BALANCES_UPDATE_EVENT_DATA;
  payload: T.Balance;
}

export interface ChainBalanceUpdateEventData {
  type: typeof CHAIN_BALANCE_UPDATE;
  payload: { assetId: string; onChainBalance: string };
}

export type BalancesAction =
  // | BalancesFetch
  // | BalancesData
  // | BalancesError
  BalancesUpdateEvent | BalanceUpdateEventData | ChainBalanceUpdateEventData;

// export const balancesFetch = (): BalancesFetch => ({
//   type: BALANCES_FETCH,
// });

// export const balancesData = (
//   payload: BalancesData["payload"]
// ): BalancesData => ({
//   type: BALANCES_DATA,
//   payload,
// });

// export const balancesError = (error: CommonError): BalancesError => ({
//   type: BALANCES_ERROR,
//   error,
// });

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

export const onChangeChainBalance = (
  payload: ChainBalanceUpdateEventData["payload"]
): ChainBalanceUpdateEventData => ({
  type: CHAIN_BALANCE_UPDATE,
  payload,
});
