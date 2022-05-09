import { Client } from "rpc-websockets";

import { CommonError } from "../../types";

import {
  ENCLAVE_RPC_CLIENT_CONNECTION_OPEN,
  ENCLAVE_RPC_CLIENT_DATA,
  ENCLAVE_RPC_CLIENT_ERROR,
  ENCLAVE_RPC_CLIENT_FETCH,
} from "./constants";

export interface EnclaveRpcClientFetch {
  type: typeof ENCLAVE_RPC_CLIENT_FETCH;
}

export interface EnclaveRpcClientError {
  type: typeof ENCLAVE_RPC_CLIENT_ERROR;
  error: string;
}

export interface EnclaveRpcClientData {
  type: typeof ENCLAVE_RPC_CLIENT_DATA;
}

export interface EnclaveRpcConnectionOpen {
  type: typeof ENCLAVE_RPC_CLIENT_CONNECTION_OPEN;
  payload: Client;
}

export type EnclaveRpcClientAction =
  | EnclaveRpcClientFetch
  | EnclaveRpcClientData
  | EnclaveRpcClientError
  | EnclaveRpcConnectionOpen;

export const enclaveRpcClientFetch = (): EnclaveRpcClientFetch => ({
  type: ENCLAVE_RPC_CLIENT_FETCH,
});

export const enclaveRpcClientData = (): EnclaveRpcClientData => ({
  type: ENCLAVE_RPC_CLIENT_DATA,
});

export const enclaveRpcClientError = (error: string): EnclaveRpcClientError => ({
  type: ENCLAVE_RPC_CLIENT_ERROR,
  error,
});

export const enclaveRpcConnectionOpen = (
  payload: EnclaveRpcConnectionOpen["payload"]
): EnclaveRpcConnectionOpen => ({
  type: ENCLAVE_RPC_CLIENT_CONNECTION_OPEN,
  payload,
});
