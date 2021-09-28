import { call, put } from "redux-saga/effects";

import { API, RequestOptions } from "../../../../api";
import { sendError } from "../../../";
import { userData } from "../../profile";
import {
  signUpData,
  signUpError,
  SignUpFetch,
  signUpRequireVerification,
} from "../actions";
import keyring from "@polkadot/ui-keyring";

const signUpConfig: RequestOptions = {
  apiVersion: "barong",
};

const configUpdateOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: "sonic",
    headers: { "X-CSRF-Token": csrfToken },
  };
};

export function* signUpSaga(action: SignUpFetch) {
  try {
    const { mnemonic, password, username } = action.payload
    const { pair, json } = keyring.addUri(mnemonic, password, { name: username });
    const data = { username, password, address: pair.address, keyringPair: pair }
    yield put(userData({ user: data }));
    yield put(signUpData());
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: signUpError,
        },
      })
    );
  }
}
