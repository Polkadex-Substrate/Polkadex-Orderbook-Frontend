import { takeLeading } from "redux-saga/effects";

import { ENCLAVE_RPC_CLIENT_FETCH } from "../constants";

import { enclaveRpcClientSaga } from "./enclaveRpcClientSaga";

export function* rootEnclaveRpcClientSaga() {
  yield takeLeading(ENCLAVE_RPC_CLIENT_FETCH, enclaveRpcClientSaga);
}
