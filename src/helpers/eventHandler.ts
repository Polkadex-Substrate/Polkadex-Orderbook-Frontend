import { API } from "aws-amplify";
import Observable from "zen-observable-ts";

import * as subscriptions from "../graphql/subscriptions";

import { READ_ONLY_TOKEN, UserEvents } from "@polkadex/web-constants";

export const createEventsObservable = (name: string): Observable<any> =>
  API.graphql({
    query: subscriptions.websocket_streams,
    variables: { name },
    authToken: READ_ONLY_TOKEN,
  }) as Observable<any>;

interface eventHandlerParams {
  name: string;
  eventType: UserEvents;
  cb: (string) => void;
}
export const eventHandler = (
  updateFunction: (UserEvents) => void,
  address: string,
  typeEvent: UserEvents
) => {
  return createEventsObservable(address).subscribe({
    next: (data) => {
      console.log("got raw event", data);
      const eventData = JSON.parse(data.value.data.websocket_streams.data);
      const eventType = eventData.type;
      console.info("User Event: ", eventData, "event type", eventType);

      if (eventType === typeEvent) {
        updateFunction(eventData);
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
  const sub = createEventsObservable(name).subscribe({
    next(value) {
      const eventData = JSON.parse(value.value.data.websocket_streams.data);
      if (eventType === eventData.type) {
        cb(eventType);
        sub.unsubscribe();
      }
    },
    error(errorValue) {
      console.error("error is event handler", errorValue);
      sub.unsubscribe();
    },
  });
};
