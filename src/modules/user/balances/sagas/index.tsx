import { takeLeading } from "redux-saga/effects";

import { BALANCES_FETCH, BALANCE_CHANNEL_FETCH } from "../constants";

import { balanceChannelSaga } from "./balanceChannel";
import { balancesSaga } from "./balancesSaga";

export function* rootBalancesSaga() {
  yield takeLeading(BALANCES_FETCH, balancesSaga);
  yield takeLeading(BALANCE_CHANNEL_FETCH, balanceChannelSaga);
}
