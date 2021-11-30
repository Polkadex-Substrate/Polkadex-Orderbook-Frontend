import { ApiPromise } from "@polkadot/api";

import {
  RANGER_CONNECT_DATA,
  RANGER_CONNECT_ERROR,
  RANGER_CONNECT_FETCH,
  RANGER_DISCONNECT_DATA,
  RANGER_DISCONNECT_FETCH,
} from "./constants";

export interface RangerConnectFetch {
  type: typeof RANGER_CONNECT_FETCH;
}

export interface RangerConnectData {
  type: typeof RANGER_CONNECT_DATA;
  payload?: ApiPromise;
}

export interface RangerDisconnectFetch {
  type: typeof RANGER_DISCONNECT_FETCH;
}

export interface RangerDisconnectData {
  type: typeof RANGER_DISCONNECT_DATA;
}

export interface RangerConnectError {
  type: typeof RANGER_CONNECT_ERROR;
  payload?: {
    code: number;
    message: string[];
  };
}

export type RangerAction =
  | RangerConnectFetch
  | RangerConnectData
  | RangerConnectError
  | RangerDisconnectData;

export type RangerErrorType = typeof RANGER_CONNECT_ERROR;

export const rangerConnectFetch = (): RangerConnectFetch => ({
  type: RANGER_CONNECT_FETCH,
});

export const rangerConnectData = (payload: ApiPromise): RangerConnectData => ({
  type: RANGER_CONNECT_DATA,
  payload,
});

export const rangerConnectError = (): RangerConnectError => ({
  type: RANGER_CONNECT_ERROR,
});

export const rangerDisconnectData = (): RangerDisconnectData => ({
  type: RANGER_DISCONNECT_DATA,
});

export const rangerDisconnectFetch = (): RangerDisconnectFetch => ({
  type: RANGER_DISCONNECT_FETCH,
});
