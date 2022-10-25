import { put } from "redux-saga/effects";
import { APIClass } from "aws-amplify";

import * as queries from "../../../../graphql/queries";

import {
  notificationPush,
  selectUsingAccount,
  UserAccount,
  userError,
  UserFetch,
} from "@polkadex/orderbook-modules";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";

// TODO: Remove sagas
export function* userSaga(action: UserFetch) {
  try {
    const { email } = action.payload;
  } catch (error) {
    console.log(error);
    yield put(userError(error));
    yield put(
      notificationPush({
        message: {
          title: "Error",
          description: "Cannot fetch user Accounts",
        },
        time: new Date().getTime(),
      })
    );
  }
}

export const getAllMainLinkedAccounts = async (email: string, API: APIClass) => {
  try {
    const res: any = await sendQueryToAppSync({
      query: queries.listMainAccountsByEmail,
      variables: {
        email,
      },
      token: null,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      API,
    });
    return res.data.listMainAccountsByEmail ?? { accounts: [] };
  } catch (error) {
    console.log("Error: getAllMainLinkedAccounts", error.message);
  }
};

export const getAllProxyAccounts = async (
  mainAccounts: [string],
  API: APIClass
): Promise<UserAccount[]> => {
  const promises = mainAccounts.map(async (main_account) => {
    const res: any = await sendQueryToAppSync({
      query: queries.findUserByMainAccount,
      variables: { main_account },
      API,
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

function* dispatchUseDefaultTradeAccount(allAccount: UserAccount[]) {
  const selectedAccount = yield select(selectUsingAccount);
  if (selectedAccount?.tradeAddress) return;
  const defaultTradeAddress = window.localStorage.getItem(
    LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
  );
  if (defaultTradeAddress.length === 0) return;
  const account = allAccount.find(({ tradeAddress }) => {
    return tradeAddress === defaultTradeAddress;
  });
  if (account) {
    yield put(userAccountSelectFetch(account));
  }
}
