import { call, put, select } from "redux-saga/effects";

import * as queries from "../../../../graphql/queries";

import {
  notificationPush,
  selectUsingAccount,
  UserAccount,
  userAccountSelectFetch,
  userData,
  userError,
  UserFetch,
} from "@polkadex/orderbook-modules";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";

export function* userSaga(action: UserFetch) {
  try {
    const { email } = action.payload;
    if (email) {
      const { accounts } = yield call(getAllMainLinkedAccounts, email);
      const userAccounts: UserAccount[] = yield call(getAllProxyAccounts, accounts);
      yield put(userData({ mainAccounts: accounts, userAccounts }));
      yield call(dispatchUseDefaultTradeAccount, userAccounts);
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
  return res.data.listMainAccountsByEmail ?? { accounts: [] };
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

function* dispatchUseDefaultTradeAccount(allAccount: UserAccount[]) {
  const selectedAccount = yield select(selectUsingAccount);
  if (selectedAccount?.tradeAddress) return;
  const defaultTradeAddress = window.localStorage.getItem(
    LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
  );
  if (defaultTradeAddress.length === 0) return;
  console.log(allAccount);
  console.log(defaultTradeAddress);
  const account = allAccount.find(({ tradeAddress }) => {
    return tradeAddress === defaultTradeAddress;
  });
  console.log(account);
  if (account) {
    yield put(userAccountSelectFetch(account));
  }
}
