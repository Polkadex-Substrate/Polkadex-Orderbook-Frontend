import { takeLatest } from "redux-saga/effects";

import { RANGER_CONNECT_FETCH, RANGER_INIT_KEYRING } from "../constants";

import { rangerFetchSaga } from "./rangerSaga";
import { loadKeyringSaga } from "./loadKeyringSaga";

export function* rootRangerSaga() {
  yield takeLatest(RANGER_CONNECT_FETCH, rangerFetchSaga);
  yield takeLatest(RANGER_INIT_KEYRING, loadKeyringSaga);
}
