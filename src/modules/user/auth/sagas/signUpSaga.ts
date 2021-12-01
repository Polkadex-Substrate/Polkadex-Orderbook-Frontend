import { put, call } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { KeyringPair } from "@polkadot/keyring/types";

import { sendError, alertPush } from "../../../";
import { signUpData, signUpError, SignUpFetch } from "../actions";
import { polkadotWalletFetch } from "../../polkadotWallet";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";

const registerUserOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* signUpSaga(action: SignUpFetch) {
  try {
    const { mnemonic, password, accountName } = action.payload;
    const { pair } = keyring.addUri(mnemonic, password, { name: accountName });
    const proxyAddress = pair.address;
    registerAccount(pair, proxyAddress);
    // TODO: Check if registerAccount has been successful
    yield put(signUpData());
    yield put(
      alertPush({
        type: "Successful",
        message: {
          title: "Your Account has been created",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
      })
    );
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: signUpError,
        },
      })
    );
  }
}
const registerAccount = async (userKeyring: KeyringPair, proxyAddress: string) => {
  const payload = { main_account: proxyAddress, proxy_account: proxyAddress };
  const signature = await signMessage(userKeyring, JSON.stringify(payload));
  const data = {
    signature: {
      Sr25519: signature.trim().slice(2),
    },
    payload,
  };
  console.log(data);
  const res = await API.post(registerUserOption)("/register", data);
  console.log(res);
};
