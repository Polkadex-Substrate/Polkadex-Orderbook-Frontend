import { call, put, select, take } from "redux-saga/effects";

import { alertPush } from "../../..";
import { ProxyAccount, selectUserInfo } from "../../profile";
import {
  BalanceChannelFetch,
  balanceChannelTransferData,
  BalanceChannelTransferData,
  BalanceTransferMessage,
} from "../actions";

import { fetchBalanceUpdatesChannel } from "./helpers";

import { selectRabbitmqChannel } from "@polkadex/orderbook/modules/public/rabbitmqChannel";
import { IPublicAsset, selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

export function* transfersChannelSaga(action: BalanceChannelFetch) {
  try {
    console.log("transfersChannelSaga called");
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.address;
    if (userAddress) {
      const rabbitmqConn = yield select(selectRabbitmqChannel);
      const getAsset = yield select(selectGetAsset);
      const mainAddress = userInfo.main_addr;
      const mainQueueName = `${mainAddress}-balance-update-events`;
      const mainRoutingKey = `${mainAddress}-balance-update-events`;
      if (rabbitmqConn) {
        const mainChannel = yield call(() =>
          fetchBalanceUpdatesChannel(rabbitmqConn, mainQueueName, mainRoutingKey)
        );

        while (true) {
          const transferMsg = yield take(mainChannel);
          console.log("transferMsg =>", transferMsg);
          const balanceMsg: BalanceTransferMessage = JSON.parse(transferMsg);
          const updateBalance = updateBalanceFromDepositMsg(balanceMsg, getAsset);
          yield put(balanceChannelTransferData(updateBalance));
        }
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (deposits channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

const updateBalanceFromDepositMsg = (
  msg: BalanceTransferMessage,
  getAsset: (id: string) => IPublicAsset
): BalanceChannelTransferData["payload"] => {
  const assetId = msg.update.Deposit.asset === "PDEX" ? "-1" : msg.update.Deposit.asset;
  const amount = msg.update.Deposit.amount;
  return {
    name: getAsset(assetId).name,
    symbol: getAsset(assetId).symbol,
    amount,
    assetId,
  };
};
