import { call, put, select } from "redux-saga/effects";

import { ProxyAccount, sendError } from "../../..";
import { balancesData, balancesError, UserBalance, BalancesFetch } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import { selectUserInfo } from "../../profile";

import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "@polkadex/orderbook/helpers/formatPayload";
import { API, RequestOptions } from "@polkadex/orderbook-config";

const balancesOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* balancesSaga() {
  try {
    const account = yield select(selectUserInfo);
    const userBalance = yield call(() => fetchbalancesAsync(account));
    const tickers = Object.keys(userBalance.free).map((key) => [key]);
    if (tickers.length) {
      const result = tickers.map(([ticker]) => {
        return {
          ticker: ticker,
          free: userBalance.free[ticker],
          used: userBalance.used[ticker],
          total: userBalance.total[ticker],
        };
      });
      yield put(balancesData({ timestamp: userBalance.timestamp, userBalance: result }));
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

async function fetchbalancesAsync(account: ProxyAccount): Promise<UserBalance> {
  const payload = { account: account.address };
  const signature = await signMessage(account.keyringPair, JSON.stringify(payload));
  const data = formatPayload(signature, payload);
  const res: any = await API.post(balancesOption)("/fetch_balance", data);
  if (res.Fine) {
    const userBlance: UserBalance = res.Fine;
    return userBlance;
  } else throw new Error("failed to fetch user balance");
}
