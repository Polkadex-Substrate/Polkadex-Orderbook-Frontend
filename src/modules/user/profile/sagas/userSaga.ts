import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { API, RequestOptions } from "../../../../api";
import { userData, userError, UserFetch } from "../actions";
import { abilitiesFetch } from "../../abilities";

const userOptions: RequestOptions = {
  apiVersion: "barong",
};

export function* userSaga(action: UserFetch) {
  try {
    const userAccount = yield call(() => getKeyringAllAccounts());
    const user = { username: userAccount.meta.name, address: userAccount.address };
    // yield put(abilitiesFetch());
    yield put(userData({ user }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userError,
        },
      })
    );
  }
}

const getKeyringAllAccounts = async () => {
  try {
    const { keyring } = await import("@polkadot/ui-keyring");
    const userPair = keyring.getAccounts()[0];
    return userPair;
  } catch (e) {
    throw new Error(e);
  }
};
