import { call, put, select } from "redux-saga/effects";
import { Client } from "rpc-websockets";

import {
  sendError,
  selectUserInfo,
  orderExecuteDataDelete,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
  selectRangerApi,
} from "../../..";

import { selectEnclaveRpcClient } from "@polkadex/orderbook/modules/public/enclaveRpcClient";
import {
  createOrderPayload,
  placeOrderToEnclave,
  signPayload,
} from "@polkadex/orderbook/helpers/createOrdersHelpers";

export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { side, price, order_type, amount, symbol } = action.payload;
    if (order_type === "LIMIT" && Number(price) * Number(amount) <= 0) {
      throw new Error("Invalid price or amount");
    }
    if (order_type === "MARKET" && Number(amount) <= 0) {
      throw new Error("Invalid amount");
    }
    const { address, keyringPair, main_addr } = yield select(selectUserInfo);
    const enclaveRpcClient = yield select(selectEnclaveRpcClient);
    const nonce = yield call(() => getNonceForAccount(enclaveRpcClient, main_addr));
    const api = yield select(selectRangerApi);
    if (address !== "" && keyringPair && enclaveRpcClient && api) {
      const payload = createOrderPayload(
        api,
        address,
        order_type,
        side,
        symbol[0],
        symbol[1],
        amount,
        price,
        nonce
      );
      const signature = signPayload(api, keyringPair, payload);
      const res = yield call(() => placeOrderToEnclave(enclaveRpcClient, payload, signature));
      yield put(orderExecuteData());
      yield put(orderExecuteDataDelete());
    }
  } catch (error) {
    yield put(orderExecuteDataDelete());
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

async function getNonceForAccount(ws: Client, addr: string) {
  const nonce: any = await ws.call("enclave_getNonce", [addr]);
  return nonce + 1;
}
