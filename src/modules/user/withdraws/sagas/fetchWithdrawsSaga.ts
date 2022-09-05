import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";
import keyring from "@polkadot/ui-keyring";
import BigNumber from "bignumber.js";

import * as mutations from "../../../../graphql/mutations";
import { userTradesError } from "../../trades";
import { withdrawsData, WithdrawsFetch } from "..";

import {
  notificationPush,
  selectCurrentTradeAccount,
  selectRangerApi,
  sendError,
} from "@polkadex/orderbook-modules";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { createWithdrawPayload } from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { UNIT_BN } from "@polkadex/web-constants";

// TOOD: CHANGE TO USE ENCLAVE WS
export function* fetchWithdrawsSaga(action: WithdrawsFetch) {
  try {
    const { asset, amount } = action.payload;
    const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
    const { address } = yield select(selectCurrentTradeAccount);
    const keyringPair = keyring.getPair(address);
    keyringPair.unlock("");
    const nonce = getNonce();
    const api = yield select(selectRangerApi);
    if (address !== "" && keyringPair && api) {
      const payload = createWithdrawPayload(api, asset, amountStr, nonce);
      const signature = signPayload(api, keyringPair, payload);
      const res = yield call(() => executeWithdraw([address, payload, signature], address));
      console.info("withdraw res: ", res);
      yield put(withdrawsData());
      yield put(
        notificationPush({
          type: "SuccessAlert",
          message: {
            title: "Withdraw Successful",
            description: "Your withdraw has been processed.",
          },
          time: new Date().getTime(),
        })
      );
    }
  } catch (error) {
    yield put(withdrawsData());
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

const executeWithdraw = async (withdrawPayload, address) => {
  const payload = JSON.stringify({ Withdraw: withdrawPayload });
  const res = await API.graphql({
    query: mutations.withdraw,
    variables: { input: { payload } },
    authToken: address,
  });
  return res;
};
