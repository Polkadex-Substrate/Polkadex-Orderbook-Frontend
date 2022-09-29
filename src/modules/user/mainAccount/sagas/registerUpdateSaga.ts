import { call, put, select } from "redux-saga/effects";

import { notificationPush } from "../../notificationHandler";
import { tradeAccountsFetch } from "../../tradeAccount";
import { RegisterMainAccountUpdateEvent, setMainAccountFetch } from "../actions";
import { selectCurrentMainAccount, selectExtensionWalletAccounts } from "../selectors";

import { sendError } from "@polkadex/orderbook-modules";

export function* registerMainAccountUpdateSaga(action: RegisterMainAccountUpdateEvent) {
  try {
    const data = action.payload;
    const injectedAccs = yield select(selectExtensionWalletAccounts);
    const selectedAccount = yield select(selectCurrentMainAccount);
    yield put(tradeAccountsFetch());
    if (data.main === selectedAccount.address) {
      const acc = injectedAccs.find((a) => a.address === data.main);
      yield put(setMainAccountFetch(acc));
    }
    yield put(
      notificationPush({
        message: { title: "Successfully Registered!" },
        type: "SuccessAlert",
        time: new Date().getTime(),
        hasConfetti: true,
      })
    );
  } catch (error) {
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        // extraOptions: {
        //   actionError: userError,
        // },
      })
    );
  }
}
