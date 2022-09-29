import { Auth } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import {
  changePasswordData,
  changePasswordError,
  ChangePasswordFetch,
  sendError,
} from "@polkadex/orderbook-modules";

export function* changePasswordSaga(action: ChangePasswordFetch) {
  const { oldPassword, newPassword } = action.payload;
  try {
    const data = yield call(changePassword, oldPassword, newPassword);
    console.log(data);
    yield put(changePasswordData());
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: changePasswordError,
        },
      })
    );
  }
}

const changePassword = async (oldPassword: string, newPassword: string) => {
  const user = await Auth.currentAuthenticatedUser();
  const data = await Auth.changePassword(user, oldPassword, newPassword);
  return data;
};
