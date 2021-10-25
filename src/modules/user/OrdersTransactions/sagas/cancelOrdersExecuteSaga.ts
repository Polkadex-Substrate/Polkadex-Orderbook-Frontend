import { call, put } from "redux-saga/effects";

import { cancelOrdersExecute, CancelOrdersExecutionAction } from "../actions";

export function* cancelOrdersSaga(action: CancelOrdersExecutionAction) {
  try {
    const { proxyKeyring, mainAddress, nonce, baseAsset, quoteAsset, order_uuid } =
      action.payload;
    const polkadexWorker = (window as any).polkadexWorker;
    const _cancelOrder = yield call(() =>
      polkadexWorker.cancelOrder(
        proxyKeyring,
        mainAddress,
        nonce,
        baseAsset,
        quoteAsset,
        order_uuid
      )
    );

    if (_cancelOrder.success) {
      yield put(
        cancelOrdersExecute({
          proxyKeyring,
          mainAddress,
          nonce,
          baseAsset,
          quoteAsset,
          order_uuid,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
