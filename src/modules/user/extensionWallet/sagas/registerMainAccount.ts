import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";
import { stringToHex } from "@polkadot/util";

import * as mutations from "../../../../graphql/mutations";
import {
  notificationPush,
  removeTradeAccountFromBrowser,
  selectRangerApi,
  selectUserEmail,
  selectExtensionWalletAccounts,
  registerTradeAccountData,
} from "../../..";
import {
  registerMainAccountData,
  registerMainAccountError,
  RegisterMainAccountFetch,
} from "../actions";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

let tradeAddr = "";
type RegisterEmailData = { email: string; main_address: string };

export function* registerMainAccountSaga(action: RegisterMainAccountFetch) {
  try {
    const controllerWallets = yield select(selectExtensionWalletAccounts);
    const { mainAccount, tradeAddress, mnemonic } = action.payload;
    const selectedControllerAccount = controllerWallets.find(
      ({ account }) => account.address === mainAccount
    );
    tradeAddr = tradeAddress;
    const email = yield select(selectUserEmail);
    const api: ApiPromise = yield select(selectRangerApi);
    if (selectedControllerAccount.account?.address && email) {
      const { data, signature } = yield call(
        createSignedData,
        selectedControllerAccount,
        email
      );
      const res = yield call(() =>
        registerMainAccount(
          api,
          tradeAddress,
          selectedControllerAccount.signer,
          selectedControllerAccount.account?.address
        )
      );
      if (res.isSuccess) {
        yield put(registerMainAccountData());
        yield call(executeRegisterEmail, data, signature);
        yield put(
          registerTradeAccountData({
            mnemonic,
            account: {
              name: selectedControllerAccount.account.meta.name,
              address: selectedControllerAccount.account.address,
            },
          })
        );
      } else {
        throw new Error("Extrinsic failed");
      }
    } else {
      throw new Error("Email or address no valid");
    }
  } catch (error) {
    console.log("error:", error);
    yield put(removeTradeAccountFromBrowser({ address: tradeAddr }));
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
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
  return res;
};

const createSignedData = async (
  mainAccount: ExtensionAccount,
  email: string
): Promise<{ data: RegisterEmailData; signature: string }> => {
  const { signer, account } = mainAccount;
  const signRaw = signer?.signRaw;
  const main_address = account.address;
  if (signRaw) {
    const data: RegisterEmailData = { email, main_address };
    const { signature } = await signRaw({
      address: account.address,
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
