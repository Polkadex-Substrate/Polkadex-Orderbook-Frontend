import { APIClass, API } from "aws-amplify";

import * as queries from "../../../../graphql/queries";

import { UserAccount } from "@polkadex/orderbook-modules";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export const getAllMainLinkedAccounts = async (email: string, Api = API) => {
  try {
    const res: any = await sendQueryToAppSync({
      query: queries.listMainAccountsByEmail,
      variables: {
        email,
      },
      token: null,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      API: Api,
    });
    return res.data.listMainAccountsByEmail ?? { accounts: [] };
  } catch (error) {
    console.log("Error: getAllMainLinkedAccounts", error.message);
  }
};

export const getAllProxyAccounts = async (
  mainAccounts: [string],
  Api = API
): Promise<UserAccount[]> => {
  const promises = mainAccounts.map(async (main_account) => {
    const res: any = await sendQueryToAppSync({
      query: queries.findUserByMainAccount,
      variables: { main_account },
      API: Api,
    });
    const proxies = res.data.findUserByMainAccount.proxies;
    return { main_account, proxies };
  });
  const list = await Promise.all(promises);
  const accounts: UserAccount[] = [];
  list.forEach((item) => {
    item.proxies.forEach((proxy) => {
      accounts.push({ mainAddress: item.main_account, tradeAddress: proxy });
    });
  });
  return accounts;
};
