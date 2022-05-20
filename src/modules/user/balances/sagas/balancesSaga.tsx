import { call, put, select } from "redux-saga/effects";
import axios from "axios";

import { ProxyAccount, sendError } from "../../..";
import { balancesData, balancesError, AssetBalance, BalancesFetch, Balance } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import { selectUserInfo } from "../../profile";

import { randomIcons } from "@polkadex/orderbook-ui/organisms/Funds/randomIcons";
import { signMessage, toCapitalize } from "@polkadex/web-helpers";

export function* balancesSaga(balancesFetch: BalancesFetch) {
  try {
    const account = yield select(selectUserInfo);
    if (account.address) {
      const balances = yield call(() => fetchbalancesAsync(account));
      yield put(balancesData(balances));
    } else {
      throw new Error("User not logged in");
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

async function fetchbalancesAsync(account: ProxyAccount): Promise<Balance[]> {
  const address = account.address;
  const res = await axios.get("/api/user/assets/ " + address);
  return res.data;
}
