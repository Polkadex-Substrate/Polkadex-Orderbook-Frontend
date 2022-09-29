import { call, put } from "redux-saga/effects";
import { Auth } from "aws-amplify";

import { codeVerifyData, codeVerifyError, CodeVerifyFetch } from "../actions";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

export function* codeVerificationSaga(action: CodeVerifyFetch) {
  try {
    const { email, code } = action.payload;
    const res = yield call(verifyCode, email, code);
    yield put(codeVerifyData());
  } catch (error) {
    console.error(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: codeVerifyError,
        },
      })
    );
  }
}

async function verifyCode(email: string, code: string) {
  const res = await Auth.confirmSignUp(email, code);
  return res;
}
