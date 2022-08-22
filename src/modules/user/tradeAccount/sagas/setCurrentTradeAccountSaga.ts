import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { SetCurrentTradeAccount, setCurrentTradeAccountData } from "../actions";
import * as queries from "../../../../graphql/queries";
import { getMainAddrFromQueryRes } from "../../auth/helper";
import { notificationPush } from "../../notificationHandler";
import {
  selectCurrentMainAccount,
  selectExtensionWalletAccounts,
  setMainAccountFetch,
} from "../../mainAccount";

export function* setCurrentTradeAccountSaga(action: SetCurrentTradeAccount) {
  try {
    const account = action.payload;
    const mainAccounts = yield select(selectExtensionWalletAccounts);
    yield put(setCurrentTradeAccountData(account));
    const mainAccAddr = yield call(findMainAccFromTradeAcc, account.address);
    if (mainAccAddr) {
      let mainAcc = mainAccounts.find((acc) => acc.address === mainAccAddr);
      mainAcc = mainAcc || { address: mainAccAddr, meta: { name: "" } };
      yield put(setMainAccountFetch(mainAcc));
    }
  } catch (error) {
    yield put(
      notificationPush({
        type: "ErrorAlert",
        message: {
          title: "Cant find main account",
          description: "Main accoun is not found, please register account",
        },
        time: new Date().getTime(),
      })
    );
  }
}

export const findMainAccFromTradeAcc = async (tradeAcc: string): Promise<string> => {
  const res: any = await API.graphql({
    query: queries.findUserByProxyAccount,
    variables: {
      proxy_account: tradeAcc,
    },
  });
  const queryResStr = res.data?.findUserByProxyAccount.items[0];
  return getMainAddrFromQueryRes(queryResStr);
};
