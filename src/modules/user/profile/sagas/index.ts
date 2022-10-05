import { takeLeading } from "redux-saga/effects";

import { PROFILE_USER_FETCH, PROFILE_USER_SELECT_ACCOUNT_FETCH } from "../constants";

import { userAuthSaga } from "./userAuthSaga";

import { userSelectAccountSaga } from "@polkadex/orderbook/modules/user/profile/sagas/userSelectAccountSaga";

export function* rootProfileSaga() {
  yield takeLeading(PROFILE_USER_FETCH, userAuthSaga);
  yield takeLeading(PROFILE_USER_SELECT_ACCOUNT_FETCH, userSelectAccountSaga);
}
