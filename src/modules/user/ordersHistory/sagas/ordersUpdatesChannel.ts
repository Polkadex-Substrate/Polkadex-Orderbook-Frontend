import { put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { FetchOrderUpdatesChannel, userOrderChannelUpdateData } from "../actions";
import { ProxyAccount, selectUserInfo } from "../../profile";
import * as subscriptions from "../../../../graphql/subscriptions";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";

export function* orderUpdatesChannelSaga(action: FetchOrderUpdatesChannel) {
  console.log("orderUpdateChannel called");
  try {
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.address;
    if (userAddress) {
      const channel = createOrderUpdatesChannel(userAddress);
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (order updates channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function createOrderUpdatesChannel(address: string) {
  return eventChannel((emit) => {
    const subscription = API.graphql({
      query: subscriptions.onOrderUpdate,
      variables: { main_account: address },
    }).subscribe({
      next: (data) => {
        emit(userOrderChannelUpdateData(data.value.data.onOrderUpdate));
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}
