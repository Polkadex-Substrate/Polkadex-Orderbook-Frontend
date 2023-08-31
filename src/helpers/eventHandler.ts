import { API } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";

import * as subscriptions from "../graphql/subscriptions";

import { READ_ONLY_TOKEN, UserEvents } from "@polkadex/web-constants";
import { Websocket_streamsSubscription } from "@polkadex/orderbook/API";

export const createEventsObservable = (name: string) =>
  API.graphql<GraphQLSubscription<Websocket_streamsSubscription>>({
    query: subscriptions.websocket_streams,
    variables: { name },
    authToken: READ_ONLY_TOKEN,
  });

interface eventHandlerParams {
  name: string;
  eventType: UserEvents;
  cb: (value: unknown) => void;
}
export const eventHandler = ({ cb, name, eventType }: eventHandlerParams) => {
  console.log(name, "address");

  return createEventsObservable(name).subscribe({
    next: (data) => {
      console.log("got raw event", data);
      const eventData = JSON.parse(data.value.data.websocket_streams.data);
      console.info("User Event: ", eventData, "event type", eventData.type);

      if (eventType === eventData.type) {
        cb(eventData);
      }
    },
    error: (err) => {
      console.log("error is event handler", err);
      throw err;
    },
  });
};

// waits for the specified event `eventType` to happen and then calls the callback function provided
// unsubscribes from observable once done
export const eventHandlerCallback = ({ name, eventType, cb }: eventHandlerParams) => {
  console.log(name, eventType, "address and event type from callback");

  const sub = createEventsObservable(name).subscribe({
    next(value) {
      const eventData = JSON.parse(value.value.data.websocket_streams.data);
      if (eventType === eventData.type) {
        cb(eventData);
        sub.unsubscribe();
      }
    },
    error(errorValue) {
      console.error("error is event handler", errorValue);
      sub.unsubscribe();
    },
  });
};
