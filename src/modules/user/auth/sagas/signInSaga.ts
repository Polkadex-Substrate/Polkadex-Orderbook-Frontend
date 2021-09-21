import { call, put } from "redux-saga/effects";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/keyring";

import { API, RequestOptions } from "../../../../api";
import { sendError } from "../../../";
import { changeLanguage } from "../../../public/i18n";
import { userData } from "../../profile";
import {
  signInData,
  signInError,
  SignInFetch,
  signInRequire2FA,
  signUpRequireVerification,
} from "../actions";

const sessionsConfig: RequestOptions = {
  apiVersion: "barong",
};

export function* signInSaga() {
  try {
    const payload = yield call(getSignature);

    const user = yield call(API.post(sessionsConfig), "/identity/sessions/signature", payload);

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

const getExtensionAddress = async () => {
  const keyring = new Keyring({ type: "ed25519", ss58Format: 2 });
  const mnemonic = mnemonicGenerate();
  const pair = keyring.addFromUri(mnemonic, { name: "first pair" }, "ed25519");
  console.log(keyring.pairs.length, "pairs available");

  console.log(pair.meta.name, "has address", pair.address);
  return pair;
};

const getSignature = async () => {
  const { blake2AsHex } = await import("@polkadot/util-crypto");
  const { u8aToHex, stringToU8a } = await import("@polkadot/util");

  const pair = await getExtensionAddress();

  const nonce = Date.now();

  const address = pair.address;
  console.log("Nonce from Openfinex: ", nonce);

  const message = "#" + address + "#" + nonce.toString();
  console.log("Message to sign: ", message);
  const hash = await blake2AsHex(message);
  console.log("Message Hash", hash);
  const signature = pair.sign(stringToU8a(hash));
  console.log("Signature: ", u8aToHex(signature));
  const payload = {
    nickname: address,
    algo: "ED25519",
    hash: "Blake2",
    nonce: nonce,
    signature: u8aToHex(signature),
    captcha_response: "",
  };
  console.log(payload);
  return payload;
};
