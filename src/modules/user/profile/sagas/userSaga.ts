import { API } from "aws-amplify";

import * as queries from "../../../../graphql/queries";

import { UserAccount } from "@polkadex/orderbook-modules";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export const getAllMainLinkedAccounts = async (
  email: string,
  Api = API
): Promise<{ accounts: string[] }> => {
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
    const accounts = res.data?.listMainAccountsByEmail?.accounts ?? [];
    return { accounts };
  } catch (error) {
    console.log("Error: getAllMainLinkedAccounts", error.errors);
    return { accounts: [] };
  }
};

export const getAllProxyAccounts = async (
  mainAccounts: [string],
  Api = API
): Promise<UserAccount[]> => {
  const promises = mainAccounts.map(async (main_account) => {
    try {
      const res: any = await sendQueryToAppSync({
        query: queries.findUserByMainAccount,
        variables: { main_account },
        API: Api,
      });
      const proxies = res.data?.findUserByMainAccount?.proxies ?? [];
      return { main_account, proxies };
    } catch (error) {
      console.log("Error: getAllProxyAccounts", error.errors);
      return { main_account, proxies: [] };
    }
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
