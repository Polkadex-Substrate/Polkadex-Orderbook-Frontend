// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";

import { userOrdersHistoryData, userOrdersHistoryError } from "../actions";
import { sendError } from "../../../";
import { selectUserInfo } from "../../profile";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { OrderCommon } from "src/modules/types";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* ordersHistorySaga() {
  try {
    const userAccount = yield select(selectUserInfo);
    if (userAccount.address !== "") {
      const payload = { account: userAccount.address };
      const signature = yield call(() =>
        signMessage(userAccount.keyringPair, JSON.stringify(payload))
      );
      const data = formatPayload(signature, payload);
      const res: any = yield call(() => API.post(ordersOptions)("/fetch_orders", data));
      console.log("OrdersFetch", res);
      const ordersArray: OrderCommon[] = res.Fine;
      const orders = sortDescendingTime(ordersArray);
      yield put(userOrdersHistoryData({ list: orders }));
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userOrdersHistoryError,
        },
      })
    );
  }
}

const sortDescendingTime = (orders: OrderCommon[]) =>
  orders.sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();
    return timestampB - timestampA;
  });
