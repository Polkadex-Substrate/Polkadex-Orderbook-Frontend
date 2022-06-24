import { put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { MarketsTickerChannelFetch } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { ProxyAccount, selectUserInfo } from "@polkadex/orderbook/modules/user/profile";

export function* marketTickersChannelSaga(action: MarketsTickerChannelFetch) {
  console.log("marketTicker channel called");
  try {
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.address;
    if (userAddress) {
      const channel = createMarketTickersChannel(userAddress);
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (marketTickers updates channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function createMarketTickersChannel(market: string) {
  return eventChannel((emit) => {
    const subscription = API.graphql({
      query: subscriptions.onNewTicker,
      variables: { m: market },
    }).subscribe({
      next: (data) => {
        debugger;
        emit(data.value.data);
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}
