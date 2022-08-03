import { call, delay, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import {
  orderCancelData,
  orderCancelDataDelete,
  orderCancelError,
  OrderCancelFetch,
} from "..";
import * as mutation from "../../../../graphql/mutations";

import { selectRangerApi, selectUserInfo, sendError } from "@polkadex/orderbook-modules";
import { createCancelOrderPayloadSigned } from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { isAssetPDEX } from "@polkadex/orderbook/modules/public/assets";

export function* cancelOrderSaga(action: OrderCancelFetch) {
  try {
    const { orderId, base, quote } = action.payload;
    const baseAsset = isAssetPDEX(base) ? { polkadex: null } : { asset: base };
    const quoteAsset = isAssetPDEX(quote) ? { polkadex: null } : { asset: quote };
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
      const res = yield call(() => executeCancelOrder([order_id, account, pair, signature]));
      console.info("cancelled order: ", res);
      yield put(orderCancelData());
      yield delay(1000);
      yield put(orderCancelDataDelete());
    }
  } catch (error) {
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
const executeCancelOrder = async (cancelOrderPayload) => {
  const payload = { CancelOrder: cancelOrderPayload };
  const res = await API.graphql({
    query: mutation.cancel_order,
    variables: payload,
  });
  return res;
};
