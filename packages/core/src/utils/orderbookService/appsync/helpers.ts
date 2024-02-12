import { API as amplifyApi } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import { READ_ONLY_TOKEN } from "@orderbook/core/constants";
import { Maybe } from "@orderbook/core/helpers";
import { GraphQLResult, GraphQLSubscription } from "@aws-amplify/api";

import { Websocket_streamsSubscription } from "../../../API";

import { BookUpdateEvent } from "./types";
import { PriceLevel, Order } from "./../types";

type Props = {
  query: string;
  variables?: Record<string, unknown>;
  token?: string;
  authMode?: keyof typeof GRAPHQL_AUTH_MODE;
  API?: typeof amplifyApi;
};

export async function sendQueryToAppSync<T = any>({
  query,
  variables,
  token,
  authMode = GRAPHQL_AUTH_MODE.AWS_LAMBDA,
  API = amplifyApi,
}: Props): Promise<T> {
  const authOptions = {
    [GRAPHQL_AUTH_MODE.AWS_LAMBDA]: {
      query,
      variables,
      authToken: token ?? READ_ONLY_TOKEN,
    },
  };

  const requestOptions = authOptions[authMode];
  if (!requestOptions) throw new Error("Invalid authentication type.");
  return API.graphql(requestOptions) as T;
}

export const fetchFullListFromAppSync = async <T = any>(
  query: string,
  variables: Record<string, unknown>,
  key: string
): Promise<T[]> => {
  let fullResponse: any[] = [];
  let nextToken = null;
  do {
    const res = await sendQueryToAppSync({
      query,
      variables: nextToken ? { ...variables, nextToken } : variables,
    });
    fullResponse = [...fullResponse, ...(res.data[key]?.items || [])];
    nextToken = res.data[key].nextToken;
  } while (nextToken);
  return fullResponse as T[];
};

export const fetchListFromAppSync = async <T = any[]>(
  query: string,
  variables: Record<string, unknown>,
  key: string
): Promise<{ response: T; nextToken: Maybe<string> }> => {
  const res = await sendQueryToAppSync({
    query,
    variables,
  });

  const fullResponse = res.data[key]?.items;

  const nextToken = res.data[key]?.nextToken;

  return { response: fullResponse, nextToken };
};

const LIST_LIMIT = 15;
export const fetchBatchFromAppSync = async <T = any[]>(
  query: string,
  variables: Record<string, any>,
  key: string
): Promise<{ response: any[]; nextToken: Maybe<string> }> => {
  let nextToken = variables.nextToken;
  let response: any[] = [];
  do {
    const { nextToken: newNextToken, response: newResponse } =
      await fetchListFromAppSync(
        query,
        nextToken ? { ...variables, nextToken } : variables,
        key
      );
    response = [...response, ...(newResponse || [])];
    nextToken = newNextToken;
  } while (response.length < LIST_LIMIT && nextToken);
  return { response, nextToken };
};

export const convertBookUpdatesToPriceLevels = (
  data: BookUpdateEvent
): PriceLevel[] => {
  const { b, a } = data;
  const bids = Object.entries(b).map(
    ([p, q]): PriceLevel => ({
      side: "Bid",
      price: Number(p),
      qty: Number(q),
      seqNum: data.i,
    })
  );
  const asks = Object.entries(a).map(
    ([p, q]): PriceLevel => ({
      side: "Ask",
      price: Number(p),
      qty: Number(q),
      seqNum: data.i,
    })
  );
  return [...bids, ...asks];
};

export function filterUserSubscriptionType(
  data: GraphQLResult<GraphQLSubscription<Websocket_streamsSubscription>>,
  type: string
) {
  return Boolean(
    data?.data?.websocket_streams?.data &&
      JSON.parse(data?.data.websocket_streams.data).type === type
  );
}

export const replaceOrPushOrder = (
  orders: Order[],
  newOrder: Order
): Order[] => {
  const index = orders.findIndex((order) => order.orderId === newOrder.orderId);
  if (index === -1) {
    return [...orders, newOrder];
  }
  return [...orders.slice(0, index), newOrder, ...orders.slice(index + 1)];
};

export const removeOrderFromList = (
  orders: Order[],
  newOrder: Order
): Order[] => {
  const index = orders.findIndex((order) => order.orderId === newOrder.orderId);
  if (index === -1) {
    return orders;
  }
  return [...orders.slice(0, index), ...orders.slice(index + 1)];
};
