import { call, delay, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";

import { MainAccount, selectCurrentMainAccount } from "../../mainAccount";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import {
  notificationPush,
  sendError,
  withdrawClaimReset,
  withdrawsClaimData,
  WithdrawsClaimFetch,
  withdrawsError,
} from "@polkadex/orderbook-modules";
import {
  selectRangerApi,
  selectRangerIsReady,
} from "@polkadex/orderbook/modules/public/ranger";

export function* fetchDepositSaga(action: WithdrawsClaimFetch) {
  try {
    const { sid } = action.payload;
    const api = yield select(selectRangerApi);
    const curreMainAcc = yield select(selectCurrentMainAccount);
    const isApiReady = yield select(selectRangerIsReady);
    if (isApiReady && curreMainAcc.address !== "") {
      yield put(
        notificationPush({
          type: "InformationAlert",
          message: {
            title: "Processing Claim Withdraw",
            description:
              "Please wait while the withdraw is processed and the block is finalized. This may take a few mins.",
          },
          time: new Date().getTime(),
        })
      );
      const res = yield call(claimWithdrawal, api, curreMainAcc, sid);
      if (res.isSuccess) {
        yield put(withdrawsClaimData({ sid }));
        yield put(
          notificationPush({
            type: "SuccessAlert",
            message: {
              title: "Deposit Successful",
              description:
                "Congratulations! You have successfully deposited assets to your proxy account.",
            },
            time: new Date().getTime(),
            hasConfetti: true,
          })
        );
        yield put(withdrawClaimReset());
      } else {
        throw new Error("Claim Withdraw failed");
      }
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: withdrawsError,
        },
      })
    );
  }
}

async function claimWithdrawal(
  api: ApiPromise,
  account: MainAccount,
  sid: number
): Promise<ExtrinsicResult> {
  const ext = api.tx.ocex.withdraw(sid);
  const res = await signAndSendExtrinsic(api, ext, account.injector, account.address, true);
  return res;
}
