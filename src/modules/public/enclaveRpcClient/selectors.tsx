import { Client } from "rpc-websockets";

import { RootState } from "../..";

export const selectEnclaveRpcClientSuccess = (state: RootState): boolean =>
  state.public.enclaveRpcClient.clientConnected;
export const selectEnclaveRpcClientError = (state: RootState): string =>
  state.public.enclaveRpcClient.error;
export const selectEnclaveRpcClientLoading = (state: RootState): boolean =>
  state.public.enclaveRpcClient.clientLoading;
export const selectEnclaveRpcClient = (state: RootState): Client =>
  state.public.enclaveRpcClient.enclaveRpcClient;
