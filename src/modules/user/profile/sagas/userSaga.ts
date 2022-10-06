import { call, put } from "redux-saga/effects";

import * as queries from "../../../../graphql/queries";

import {
  notificationPush,
  UserAccount,
  userData,
  userError,
  UserFetch,
} from "@polkadex/orderbook-modules";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export function* userSaga(action: UserFetch) {
  try {
    const { email } = action.payload;
    if (email) {
      const { accounts } = yield call(getAllMainLinkedAccounts, email);
      const userAccounts = yield call(getAllProxyAccounts, accounts);
      yield put(userData({ mainAccounts: accounts, userAccounts }));
    } else {
      throw new Error("no email specified");
    }
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

const getAllMainLinkedAccounts = async (email: string) => {
  const res: any = await sendQueryToAppSync(
    queries.listMainAccountsByEmail,
    {
      email,
    },
    null,
    "AMAZON_COGNITO_USER_POOLS"
  );
  console.log("res", res);
  return res.data.listMainAccountsByEmail;
};

const getAllProxyAccounts = async (mainAccounts: [string]): Promise<UserAccount[]> => {
  const promises = mainAccounts.map(async (main_account) => {
    const res: any = await sendQueryToAppSync(queries.findUserByMainAccount, { main_account });
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
