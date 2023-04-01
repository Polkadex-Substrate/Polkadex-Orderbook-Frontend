import { call, put, select, take, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { userEventsFetch, UserEventsFetch } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";
import { transactionsUpdateEvent } from "../../transactions/actions";
import { balanceUpdateEvent } from "../../balances";
import { orderUpdateEvent } from "../../ordersHistory";
import { notificationPush } from "../../notificationHandler";
import { userTradesUpdateEvent } from "../../trades";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { READ_ONLY_TOKEN, USER_EVENTS } from "@polkadex/web-constants";
import { UserAccount, tradeAccountUpdateEvent } from "@polkadex/orderbook-modules";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { registerMainAccountUpdateEvent } from "@polkadex/orderbook/providers/user/extensionWallet/actions";

export function* userEventsChannelSaga(_action: UserEventsFetch) {
  const profileState = useProfile();
  const currentAccount: UserAccount = profileState.selectedAccount;
  const mainAddr = currentAccount.mainAddress;
  const tradeAddr = currentAccount.tradeAddress;
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
      error: (err) => {
        console.log("subscription error", err);
      },
    });
    return subscription.unsubscribe;
  });
}

function createActionFromUserEvent(eventData: any) {
  const { onRegisterMainAccountUpdate } = useExtensionWallet();
  console.log("got raw event", eventData);
  const data = JSON.parse(eventData.value.data.websocket_streams.data);
  console.info("User Event: ", data);
  const eventType = data.type;
  switch (eventType) {
    case USER_EVENTS.SetBalance:
      return balanceUpdateEvent(data);
    case USER_EVENTS.SetTransaction:
      return transactionsUpdateEvent(data);
    case USER_EVENTS.Order:
      return orderUpdateEvent(data);
    case USER_EVENTS.RegisterAccount: {
      onRegisterMainAccountUpdate(data);
      return registerMainAccountUpdateEvent(data);
    }
    case USER_EVENTS.AddProxy:
      return tradeAccountUpdateEvent(data);
    case USER_EVENTS.TradeFormat:
      return userTradesUpdateEvent(data);
    case USER_EVENTS.RemoveProxy:
      return registerSuccessNotification(
        "Trade account removed",
        "Trade account removal Confirmed"
      );
  }
}

const registerSuccessNotification = (title: string, description: string) =>
  notificationPush({
    type: "SuccessAlert",
    message: {
      title,
      description,
    },
    time: new Date().getTime(),
  });
