import { call, put, select, take } from "redux-saga/effects";

import { alertPush, BalanceMessage } from "../../..";
import { ProxyAccount, selectUserInfo } from "../../profile";
import { Balance, BalanceChannelFetch, balanceChannelUpdateData } from "../actions";

import { fetchBalanceUpdatesChannel } from "./helpers";

import { IPublicAsset, selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

export function* balanceChannelSaga(action: BalanceChannelFetch) {
  console.log("balanceChannelSaga called");
  try {
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.main_addr;
    if (userAddress) {
      const getAsset = yield select(selectGetAsset);
      const channel = yield call(() => fetchBalanceUpdatesChannel(userAddress));
      while (true) {
        const balanceMsg = yield take(channel);
        console.log("balanceMsg =>", balanceMsg);
        const updateBalance = updateBalanceFromTradeMsg(balanceMsg, getAsset);
        yield put(balanceChannelUpdateData(updateBalance));
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (balances channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

const updateBalanceFromTradeMsg = (
  msg: BalanceMessage,
  getAsset: (id: string) => IPublicAsset
): Balance => {
  const newBalance = {
    name: getAsset(msg.asset).name,
    symbol: getAsset(msg.asset).symbol,
    assetId: msg.asset === "PDEX" ? "-1" : msg.asset,
    free_balance: msg.free,
    reserved_balance: msg.reserved,
    pending_withdrawal: msg.pending_withdrawal,
  };
  return newBalance;
};
