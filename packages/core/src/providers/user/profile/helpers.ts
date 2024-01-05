import {API} from "aws-amplify";
import * as T from "@orderbook/core/providers/user/profile/types";
import {sendQueryToAppSync} from "@orderbook/core/helpers";
import * as queries from "@orderbook/core/graphql/queries";

import {UserAddressTuple} from "./types";

export const getMainAddresssLinkedToTradingAccount = (
  tradeaddress: string,
  userAccounts: UserAddressTuple[]
) => {
  const account = userAccounts?.find(
    ({ tradeAddress }) =>
      tradeAddress?.toLowerCase() === tradeaddress?.toLowerCase()
  );
  return account ? account.mainAddress : "";
};

export const transformAddress = (address: string, size = 8) => {
  const firstPart = address?.slice(0, size);
  const lastPart = address?.slice(address?.length - size);

  return firstPart && lastPart && `${firstPart ?? ""}...${lastPart ?? ""}`;
};

// fetch th
export const getProxiesLinkedToMain = async (mainAccount: string) => {
  try {
    const res = await sendQueryToAppSync({
      query: queries.findUserByMainAccount,
      variables: { main_account: mainAccount },
      API,
    });
    const proxies = res?.data?.findUserByMainAccount?.proxies ?? [];
    return { main_account: mainAccount, proxies };
  } catch (error) {
    return { main_account: mainAccount, proxies: [] };
  }
};

export const getAllProxyAccounts = async (
  mainAccounts: string[]
): Promise<T.UserAddressTuple[]> => {
  const promises = mainAccounts?.map(getProxiesLinkedToMain);
  const list = await Promise.all(promises);
  const accounts: T.UserAddressTuple[] = [];
  list.forEach((item) => {
    item.proxies.forEach((proxy: string) => {
      accounts.push({
        mainAddress: item.main_account,
        tradeAddress: proxy,
      });
    });
  });
  return accounts;
};

export const getMainAccountLinkedToProxy = async (proxy: string) => {
  const res = await sendQueryToAppSync({
    query: queries.findUserByProxyAccount,
    variables: { proxy_account: proxy },
    API,
  });
  return res?.data?.findUserByProxyAccount?.items?.[0]?.range_key ?? null;
};
