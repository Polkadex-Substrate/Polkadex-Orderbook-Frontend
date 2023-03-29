import { call, put, select } from "redux-saga/effects";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";

import { depositsData, DepositsFetch, depositsReset } from "../actions";
import { depositsError } from "..";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { notificationPush, sendError } from "@polkadex/orderbook-modules";
import { selectRangerIsReady } from "@polkadex/orderbook/modules/public/ranger";
import { UNIT_BN } from "@polkadex/web-constants";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

export function* fetchDepositSaga(action: DepositsFetch) {
  const nativeApiState = useNativeApi();
  try {
    const { asset, amount, mainAccount } = action.payload;
    const api = nativeApiState.api;
    const isApiReady = yield select(selectRangerIsReady);
    if (isApiReady && mainAccount?.account?.address !== "") {
      yield put(
        notificationPush({
          type: "InformationAlert",
          message: {
            title: "Processing Deposit",
            description:
              "Please wait while the deposit is processed and the block is finalized. This may take a few mins.",
          },
          time: new Date().getTime(),
        })
      );
      const res = yield call(depositToEnclave, api, mainAccount, asset, amount);
      if (res.isSuccess) {
        yield put(depositsData());
        yield put(
          notificationPush({
            type: "SuccessAlert",
            message: {
              title: "Deposit Successful",
              description:
                "Congratulations! You have successfully deposited assets to your trading account.",
            },
            time: new Date().getTime(),
            hasConfetti: true,
          })
        );
        yield put(depositsReset());
      } else {
        throw new Error("Deposit failed");
      }
    }
  } catch (error) {
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
  account: ExtensionAccount,
  asset: Record<string, string | null>,
  amount: string | number
): Promise<ExtrinsicResult> {
  const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
  const ext = api.tx.ocex.deposit(asset, amountStr);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer: account.signer },
    account?.account.address,
    true
  );
  return res;
}
