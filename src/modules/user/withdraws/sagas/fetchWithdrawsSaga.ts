import { call, put, select } from "redux-saga/effects";

import * as mutations from "../../../../graphql/mutations";
import { userTradesError } from "../../trades";
import { withdrawsData, WithdrawsFetch } from "..";

import {
  notificationPush,
  UserAccount,
  selectRangerApi,
  selectTradeAccount,
  selectUsingAccount,
  sendError,
} from "@polkadex/orderbook-modules";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { createWithdrawPayload } from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export function* fetchWithdrawsSaga(action: WithdrawsFetch) {
  try {
    const { asset, amount } = action.payload;
    const currentAccount: UserAccount = yield select(selectUsingAccount);
    const address = currentAccount.tradeAddress;
    const keyringPair = yield select(selectTradeAccount(address));
    keyringPair.unlock("");
    const nonce = getNonce();
    const api = yield select(selectRangerApi);
    if (address !== "" && keyringPair && api) {
      const payload = createWithdrawPayload(api, asset, amount, nonce);
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
  return await sendQueryToAppSync(mutations.withdraw, { input: { payload } }, address);
};
