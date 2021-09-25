import { call, put } from "redux-saga/effects";
import { blake2AsHex, mnemonicGenerate } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";
import { API, barongTimeStamp, proxyAuthUrl, RequestOptions } from "../../../../api";
import { sendError } from "../../../";
import { User, userData } from "../../profile";
import Axios from 'axios'
import { stringToU8a, u8aToHex, stringToHex } from "@polkadot/util"

import {
  signInData,
  signInError,
  SignInFetch,
  signInRequire2FA,
  signUpRequireVerification,
} from "../actions";
import { AuthPayload } from "../types";

const sessionsConfig: RequestOptions = {
  apiVersion: "barong",
};

export function* signInSaga() {
  try {
    const user = yield call(() => getUserFromPolkadotWallet());
    const resp = yield call(() => getCookieAndCsrfFromProxy(user));
    console.log(resp)
    yield put(userData({ user }));
    process.browser && localStorage.setItem("csrfToken", user.csrf_token);

    yield put(signInData());
  } catch (error) {
    if (error.code === 401 && error.message.indexOf("identity.session.missing_otp") > -1) {
      yield put(signInRequire2FA({ require2fa: true }));
      yield put(signInData());
    } else {
      yield put(
        sendError({
          error: error,
          processingType: "alert",
          extraOptions: {
            actionError: signInError,
          },
        })
      );
    }
  }
}
const getUserFromPolkadotWallet = async (): Promise<User> => {
  const { web3Accounts, web3Enable, web3FromAddress, web3FromSource } = await import('@polkadot/extension-dapp');
  // this call fires up the authorization popup
  const extensions = await web3Enable("http://localhost:3000");
  if (extensions.length === 0) {
    // no extension installed, or the user did not accept the authorization
    // in this case we should inform the use and give a link to the extension
    throw new Error("Polkadot.js not detected")
  }
  const allAccounts = await web3Accounts();
  const account = allAccounts[0]
  return {
    address: account.address,
    username: account.meta.name,
  }
}
const getCookieAndCsrfFromProxy = async (user: User) => {
  const authUrl = proxyAuthUrl();
  try {
    const signedMessage = await getsignedMessage(user.address)
    console.log({ signedMessage })
    const authResp = await Axios.post(authUrl, (signedMessage));
    const resp = authResp.data;
    return resp
  }
  catch (e) {
    console.error(e.message);
  }
}

export const getsignedMessage = async (address: string): Promise<AuthPayload> => {
  const { web3FromAddress } = await import('@polkadot/extension-dapp');
  const injector = await web3FromAddress(address);
  const timeStampUrl = barongTimeStamp();
  const timeStampResp = await Axios.get(timeStampUrl);
  const { time_ms } = timeStampResp.data
  //works till here
  let message = "#" + address + "#" + time_ms.toString();
  const hash = blake2AsHex(message);
  console.log({ signRaw: injector.signer.signRaw })
  const { signature } = await injector.signer.signRaw({
    address,
    data: hash,
    type: 'bytes'
  });
  console.log({ signature })
  return {
    "nickname": address,
    "nonce": time_ms.toString(),
    "signature": (signature).toString(),
  };
}
// ----------------------------------------------------------------
//the functions below are not used for now, keeping for any future use cases.
// const getExtensionAddress = async () => {
//   const keyring = new Keyring({ type: "ed25519", ss58Format: 2 });
//   const mnemonic = mnemonicGenerate();
//   const pair = keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
//   console.log(keyring.pairs.length, "pairs available");

//   console.log(pair.meta.name, "has address", pair.address);
//   return pair;
// };
// const getSignature = async () => {
//   const { blake2AsHex } = await import("@polkadot/util-crypto");
//   const { u8aToHex, stringToU8a } = await import("@polkadot/util");

//   const pair = await getExtensionAddress();

//   const nonce = Date.now();

//   const address = pair.address;
//   console.log("Nonce from Openfinex: ", nonce);

//   const message = "#" + address + "#" + nonce.toString();
//   console.log("Message to sign: ", message);
//   const hash = await blake2AsHex(message);
//   console.log("Message Hash", hash);
//   const signature = pair.sign(stringToU8a(hash));
//   console.log("Signature: ", u8aToHex(signature));
//   const payload = {
//     nickname: address,
//     algo: "ED25519",
//     hash: "Blake2",
//     nonce: nonce,
//     signature: u8aToHex(signature),
//     captcha_response: "",
//   };
//   console.log(payload);
//   return payload;
// };
