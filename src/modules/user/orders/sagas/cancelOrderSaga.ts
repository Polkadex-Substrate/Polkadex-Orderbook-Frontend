import { call, delay, put, select } from "redux-saga/effects";

import {
  orderCancelData,
  orderCancelDataDelete,
  orderCancelError,
  OrderCancelFetch,
} from "..";

import { selectRangerApi, selectUserInfo, sendError } from "@polkadex/orderbook-modules";
import {
  createCancelOrderPayloadSigned,
  placeCancelOrderToEnclave,
} from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { isAssetPDEX } from "@polkadex/orderbook/modules/public/assets";
import { selectEnclaveRpcClient } from "@polkadex/orderbook/modules/public/enclaveRpcClient";

export function* cancelOrderSaga(action: OrderCancelFetch) {
  try {
    const { orderId, base, quote } = action.payload;
    const baseAsset = isAssetPDEX(base) ? { polkadex: null } : { asset: base };
    const quoteAsset = isAssetPDEX(quote) ? { polkadex: null } : { asset: quote };
    const client = yield select(selectEnclaveRpcClient);
    const api = yield select(selectRangerApi);
    const { address, keyringPair } = yield select(selectUserInfo);
    if (address !== "" && keyringPair) {
      const { order_id, account, pair, signature } = createCancelOrderPayloadSigned(
        api,
        keyringPair,
        orderId,
        baseAsset,
        quoteAsset
      );
      const res = yield call(() =>
        placeCancelOrderToEnclave(client, order_id, account, pair, signature)
      );
      console.log("cancel order result =>", res);
      yield put(orderCancelData());
      yield delay(1000);
      yield put(orderCancelDataDelete());
    }
  } catch (error) {
    console.log({ error });
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: orderCancelError,
        },
      })
    );
  }
}
