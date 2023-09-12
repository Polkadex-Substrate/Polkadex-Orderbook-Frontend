import { APIClass, API as ampliyfyApi } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";

import { READ_ONLY_TOKEN } from "@/constants";

type Props = {
  query: string;
  variables?: Record<string, unknown>;
  token?: string;
  authMode?: keyof typeof GRAPHQL_AUTH_MODE;
  API?: APIClass;
};
export const sendQueryToAppSync = async ({
  query,
  variables,
  token,
  authMode = GRAPHQL_AUTH_MODE.AWS_LAMBDA,
  API = ampliyfyApi,
}: Props) => {
  let res: any;
  if (authMode === "AWS_LAMBDA") {
    res = await API.graphql({
      query,
      variables,
      authToken: token ?? READ_ONLY_TOKEN,
    });
  } else if (authMode === GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS) {
    res = await API.graphql({
      query,
      variables,
      authMode,
    });
  } else {
    throw new Error("Invalid authentication type.");
  }
  return res;
};

export const fetchAllFromAppSync = async (
  query: string,
  variables: Record<string, unknown>,
  key: string,
) => {
  let fullResponse: any[] = [];
  let nextToken = null;
  do {
    const res = await sendQueryToAppSync({
      query,
      variables: nextToken ? { ...variables, nextToken } : variables,
    });
    fullResponse = [...fullResponse, ...res.data[key].items];
    nextToken = res.data[key].nextToken;
  } while (nextToken);
  return fullResponse;
};

export const fetchFromAppSync = async (
  query: string,
  variables: Record<string, unknown>,
  key: string,
) => {
  const res = await sendQueryToAppSync({
    query,
    variables,
  });

  const fullResponse = res.data[key].items;

  const nextToken = res.data[key].nextToken;

  return { response: fullResponse, nextToken };
};
