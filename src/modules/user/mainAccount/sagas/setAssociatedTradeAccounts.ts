import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { setAssociatedAccountsData, setMainAccountError } from "../actions";
import * as queries from "../../../../graphql/queries";
import { selectCurrentMainAccount } from "../selectors";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

export function* setAssociatedTradeAccountsSaga() {
  const { address } = yield select(selectCurrentMainAccount);
  try {
    const res: any = yield call(() =>
      API.graphql({
        query: queries.findUserByMainAccount,
        variables: { main_account: address },
      })
    );
    yield put(setAssociatedAccountsData(res?.data?.findUserByMainAccount?.proxies));
  } catch (error) {
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        extraOptions: {
          actionError: setMainAccountError,
        },
      })
    );
  }
}
