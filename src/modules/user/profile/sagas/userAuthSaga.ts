// TODO : Fix saga
import { all, call, put, select } from "redux-saga/effects";

import { notificationPush, sendError, selectUserInfo, selectUserAccounts } from "../../../";
import {
  userAccountSelectFetch,
  userAuthError,
  userData,
  userSetAvatar,
  userSetDefaultTradeAccount,
} from "../actions";

import { getAllMainLinkedAccounts, getAllProxyAccounts } from "./userSaga";

import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";

export function* userAuthSaga() {
  const { userExists, isConfirmed, email } = yield select(selectUserInfo);
  const userAccounts = yield select(selectUserAccounts);
  const defaultTradeAddress = window.localStorage.getItem(
    LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
  );

  try {
    if (!userAccounts?.length) {
      const { accounts } = yield call(() => getAllMainLinkedAccounts(email));
      const userAccounts = yield call(() => getAllProxyAccounts(accounts));
      yield put(userData({ mainAccounts: accounts, userAccounts }));
    }

    if (defaultTradeAddress?.length) {
      yield all([
        put(userSetDefaultTradeAccount(defaultTradeAddress)),
        put(userAccountSelectFetch({ tradeAddress: defaultTradeAddress })),
        put(userSetAvatar()),
      ]);
    }

    if (!isConfirmed && userExists) {
      yield put(
        notificationPush({
          type: "AttentionAlert",
          message: {
            title: "Please confirm your email.",
            description: "Sign in again and confirm your email.",
          },
          time: new Date().getTime(),
        })
      );
    }
  } catch (error) {
    yield put(
      sendError({
        error: `User auth error:${error.message}`,
        processingType: "alert",
        extraOptions: {
          actionError: userAuthError,
        },
      })
    );
  }
}
