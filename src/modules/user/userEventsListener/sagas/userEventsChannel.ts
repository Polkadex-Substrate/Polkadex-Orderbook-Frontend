import { call, put, select, take, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { UserEventsFetch } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";
import { transactionsUpdateEvent } from "../../transactions/actions";
import { balanceUpdateEvent } from "../../balances";
import { orderUpdateEvent } from "../../ordersHistory";
import { registerMainAccountUpdateEvent } from "../../extensionWallet";
import { notificationPush } from "../../notificationHandler";
import { userTradesUpdateEvent } from "../../trades";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";
import { SelectedAccount, selectUsingAccount } from "@polkadex/orderbook-modules";

export function* userEventsChannelSaga(_action: UserEventsFetch) {
  const currentAccount: SelectedAccount = yield select(selectUsingAccount);
  const mainAddr = currentAccount.linkedMainAddress;
  const tradeAddr = currentAccount.selectedTradeAddress;
  yield fork(userEventsChannelHandler, mainAddr);
  yield fork(userEventsChannelHandler, tradeAddr);
}

export function* userEventsChannelHandler(address) {
  try {
    const channel = yield call(createUserEventsChannel, address);
    while (true) {
      const action = yield take(channel);
      console.log({ action });
      yield put(action);
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (userEventsChannelHandler channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  } finally {
    console.log("User Events Channel closed...");
  }
}

function createUserEventsChannel(address: string) {
  console.log("created User Events Channel...", address);

  return eventChannel((emit) => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: address },
      authToken: READ_ONLY_TOKEN,
      // ignore type error here as its a known bug in aws library
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        emit(createActionFromUserEvent(data));
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}

function createActionFromUserEvent(eventData: any) {
  console.log("got raw event", eventData);
  const data = JSON.parse(eventData.value.data.websocket_streams.data);
  console.info("User Event: ", data);
  const eventType = data.type;
  switch (eventType) {
    case "SetBalance":
      return balanceUpdateEvent(data);
    case "SetTransaction":
      return transactionsUpdateEvent(data);
    case "Order":
      return orderUpdateEvent(data);
    case "RegisterAccount":
      return registerMainAccountUpdateEvent(data);
    case "AddProxy":
      return registerSuccessNofiication("Trade account added", "New Trade account created");
    case "TradeFormat":
      return userTradesUpdateEvent(data);
    case "RemoveProxy":
      return registerSuccessNofiication(
        "Trade account removed",
        "Trade account removal Confirmed"
      );
  }
}

const registerSuccessNofiication = (title: string, description: string) =>
  notificationPush({
    type: "SuccessAlert",
    message: {
      title,
      description,
    },
    time: new Date().getTime(),
  });
