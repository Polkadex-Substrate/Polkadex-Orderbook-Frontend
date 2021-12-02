// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";

import { userOrdersHistoryData, userOrdersHistoryError } from "../actions";
import { sendError } from "../../../";
import { selectUserInfo } from "../../profile";
import { UserOrdersHistoryFetch } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { OrderCommon } from "src/modules/types";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* ordersHistorySaga(action: UserOrdersHistoryFetch) {
  try {
    const userAccount = action.payload.userAccount;
    if (userAccount.address !== "") {
      const payload = { account: userAccount.address };
      const signature = yield call(() =>
        signMessage(userAccount.keyringPair, JSON.stringify(payload))
      );
      const data = formatPayload(signature, payload);
      const res: any = yield call(() => API.post(ordersOptions)("/fetch_orders", data));
      const ordersArray: OrderCommon[] = res.Fine;
      yield put(userOrdersHistoryData({ list: ordersArray }));
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
