// TODO - Code Cleaning

import { call, put, select } from "redux-saga/effects";
import { stringToHex } from "@polkadot/util";

import * as mutations from "../../../../graphql/mutations";
import { selectMainAccount, selectUserEmail, userProfileMainAccountPush } from "../../..";
import { RegisterMainAccountLinkEmailFetch } from "../actions";

import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

interface MultiSig {
  Ed25519?: string;
  Sr25519?: string;
  Ecdsa?: string;
}

export function* linkEmailSaga(action: RegisterMainAccountLinkEmailFetch) {
  const { mainAccount } = action.payload;
  try {
    const selectedControllerAccount = yield select(selectMainAccount(mainAccount));
    const email = yield select(selectUserEmail);
    const hasAddressAndEmail =
      !!selectedControllerAccount.account?.address?.length && !!email?.length;

    if (hasAddressAndEmail) {
      const { signature } = yield call(createSignedData, selectedControllerAccount, email);
      console.log("signature", signature);
      yield call(
        executeRegisterEmail,
        email,
        selectedControllerAccount.account.address,
        signature
      );

      yield put(userProfileMainAccountPush(mainAccount));
    } else {
      throw new Error("Email or address is not valid");
    }
  } catch (error) {
    console.log("error in registration:", error);
  }
}

const createSignedData = async (
  mainAccount: ExtensionAccount,
  email: string
): Promise<{ signature: MultiSig }> => {
  const { signer, account } = mainAccount;
  const signRaw = signer?.signRaw;
  if (signRaw) {
    const { signature } = await signRaw({
      address: account.address,
      data: stringToHex(email),
      type: "bytes",
    });
    // remove 0x prefix
    const trimmedSignature = signature.slice(2);
    let multiSig: MultiSig;
    console.log("raw signature", signature);
    switch (account.type) {
      case "ed25519": {
        //   prepend number 0 to signify sr25519
        multiSig = { Ed25519: trimmedSignature };
        break;
      }
      case "sr25519": {
        //   prepend number 1 to signify ed25519
        multiSig = { Sr25519: trimmedSignature };
        break;
      }
      case "ecdsa": {
        //   prepend number 2 to signify ecdsa
        multiSig = { Ecdsa: trimmedSignature };
        break;
      }
      default: {
        throw new Error("Invalid signature type");
        break;
      }
    }
    return { signature: multiSig };
  } else throw new Error("Cannot get Signer");
};

const executeRegisterEmail = async (
  email: string,
  main_address: string,
  multisignature: string
) => {
  const payloadStr = JSON.stringify({ RegisterUser: [email, main_address, multisignature] });
  console.log("email register payload string:", payloadStr);
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
