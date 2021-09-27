import { call, put } from "redux-saga/effects";
import { keyring } from '@polkadot/ui-keyring';
import { API, proxyRestUrl, RequestOptions } from "../../../../api";
import { sendError } from "../../../";
import { User, userData } from "../../profile";
import {
  signInData,
  signInError,
  SignInFetch,
  signInRequire2FA,
  signUpRequireVerification,
} from "../actions";
import axios from "axios";

const sessionsConfig: RequestOptions = {
  apiVersion: "barong",
};

export function* signInSaga(action: SignInFetch) {
  try {
    const { address, password } = action.payload
    const user = yield call(() => getKeyringPairFromAddress(address, password));
    const proxyResponse = yield call(() => requestProxyAuth());
    console.log({proxyResponse})
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

const getKeyringPairFromAddress = async (address: string, password: string) => {
  try {
    const userPair = keyring.getPair(address)
    console.log(userPair.address, userPair.isLocked);
    return userPair
  } catch (e) {
    throw new Error(e);
  }
};

const requestProxyAuth = async () => {
  const url = proxyRestUrl();
  const resp = await axios.get(url + '/pingBarong')
  return resp.data
}

const getSignature = async (pair: any) => {
  const { blake2AsHex } = await import("@polkadot/util-crypto");
  const { u8aToHex, stringToU8a } = await import("@polkadot/util");

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
