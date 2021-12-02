import { call, put, select } from "redux-saga/effects";

import { sendError, selectUserInfo, notificationPush } from "../../../";
import { openOrdersCancelError, OpenOrdersCancelFetch } from "../actions";

export function* openOrdersCancelSaga(action: OpenOrdersCancelFetch) {
  try {
    const { order: uuid } = action.payload;

    const { proxyKeyring, mainAddress, nonce, baseAsset, quoteAsset } = yield select(
      selectUserInfo
    );
    const polkadexWorker = (window as any).polkadexWorker;
    const _cancelOrder = yield call(() =>
      polkadexWorker.cancelOrder({
        proxyKeyring,
        mainAddress,
        nonce,
        baseAsset,
        quoteAsset,
        uuid,
      })
    );
    // TODO: Add order  status alerts
    if (_cancelOrder.success)
      yield put(
        notificationPush({
          type: "Loading",
          message: {
            title: "Order Canceled",
            description: "Congrats your order has been created",
          },
        })
      );
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: openOrdersCancelError,
        },
      })
    );
  }
}
