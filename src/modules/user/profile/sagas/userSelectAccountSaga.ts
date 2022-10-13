import { put, select } from "redux-saga/effects";

import {
  notificationPush,
  selectLinkedMainAddress,
  userAccountSelectData,
  UserAccountSelectFetch,
} from "@polkadex/orderbook-modules";

export function* userSelectAccountSaga(action: UserAccountSelectFetch) {
  const { tradeAddress } = action.payload;
  try {
    const mainAddress = yield select(selectLinkedMainAddress(tradeAddress));
    if (mainAddress) {
      yield put(userAccountSelectData({ account: { tradeAddress, mainAddress } }));
    } else {
      throw new Error("invalid main account");
    }
  } catch (e) {
    console.log("error: ", e);
    yield put(
      notificationPush({
        message: {
          title: "Invalid main account!",
          description: "The selected main account is invalid.",
        },
        time: new Date().getTime(),
      })
    );
  }
}
