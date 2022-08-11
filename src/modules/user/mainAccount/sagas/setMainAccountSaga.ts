import { call, put } from "redux-saga/effects";
import { API } from "aws-amplify";

import { setMainAccountData, SetMainAccountFetch } from "../actions";
import * as queries from "../../../../graphql/queries";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

export function* setMainAccountSaga({ payload }: SetMainAccountFetch) {
  try {
    const { injector } = yield call(() => fetchUserDataAsync(payload));
    const user = {
      account: payload,
      name: payload.meta.name,
      address: payload.address,
      injector: injector,
    };
    const associatedTradeAccounts = yield call(fetchAssociatedTradeAccounts, payload.address);
    yield put(setMainAccountData({ user, tradeAccounts: associatedTradeAccounts }));
  } catch (error) {
    console.error(error);
    // yield put(
    //   sendError({
    //     error: error,
    //     processingType: "alert",
    //     // extraOptions: {
    //     //   actionError: userError,
    //     // },
    //   })
    // );
  }
}

async function fetchUserDataAsync(payload: SetMainAccountFetch["payload"]) {
  const { web3FromAddress } = await import("@polkadot/extension-dapp");
  const injector = await web3FromAddress(payload.address);
  return { injector };
}

async function fetchAssociatedTradeAccounts(main_account: string): Promise<string[] | null> {
  const res: any = await API.graphql({
    query: queries.findUserByMainAccount,
    variables: { main_account },
  });
  return res?.data?.findUserByMainAccount?.proxies;
}
