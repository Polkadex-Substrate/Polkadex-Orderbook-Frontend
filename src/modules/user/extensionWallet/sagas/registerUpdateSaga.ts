import { put, select } from "redux-saga/effects";

import { tradeAccountsFetch } from "../../tradeWallet";
import { registerMainAccountError, RegisterMainAccountUpdateEvent } from "../actions";

import {
  notificationPush,
  sendError,
  userAccountSelectFetch,
  userProfileAccountPush,
  userProfileMainAccountPush,
} from "@polkadex/orderbook-modules";

export function* registerMainAccountUpdateSaga(action: RegisterMainAccountUpdateEvent) {
  try {
    const { proxy, main } = action.payload;
    // add new main account to users profile state
    yield put(userProfileMainAccountPush(main));
    // add new account pairs to the users profile state
    yield put(
      userProfileAccountPush({
        tradeAddress: proxy,
        mainAddress: main,
      })
    );
    // make newly created trade account as in use
    // When Extension wallet context will created, then update it to profile context userAccountSelectFetch
    yield put(
      userAccountSelectFetch({
        tradeAddress: proxy,
      })
    );
    yield put(
      notificationPush({
        type: "SuccessAlert",
        message: {
          title: "New Account Registered",
          description: "You have successfully registered a new controller account",
        },
        time: new Date().getTime(),
      })
    );
  } catch (error) {
    console.log("error:", error);
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        extraOptions: {
          actionError: registerMainAccountError,
        },
      })
    );
  }
}
