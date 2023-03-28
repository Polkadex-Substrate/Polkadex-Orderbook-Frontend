import { put } from "redux-saga/effects";

import {
  notificationPush,
  registerTradeAccountError,
  sendError,
  TradeAccountUpdate,
  userAccountSelectFetch,
} from "@polkadex/orderbook-modules";

export function* tradeAccountUpdateSaga(action: TradeAccountUpdate) {
  try {
    const { proxy, main } = action.payload;
    // When Trade wallet context will created, then update it to profile context userAccountSelectFetch
    yield put(
      userAccountSelectFetch({
        tradeAddress: proxy,
      })
    );
    yield put(
      notificationPush({
        type: "SuccessAlert",
        message: {
          title: "Trade account added",
          description: "New Trade account created",
        },
        time: new Date().getTime(),
      })
    );
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: registerTradeAccountError,
        },
      })
    );
  }
}
