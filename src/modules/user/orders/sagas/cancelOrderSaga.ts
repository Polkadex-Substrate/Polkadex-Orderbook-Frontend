import { call, delay, put, select } from "redux-saga/effects";

import {
  orderCancelData,
  orderCancelDataDelete,
  orderCancelError,
  OrderCancelFetch,
} from "..";
import * as mutation from "../../../../graphql/mutations";

import {
  notificationPush,
  selectRangerApi,
  selectTradeAccount,
  selectUsingAccount,
  sendError,
} from "@polkadex/orderbook-modules";
import { createCancelOrderPayloadSigned } from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { isAssetPDEX } from "@polkadex/orderbook/modules/public/assets";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export function* cancelOrderSaga(action: OrderCancelFetch) {
  try {
    const { orderId, base, quote } = action.payload;
    const baseAsset = isAssetPDEX(base) ? "PDEX" : base;
    const quoteAsset = isAssetPDEX(quote) ? "PDEX" : quote;
    const api = yield select(selectRangerApi);
    const account = yield select(selectUsingAccount);
    const address = account.selectedTradeAddress;
    const keyringPair = yield select(selectTradeAccount(address));
    if (address !== "" && keyringPair) {
      const { order_id, account, pair, signature } = createCancelOrderPayloadSigned(
        api,
        keyringPair,
        orderId,
        baseAsset,
        quoteAsset
      );
      const res = yield call(() =>
        executeCancelOrder([order_id, account, pair, signature], address)
      );
      console.info("cancelled order: ", res);
      yield put(orderCancelData());
      yield put(
        notificationPush({
          type: "SuccessAlert",
          message: {
            title: "Order cancelled",
            description: `OrderId: ${orderId}`,
          },
          time: new Date().getTime(),
        })
      );
      yield delay(1000);
      yield put(orderCancelDataDelete());
    }
  } catch (error) {
    console.error("cancel order error: ", error);
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
const executeCancelOrder = async (cancelOrderPayload, proxyAddress: string) => {
  const payload = JSON.stringify({ CancelOrder: cancelOrderPayload });
  const res = await sendQueryToAppSync(
    mutation.cancel_order,
    { input: { payload } },
    proxyAddress
  );
  return res;
};
