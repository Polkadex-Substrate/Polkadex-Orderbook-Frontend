import { call, put } from "redux-saga/effects";

import { PlaceOrdersExecutionAction, placeSingleOrder } from "../actions";
import { getCurrentDate } from "../utils";

export function* placeOrdersSaga(action: PlaceOrdersExecutionAction) {
  try {
    const {
      proxyKeyring,
      mainAddress,
      nonce,
      baseAsset,
      quoteAsset,
      ordertype,
      orderSide,
      price,
      quantity,
      isSell,
    } = action.payload;
    const polkadexWorker = (window as any).polkadexWorker;

    const _placeOrder = yield call(() =>
      polkadexWorker.placeOrder(
        proxyKeyring,
        mainAddress,
        nonce,
        baseAsset,
        quoteAsset,
        ordertype,
        orderSide,
        price,
        quantity
      )
    );

    if (_placeOrder.success) {
      yield put(
        placeSingleOrder({
          baseUnit: baseAsset,
          quoteUnit: quoteAsset,
          type: ordertype,
          side: orderSide,
          price: `${price}`,
          amount: `${quantity}`,
          uuid: _placeOrder.message,
          total: `${quantity}`,
          isSell,
          date: getCurrentDate(),
          filled: "filled",
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
