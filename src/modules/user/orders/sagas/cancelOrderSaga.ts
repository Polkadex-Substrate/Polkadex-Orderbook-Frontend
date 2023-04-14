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
  selectTradeAccount,
  sendError,
  UserAccount,
} from "@polkadex/orderbook-modules";
import { createCancelOrderPayloadSigned } from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { TradeAccount } from "@polkadex/orderbook/modules/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

export function* cancelOrderSaga(action: OrderCancelFetch) {
  try {
    const profileState = useProfile();
    const nativeApiState = useNativeApi();
    const { orderId, base, quote } = action.payload;
    const baseAsset = isAssetPDEX(base) ? "PDEX" : base;
    const quoteAsset = isAssetPDEX(quote) ? "PDEX" : quote;
    const api = nativeApiState.api;
    const account: UserAccount = profileState.selectedAccount;
    const address = account.tradeAddress;
    const keyringPair: TradeAccount = yield select(selectTradeAccount(address));
    if (keyringPair.isLocked) throw new Error("Please unlock your account with password");
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
  const res = await sendQueryToAppSync({
    query: mutation.cancel_order,
    variables: { input: { payload } },
    token: proxyAddress,
  });
  return res;
};
