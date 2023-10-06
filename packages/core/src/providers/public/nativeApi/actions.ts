import { ApiPromise } from "@polkadot/api";

import {
  NATIVEAPI_CONNECT_DATA,
  NATIVEAPI_CONNECT_ERROR,
  NATIVEAPI_CONNECT_FETCH,
  NATIVEAPI_DISCONNECT_DATA,
  NATIVEAPI_DISCONNECT_FETCH,
} from "./constants";

export interface NativeApiConnectFetch {
  type: typeof NATIVEAPI_CONNECT_FETCH;
}

export interface NativeApiConnectData {
  type: typeof NATIVEAPI_CONNECT_DATA;
  payload?: ApiPromise;
}

export interface NativeApiDisconnectFetch {
  type: typeof NATIVEAPI_DISCONNECT_FETCH;
}

export interface NativeApiDisconnectData {
  type: typeof NATIVEAPI_DISCONNECT_DATA;
}

export interface NativeApiConnectError {
  type: typeof NATIVEAPI_CONNECT_ERROR;
  payload?: {
    code: number;
    message: string[];
  };
}

export type NativeApiAction =
  | NativeApiConnectFetch
  | NativeApiConnectData
  | NativeApiConnectError
  | NativeApiDisconnectData;

export type NativeApiErrorType = typeof NATIVEAPI_CONNECT_ERROR;

export const nativeApiConnectFetch = (): NativeApiConnectFetch => ({
  type: NATIVEAPI_CONNECT_FETCH,
});

export const nativeApiConnectData = (
  payload: ApiPromise,
): NativeApiConnectData => ({
  type: NATIVEAPI_CONNECT_DATA,
  payload,
});

export const nativeApiConnectError = (): NativeApiConnectError => ({
  type: NATIVEAPI_CONNECT_ERROR,
});

export const nativeApiDisconnectData = (): NativeApiDisconnectData => ({
  type: NATIVEAPI_DISCONNECT_DATA,
});

export const nativeApiDisconnectFetch = (): NativeApiDisconnectFetch => ({
  type: NATIVEAPI_DISCONNECT_FETCH,
});
