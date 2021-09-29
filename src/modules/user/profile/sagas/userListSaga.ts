import { call, put } from "redux-saga/effects";

import { userListData, UserSkeleton } from "..";
import { sendError } from "../../../";
import { userError, UserListFetch } from "../actions";

export function* userListSaga(action: UserListFetch) {
  try {
    console.log("in side user saga");
    const userList: Array<UserSkeleton> = yield call(() => getKeyringAllAccounts());
    yield put(userListData({ userList }));
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

const getKeyringAllAccounts = async (): Promise<Array<UserSkeleton>> => {
  try {
    const { keyring } = await import("@polkadot/ui-keyring");
    const users = keyring.getAccounts().map((elem) => {
      return { address: elem.address, username: elem.meta.name };
    });
    return users;
  } catch (e) {
    throw new Error(e);
  }
};
