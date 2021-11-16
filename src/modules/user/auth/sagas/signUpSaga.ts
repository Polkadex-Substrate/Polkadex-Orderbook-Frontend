import { call, put, select } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../../";
import { ProxyAccount, userData } from "../../profile";
import { signUpData, signUpError, SignUpFetch } from "../actions";
import { InjectedAccount } from "../../polkadotWallet";

import { signMessageUsingMainAccount } from "src/helpers/polkadex/signMessage";
import { RequestOptions } from "src/api/requestBuilder";
import { API } from "src/api";

const registerUserOption: RequestOptions = {
  apiVersion: 'polkadex',
};

export  function* signUpSaga(action: SignUpFetch) {
  try {
    const { mnemonic, password, username, mainAccount } = action.payload;
    const { pair } = keyring.addUri(mnemonic, password, { name: username });
    const proxyAddress = pair.address;
    registerAccount(mainAccount, proxyAddress);
    const data: ProxyAccount = {
      username,
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
const registerAccount = async (mainAccount: InjectedAccount, proxyAddress: string) => {
  const payload = { main_account: mainAccount.address, proxy_account: proxyAddress };
  const signature = await signMessageUsingMainAccount(mainAccount, JSON.stringify(payload));
  const data = { signature: {
    Sr25519: signature
  }, payload };

 const res = await API.post(registerUserOption)('/register', data)
  
};
