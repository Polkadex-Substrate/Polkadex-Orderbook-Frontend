import { call, put, select, take, fork } from "redux-saga/effects";
import { EventChannel, eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { UserEventsFetch, userUnknownEvent } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";
import { transactionsUpdateEvent } from "../../transactions/actions";
import { balanceUpdateEvent } from "../../balances";
import { orderUpdateEvent } from "../../ordersHistory";
import { selectCurrentMainAccount } from "../../mainAccount";
import { notificationPush } from "../../notificationHandler";
import { selectCurrentTradeAccount } from "../../tradeAccount";
import { userTradesUpdateEvent } from "../../trades";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { isKeyPresentInObject } from "@polkadex/orderbook/helpers/isKeyPresentInObject";

export function* userEventsChannelSaga(action: UserEventsFetch) {
  const mainAcc = yield select(selectCurrentMainAccount);
  const tradeAcc = yield select(selectCurrentTradeAccount);
  yield fork(userEventsChannelHandler, tradeAcc.address);
  yield fork(userEventsChannelHandler, mainAcc.address);
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
  const data = JSON.parse(eventData.value.data.websocket_streams.data);
  console.info("User Event: ", data);
  if (isKeyPresentInObject(data, "SetBalance")) {
    return balanceUpdateEvent(data.SetBalance);
  } else if (isKeyPresentInObject(data, "SetTransaction")) {
    return transactionsUpdateEvent(data.SetTransaction);
  } else if (isKeyPresentInObject(data, "SetOrder")) {
    return orderUpdateEvent(data.SetOrder);
  } else if (isKeyPresentInObject(data, "RegisterAccount")) {
    return registerSuccessNofiication();
  } else {
    return userTradesUpdateEvent(data);
  }
}

const registerSuccessNofiication = () =>
  notificationPush({
    type: "SuccessAlert",
    message: {
      title: "Account registered",
      description: "Your account has been registered",
    },
    time: new Date().getTime(),
  });
