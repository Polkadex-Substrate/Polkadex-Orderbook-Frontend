import { put } from "redux-saga/effects";

import { registerTradeAccountReset } from "../../tradeWallet";

export function* registerMainAccountResetSaga() {
  yield put(registerTradeAccountReset());
}
