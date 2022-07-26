import { call, put } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";
import { API } from "aws-amplify";

import * as queries from "../../../../graphql/queries";
import { sendError } from "../../../";
import { ProxyAccount, userData } from "../../profile";
import { signInData, signInError, SignInFetch } from "../actions";
import { getMainAddrFromUserByProxyAccountRes } from "../helper";

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
    const res: any = await API.graphql({
      query: queries.findUserByProxyAccount,
      variables: { proxy_account: address },
    });
    if (res.data?.findUserByProxyAccount.items.length === 0) {
      throw new Error("This proxy account has not been registered yet!");
    }
    const queryResStr = res.data?.findUserByProxyAccount.items[0];
    const main_addr = getMainAddrFromUserByProxyAccountRes(queryResStr);
    return {
      main_addr: main_addr,
      accountName: account.meta.name,
      address: userPair.address,
      keyringPair: userPair,
    };
  } catch (e) {
    throw new Error(e);
  }
};
