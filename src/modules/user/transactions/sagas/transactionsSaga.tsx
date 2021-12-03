import { call, put, select } from "redux-saga/effects";

import { transactionsData } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import { selectUserInfo } from "../../profile";

import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "@polkadex/orderbook/helpers/formatPayload";
import { API, RequestOptions } from "@polkadex/orderbook-config";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};
export function* transactionsSaga() {
  try {
    const { address, keyringPair } = yield select(selectUserInfo);
    const payload = { account: address };
    const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
    const data = formatPayload(signature, payload);
    // TODO: Replace url
    // const res = yield call(() => API.post(ordersOption)("/fetch_user_trades", data));
    const res = {
      Fine: [
        {
          id: "1234",
          txid: "0x68bfb29821c50ca35ef3762f887fd3211e4405aba1a94e448a4f218b850358f0",
          timestamp: 1638431638238,
          from: "5HGabetgTWWsoRJxdZP11ns2yi1oVaenXEBprfKHp7tpw7NH",
          to: "5HGabemdto3ziZLeW1QQ8D4hevie1UWCk7T1mCR611Dc25WZ",
          transaction_type: "Transfer",
          amount: 24.0,
          currency: "PDEX",
          status: "Closed",
          updated_timestamp: null,
          fee: {
            currency: "PDEX",
            cost: 0.0,
          },
        },
      ],
    };
    if (res.Fine) {
      yield put(transactionsData(res.Fine));
    } else {
      throw new Error("user transaction fetch failed");
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
