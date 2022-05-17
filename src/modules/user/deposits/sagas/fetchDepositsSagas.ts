import { call, put, select } from "redux-saga/effects";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";

import { depositsData, DepositsFetch } from "../actions";
import { depositsError } from "..";
import { selectMainAccount } from "../../mainAccount";

import { signAndSendExtrinsic } from "@polkadex/web-helpers";
import { sendError } from "@polkadex/orderbook-modules";
import {
  selectRangerApi,
  selectRangerIsReady,
} from "@polkadex/orderbook/modules/public/ranger";
import { UNIT_BN } from "@polkadex/web-constants";

export function* fetchDepositsSaga(action: DepositsFetch) {
  try {
    const { baseAsset, quoteAsset, isBase, amount } = action.payload;
    const mainUser = yield select(selectMainAccount);
    const api = yield select(selectRangerApi);
    const isApiReady = yield select(selectRangerIsReady);
    if (isApiReady && mainUser.address !== "") {
      const res = yield call(
        depositToEnclave,
        api,
        mainUser,
        baseAsset,
        quoteAsset,
        amount,
        isBase
      );
      if (res.isSuccess) {
        yield put(depositsData());
      } else {
        throw new Error("Depost fetch failed");
      }
    }
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: depositsError,
        },
      })
    );
  }
}

async function depositToEnclave(
  api: ApiPromise,
  account: any,
  baseAsset: Record<string, string | null>,
  quoteAsset: Record<string, string | null>,
  amount: string | number,
  isBase: boolean
) {
  const ext = api.tx.ocex.deposit(
    baseAsset,
    quoteAsset,
    new BigNumber(amount).multipliedBy(UNIT_BN),
    isBase
  );
  await signAndSendExtrinsic(api, ext, account.injector, account.address, true);
}
