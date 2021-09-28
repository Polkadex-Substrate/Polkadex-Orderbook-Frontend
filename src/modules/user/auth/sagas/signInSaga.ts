import { call, put } from "redux-saga/effects";
import { keyring } from '@polkadot/ui-keyring';
import { API, proxyRestUrl, RequestOptions } from "../../../../api";
import { sendError } from "../../../";
import { User, userData, UserSkeleton } from "../../profile";
import {
  signInData,
  signInError,
  SignInFetch,
  signInRequire2FA,
  signUpRequireVerification,
} from "../actions";
import axios from "axios";

const sessionsConfig: RequestOptions = {
  apiVersion: "barong",
};

export function* signInSaga(action: SignInFetch) {
  try {
    const polkadexWorker = (window as any).polkadexWorker
    const { address, password } = action.payload
    const user: User = yield call(() => getKeyringPairFromAddress(address, password));
    const authResponse = yield call(() => polkadexWorker.authenticate(user));
    console.log({ authResponse })
    yield put(userData({ user }));
    process.browser && localStorage.setItem("csrfToken", user.csrf_token);
    yield put(signInData());
  } catch (error) {
    if (error.code === 401 && error.message.indexOf("identity.session.missing_otp") > -1) {
      yield put(signInRequire2FA({ require2fa: true }));
      yield put(signInData());
    } else {
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
}

const getKeyringPairFromAddress = async (address: string, password: string): Promise<User> => {
  try {
    const userPair = keyring.getPair(address)
    const account = keyring.getAccount(address)
    console.log(userPair.address, userPair.isLocked);
    return {
      username: account.meta.name,
      address: userPair.address,
      password,
      keyringPair: userPair
    }
  } catch (e) {
    throw new Error(e);
  }
};
