import { Client } from "rpc-websockets";

import { CommonError } from "../../types";

import { EnclaveRpcClientAction } from "./actions";
import {
  ENCLAVE_RPC_CLIENT_CONNECTION_OPEN,
  ENCLAVE_RPC_CLIENT_DATA,
  ENCLAVE_RPC_CLIENT_ERROR,
  ENCLAVE_RPC_CLIENT_FETCH,
} from "./constants";

export interface EnclaveRpcClientState {
  error?: string;
  clientLoading: boolean;
  clientConnected: boolean;
  enclaveRpcClient: Client | null;
}

export const initialState: EnclaveRpcClientState = {
  clientLoading: false,
  enclaveRpcClient: null,
  clientConnected: false,
};

export const enclaveRpcClientReducer = (
  state = initialState,
  action: EnclaveRpcClientAction
): EnclaveRpcClientState => {
  switch (action.type) {
    case ENCLAVE_RPC_CLIENT_FETCH:
      return {
        ...state,
        clientLoading: true,
        clientConnected: false,
      };
    case ENCLAVE_RPC_CLIENT_DATA:
      return {
        ...state,
        clientLoading: false,
        clientConnected: false,
      };
    case ENCLAVE_RPC_CLIENT_ERROR:
      return {
        ...state,
        clientLoading: false,
        clientConnected: false,
        error: action.error,
      };
    case ENCLAVE_RPC_CLIENT_CONNECTION_OPEN:
      return {
        ...state,
        clientLoading: false,
        clientConnected: true,
        enclaveRpcClient: action.payload,
      };

    default:
      return state;
  }
};
