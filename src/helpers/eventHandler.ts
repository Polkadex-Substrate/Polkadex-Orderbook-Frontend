import { API } from "aws-amplify";

import * as subscriptions from "../graphql/subscriptions";

import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

export const eventHandler = (updateFunction, address: string, typeEvent: string) => {
  if (typeEvent === "RegisterAccount")
    console.log(address, typeEvent, "event type and address");

  const subscription = API.graphql({
    query: subscriptions.websocket_streams,
    variables: { name: address },
    authToken: READ_ONLY_TOKEN,
    // ignore type error here as its a known bug in aws library
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }).subscribe({
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
      console.log("subscription error", err);
    },
  });
  return subscription;
};
