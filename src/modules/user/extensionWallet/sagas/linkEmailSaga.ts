// TODO - Code Cleaning

import { call, fork, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import { stringToHex } from "@polkadot/util";

import * as mutations from "../../../../graphql/mutations";
import { userProfileMainAccountPush, selectMainAccount } from "../../..";
import { RegisterMainAccountLinkEmailFetch } from "../actions";

import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

type LinkEmailData = { email: string; main_address: string };

export function* linkEmailSaga(action: RegisterMainAccountLinkEmailFetch) {
  const nativeApiState = useNativeApi();
  let data: LinkEmailData, signature: string;
  const { mainAccount } = action.payload;
  try {
    const { email } = useAuth();
    const selectedControllerAccount = yield select(selectMainAccount(mainAccount));
    const api: ApiPromise = nativeApiState.api;

    const hasAddressAndEmail =
      !!selectedControllerAccount.account?.address?.length && !!email?.length;

    if (hasAddressAndEmail) {
      const signedData = yield call(createSignedData, selectedControllerAccount, email);
      data = signedData.data;
      signature = signedData.signature;
      yield call(executeRegisterEmail, data, signature);

      yield put(userProfileMainAccountPush(mainAccount));
    } else {
      throw new Error("Email or address is not valid");
    }
  } catch (error) {
    console.log("error in registration:", error.message);
  }
}

const createSignedData = async (
  mainAccount: ExtensionAccount,
  email: string
): Promise<{ data: LinkEmailData; signature: string }> => {
  const { signer, account } = mainAccount;
  const signRaw = signer?.signRaw;
  const main_address = account.address;
  if (signRaw) {
    const data: LinkEmailData = { email, main_address };
    const { signature } = await signRaw({
      address: account.address,
      data: stringToHex(JSON.stringify(data)),
      type: "bytes",
    });
    return { data, signature };
  } else throw new Error("Cannot get Signer");
};

const executeRegisterEmail = async (data: LinkEmailData, signature: string) => {
  const payloadStr = JSON.stringify({ RegisterUser: { data, signature } });
  const res = await sendQueryToAppSync({
    query: mutations.register_user,
    variables: {
      input: { payload: payloadStr },
    },
    token: null,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  return res;
};
