import { call, put } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";
import { API } from "aws-amplify";

import * as queries from "../../../../graphql/queries";
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
const getMainAddrFromUserByProxyAccountRes = (s: string) => {
  /*
    eg of "s" := "{main_account=proxy-esoaqNF2F77yp1q5PxUdghRiCNnbHHLVkhmqh7E6pBoBMX4Jx, item_type=eso5pshyDhzejRpiVmq7qwCnFZGXxDZY28XSbMVpbC9Junpaw}"
    here, item_type is the main_account address.
  */
  const n = s.length;
  // slice "{ }" values from the ends
  s = s.slice(2, n - 1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_a, b] = s.split(",");
  const main_addr = b.split("=")[1];
  return main_addr;
};
