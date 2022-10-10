import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import keyring from "@polkadot/ui-keyring";
import { stringToHex } from "@polkadot/util";

import * as mutations from "../../../../graphql/mutations";
import {
  MainAccount,
  notificationPush,
  selectExtensionWalletAccounts,
  selectRangerApi,
  selectUserIdentity,
} from "../../..";
import {
  registerMainAccountData,
  registerMainAccountError,
  RegisterMainAccountFetch,
} from "../actions";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { setIsTradeAccountPassworded } from "@polkadex/orderbook/helpers/localStorageHelpers";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

let tradeAddr = "";
type RegisterEmailData = { email: string; main_address: string };

export function* registerMainAccountSaga(action: RegisterMainAccountFetch) {
  try {
    const { mainAccount, tradeAddress, password } = action.payload;
    tradeAddr = tradeAddress;
    const api = yield select(selectRangerApi);
    yield select(selectExtensionWalletAccounts);
    const email = yield select(selectUserIdentity);
    if (mainAccount.address && email) {
      yield put(
        notificationPush({
          message: {
            title: "Registering account...",
            description:
              "Please sign the transaction and wait for block finalization. This may take a few minutes",
          },
          type: "LoadingAlert",
          time: new Date().getTime(),
        })
      );
      const { data, signature } = yield call(createSignedData, mainAccount, email);
      const res = yield call(() =>
        registerMainAccount(api, tradeAddress, mainAccount.injector, mainAccount.address)
      );
      if (res.isSuccess) {
        yield put(registerMainAccountData());
        yield call(executeRegisterEmail, data, signature);
        setIsTradeAccountPassworded(tradeAddress, password?.length > 0);
      } else {
        keyring.forgetAccount(tradeAddr);
      }
    }
  } catch (error) {
    console.log("error:", error);
    keyring.forgetAccount(tradeAddr);
    yield put(registerMainAccountError());
    yield put(
      notificationPush({
        message: { title: "Cannot Register Account!", description: error.message },
        type: "ErrorAlert",
        time: new Date().getTime(),
      })
    );
  }
}

export const registerMainAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress, true);
  return res;
};

const createSignedData = async (
  mainAccount: MainAccount,
  email: string
): Promise<{ data: RegisterEmailData; signature: string }> => {
  const signRaw = mainAccount.injector?.signer?.signRaw;
  const main_address = mainAccount.address;
  if (signRaw) {
    const data: RegisterEmailData = { email, main_address };
    const { signature } = await signRaw({
      address: main_address,
      data: stringToHex(JSON.stringify(data)),
      type: "bytes",
    });
    return { data, signature };
  } else throw new Error("Cannot get Signer");
};

const executeRegisterEmail = async (data: RegisterEmailData, signature: string) => {
  const payloadStr = JSON.stringify({ RegisterUser: { data, signature } });
  const res = await sendQueryToAppSync(
    mutations.register_user,
    {
      input: { payload: payloadStr },
    },
    null,
    "AMAZON_COGNITO_USER_POOLS"
  );
  return res;
};
