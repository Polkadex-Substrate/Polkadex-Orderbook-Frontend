import { API } from "aws-amplify";

import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

export const sendQueryToAppSync = async (query: string, variables?: Record<string,any> , token?: string) => {
  const res = await API.graphql({
    query,
    variables,
    authToken: token ?? READ_ONLY_TOKEN,
  });
  return res;
};
