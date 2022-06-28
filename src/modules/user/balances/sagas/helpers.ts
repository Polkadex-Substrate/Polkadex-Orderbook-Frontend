import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import * as subscriptions from "../../../../graphql/subscriptions";

export async function fetchBalanceUpdatesChannel(main_account: string) {
  return eventChannel((emitter) => {
    const subscription = API.graphql({
      query: subscriptions.onBalanceUpdate,
      variables: { main_account: main_account },
    }).subscribe({
      next: (data) => {
        emitter(data.value.data.onBalanceUpdate);
      },
      error: (err) => {
        console.warn("error in balance channel", err);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}
