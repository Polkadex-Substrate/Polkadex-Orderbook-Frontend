import { takeLeading } from "redux-saga/effects";

import {
  BALANCES_FETCH,
  BALANCE_CHANNEL_TRADE_FETCH,
  BALANCE_CHANNEL_TRANSFER_FETCH,
} from "../constants";

import { balanceChannelSaga } from "./balanceChannel";
import { balancesSaga } from "./balancesSaga";
import { transfersChannelSaga } from "./transferChannel";

export function* rootBalancesSaga() {
  yield takeLeading(BALANCES_FETCH, balancesSaga);
  yield takeLeading(BALANCE_CHANNEL_TRADE_FETCH, balanceChannelSaga);
  yield takeLeading(BALANCE_CHANNEL_TRANSFER_FETCH, transfersChannelSaga);
}
