// TODO: Register call not working
import { put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { KeyringPair } from "@polkadot/keyring/types";

import { sendError } from "../../../";
import { userData, ProxyAccount } from "../../profile";
import { signUpData, signUpError, SignUpFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessageUsingMainAccount } from "@polkadex/web-helpers";

const registerUserOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* signUpSaga(action: SignUpFetch) {
  try {
    const { mnemonic, password, accountName } = action.payload;
    const { pair } = keyring.addUri(mnemonic, password, { name: accountName });
    console.log("Pair", pair);
    const proxyAddress = pair.address;
    registerAccount(pair, proxyAddress);
    const data: ProxyAccount = {
      accountName,
      password,
      address: pair.address,
      keyringPair: pair,
    };
    yield put(userData({ user: data }));
    yield put(signUpData());
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
  const signature = await signMessageUsingMainAccount(userKeyring, JSON.stringify(payload));
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
