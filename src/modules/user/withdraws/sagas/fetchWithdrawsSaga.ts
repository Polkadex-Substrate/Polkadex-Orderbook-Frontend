import { call, put, select } from "redux-saga/effects";

import { userTradesError } from "../../trades";
import { withdrawsData, WithdrawsFetch } from "..";

import { selectRangerApi, selectUserInfo, sendError } from "@polkadex/orderbook-modules";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import {
  createWithdrawPayload,
  placeWithdrawToEnclave,
} from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";

// TOOD: CHANGE TO USE ENCLAVE WS
export function* fetchWithdrawsSaga(action: WithdrawsFetch) {
  try {
    const { asset, amount } = action.payload;

    const { address, keyringPair, main_addr } = yield select(selectUserInfo);
    const nonce = getNonce();
    const api = yield select(selectRangerApi);
    if (address !== "" && keyringPair && api) {
      const payload = createWithdrawPayload(api, asset, amount, nonce);
      const signature = signPayload(api, keyringPair, payload);
      // TODO: change to use GraphQl
      // // const res = yield call(() =>
      // //   placeWithdrawToEnclave(enclaveRpcClient, payload, address, signature)
      // // );
      // console.log("withrawRes =>", res);
      yield put(withdrawsData());
    }
  } catch (error) {
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
