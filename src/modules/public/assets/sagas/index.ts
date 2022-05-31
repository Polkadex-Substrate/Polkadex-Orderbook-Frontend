import { takeLatest } from "redux-saga/effects";

import { PUBLIC_ASSETS_FETCH } from "../constants";

import { fetchAssetsSaga } from "./fetchAssetsSaga";

export function* rootAssetsSaga() {
  yield takeLatest(PUBLIC_ASSETS_FETCH, fetchAssetsSaga);
}
