import { GraphQLClient } from "graphql-request";

import { defaultConfig } from "@polkadex/orderbook-config";
const client = new GraphQLClient(defaultConfig.cmsGraphqlUrl);

export default client;
