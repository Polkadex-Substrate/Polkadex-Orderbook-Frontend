import { call, put, select } from "redux-saga/effects";

import { alertPush, sendError, selectUserInfo } from "../../../";
import { openOrdersCancelError, OpenOrdersCancelFetch } from "../actions";

export function* openOrdersCancelSaga(action: OpenOrdersCancelFetch) {
  try {
    const {
      order: { uuid },
    } = action.payload;

    const { proxyKeyring, mainAddress, nonce, baseAsset, quoteAsset } = yield select(
      selectUserInfo
    );
    const polkadexWorker = (window as any).polkadexWorker;
    const _cancelOrder = yield call(() =>
      polkadexWorker.cancelOrder(proxyKeyring, mainAddress, nonce, baseAsset, quoteAsset, uuid)
    );
    if (_cancelOrder.success)
      yield put(
        alertPush({
          type: "Successful",
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
