import { call, put } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";

import { sendError } from "../../../";
import { ProxyAccount, userData } from "../../profile";
import { signInData, signInError, SignInFetch } from "../actions";

export function* signInSaga(action: SignInFetch) {
  try {
    const { address, password } = action.payload;
    const user: ProxyAccount = yield call(() => getProxyKeyring(address, password));
    yield put(userData({ user }));
    yield put(signInData());
  } catch (error) {
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        extraOptions: {
          actionError: signInError,
        },
      })
    );
  }
}
const getProxyKeyring = async (address: string, password: string): Promise<ProxyAccount> => {
  try {
    const userPair = keyring.getPair(address);
    const account = keyring.getAccount(address);
    userPair.unlock(password);
    return {
      accountName: account.meta.name,
      address: userPair.address,
      password,
      keyringPair: userPair,
    };
  } catch (e) {
    throw new Error(e);
  }
};
