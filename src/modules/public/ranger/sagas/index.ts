import { takeLatest } from "redux-saga/effects";

import { RANGER_CONNECT_FETCH } from "../constants";

import { rangerFetchSaga } from "./rangerSaga";

export function* rootRangerSaga() {
  yield takeLatest(RANGER_CONNECT_FETCH, rangerFetchSaga);
}
