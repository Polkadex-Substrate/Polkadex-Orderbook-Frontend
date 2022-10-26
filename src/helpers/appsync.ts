import { APIClass, withSSRContext, API as ampliyfyApi } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import { AmplifyClass } from "@aws-amplify/core";

import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

type Props = {
  query: string;
  variables?: Record<string, any>;
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
