import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";
import keyring from "@polkadot/ui-keyring";

import * as mutations from "../../../../graphql/mutations";
import { userTradesError } from "../../trades";
import { withdrawsData, WithdrawsFetch } from "..";

import {
  selectCurrentTradeAccount,
  selectRangerApi,
  sendError,
} from "@polkadex/orderbook-modules";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { createWithdrawPayload } from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";

// TOOD: CHANGE TO USE ENCLAVE WS
export function* fetchWithdrawsSaga(action: WithdrawsFetch) {
  try {
    const { asset, amount } = action.payload;

    const { address } = yield select(selectCurrentTradeAccount);
    const keyringPair = keyring.getPair(address);
    const nonce = getNonce();
    const api = yield select(selectRangerApi);
    if (address !== "" && keyringPair && api) {
      const payload = createWithdrawPayload(api, asset, amount, nonce);
      const signature = signPayload(api, keyringPair, payload);
      const res = yield call(() => executeWithdraw([address, payload, signature]));
      console.info("withdraw res: ", res);
      yield put(withdrawsData());
    }
  } catch (error) {
    console.error("withdraw error: ", error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userTradesError,
        },
      })
    );
  }
}

const executeWithdraw = async (withdrawPayload) => {
  const payload = { Withdraw: withdrawPayload };
  const res = await API.graphql({
    query: mutations.withdraw,
    variables: { input: { payload } },
  });
  return res;
};
