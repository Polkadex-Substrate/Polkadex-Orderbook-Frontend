import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";

import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

export const sendQueryToAppSync = async (
  query: string,
  variables?: Record<string, any>,
  token?: string,
  authMode: keyof typeof GRAPHQL_AUTH_MODE = "AWS_LAMBDA"
) => {
  let res: any;
  if (authMode === "AWS_LAMBDA") {
    res = await API.graphql({
      query,
      variables,
      authToken: token ?? READ_ONLY_TOKEN,
    });
  }
  if (authMode === "AMAZON_COGNITO_USER_POOLS") {
    res = await API.graphql({
      query,
      variables,
      authMode,
    });
  }
  return res;
};
