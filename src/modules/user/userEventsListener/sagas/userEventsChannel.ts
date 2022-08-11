import { put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { UserEventsFetch } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";
import { transactionsUpdateEvent } from "../../transactions/actions";
import { balanceUpdateEvent } from "../../balances";
import { orderUpdateEvent } from "../../ordersHistory";
import { selectCurrentMainAccount } from "../../mainAccount";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { isKeyPresentInObject } from "@polkadex/orderbook/helpers/isKeyPresentInObject";

export function* userEventsChannelSaga(action: UserEventsFetch) {
  try {
    const { address } = yield select(selectCurrentMainAccount);
    if (address) {
      const channel = createUserEventsChannel(address);
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (userEventsChannelSaga channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function createUserEventsChannel(address: string) {
  console.log("created User Events Channel...");
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
  console.info("User Event: ", eventData);
  const data = JSON.parse(eventData.value.data.websocket_streams.data);
  debugger;
  if (isKeyPresentInObject(data, "SetBalance")) {
    return balanceUpdateEvent(data.SetBalance);
  } else if (isKeyPresentInObject(data, "SetTransaction")) {
    return transactionsUpdateEvent(data.SetTransaction);
  } else if (isKeyPresentInObject(data, "SetOrder")) {
    return orderUpdateEvent(data.SetOrder);
  }
}
