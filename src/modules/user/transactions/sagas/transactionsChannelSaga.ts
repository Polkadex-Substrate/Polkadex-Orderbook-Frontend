import { put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { ProxyAccount, selectUserInfo } from "../../profile";
import { transactionChannelData, TransactionChannelFetch } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";

export function* transactionsChannelSaga(action: TransactionChannelFetch) {
  console.log("transactionsChannelSaga called");
  try {
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.main_addr;
    if (userAddress) {
      const channel = createTransactionsChannel(userAddress);
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (onUpdateTransaction channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function createTransactionsChannel(address: string) {
  return eventChannel((emit) => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateTransaction,
      variables: { main_account: address },
    }).subscribe({
      next: (data) => {
        emit(transactionChannelData(data.value.data.onUpdateTransaction));
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}
