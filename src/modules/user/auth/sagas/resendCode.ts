import { call, put } from "redux-saga/effects";
import { Auth } from "aws-amplify";

import { resendCodeData, resendCodeError, ResendCodeFetch } from "../actions";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

export function* resendCodeSaga(action: ResendCodeFetch) {
  try {
    const { email } = action.payload;
    const res = yield call(resendCode, email);
    yield put(resendCodeData());
  } catch (error) {
    console.error(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: resendCodeError,
        },
      })
    );
  }
}

async function resendCode(email: string) {
  const res = await Auth.resendSignUp(email);
  return res;
}
