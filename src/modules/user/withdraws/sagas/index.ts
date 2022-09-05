import { takeLeading } from "redux-saga/effects";

import { WITHDRAWS_CLAIM_FETCH, WITHDRAWS_FETCH } from "../constants";

import { fetchClaimWithdrawSaga } from "./fetchClaimWithdraw";
import { fetchWithdrawsSaga } from "./fetchWithdrawsSaga";

export function* rootWithdrawsSaga() {
  yield takeLeading(WITHDRAWS_FETCH, fetchWithdrawsSaga);
  yield takeLeading(WITHDRAWS_CLAIM_FETCH, fetchClaimWithdrawSaga);
}
