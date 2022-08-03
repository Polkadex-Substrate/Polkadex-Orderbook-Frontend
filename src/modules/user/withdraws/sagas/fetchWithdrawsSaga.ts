import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import * as mutations from "../../../../graphql/mutations";
import { userTradesError } from "../../trades";
import { withdrawsData, WithdrawsFetch } from "..";

import { selectRangerApi, selectUserInfo, sendError } from "@polkadex/orderbook-modules";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { createWithdrawPayload } from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";

// TOOD: CHANGE TO USE ENCLAVE WS
export function* fetchWithdrawsSaga(action: WithdrawsFetch) {
  try {
    const { asset, amount } = action.payload;

    const { address, keyringPair } = yield select(selectUserInfo);
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
    variables: payload,
  });
  return res;
};
