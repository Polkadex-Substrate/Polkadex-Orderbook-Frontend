import { call, delay, put, select } from "redux-saga/effects";
import { Keyring } from "@polkadot/api";

import {
  sendError,
  selectUserInfo,
  orderExecuteDataDelete,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
  userOrdersHistoryFetch,
  selectRangerApi,
} from "../../..";
import { balancesFetch } from "../../balances";

import { selectEnclaveRpcClient } from "@polkadex/orderbook/modules/public/enclaveRpcClient";
import {
  createOrderPayload,
  placeOrderToEnclave,
  signOrderPayload,
} from "@polkadex/orderbook/helpers/createOrdersHelpers";

// TODO change keyring to alice/bob
export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { side, price, order_type, amount, symbol } = action.payload;
    if (order_type === "Limit" && Number(price) * Number(amount) <= 0) {
      throw new Error("Invalid price or amount");
    }
    if (order_type === "Market" && Number(amount) <= 0) {
      throw new Error("Invalid amount");
    }
    const { address, keyringPair } = yield select(selectUserInfo);
    const enclaveRpcClient = yield select(selectEnclaveRpcClient);
    const api = yield select(selectRangerApi);
    if (address !== "" && keyringPair && enclaveRpcClient && api) {
      const payload = createOrderPayload(
        api,
        address,
        order_type,
        side,
        "1",
        null,
        amount,
        price
      );
      const signature = signOrderPayload(api, keyringPair, payload);
      const res = yield call(() => placeOrderToEnclave(enclaveRpcClient, payload, signature));
      console.log("placeOrderResult =>", res);
      yield put(orderExecuteData());
      yield put(orderExecuteDataDelete());
      yield put(userOrdersHistoryFetch());
      yield put(balancesFetch());
    }
  } catch (error) {
    console.log({ error });
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: orderExecuteError,
        },
      })
    );
  }
}
