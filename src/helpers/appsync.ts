import { API } from "aws-amplify";

import { AUTH_TOKEN } from "@polkadex/web-constants";

export const sendQueryToAppSync = async (query: string, variables: any) => {
  const res = await API.graphql({
    query,
    variables,
    authToken: AUTH_TOKEN,
  });
  return res;
};
