import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  codeVerifyFetch,
  resendCodeFetch,
  selectUserAuthEmail,
  selectUserConfirmed,
} from "../modules/user/auth";

import { useReduxSelector } from "./useReduxSelector";

import { defaultConfig } from "@polkadex/orderbook-config";

export const useCodeVerification = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isVerficationSuccess = useReduxSelector(selectUserConfirmed);
  const email = useReduxSelector(selectUserAuthEmail);

  useEffect(() => {
    if (isVerficationSuccess) router.push("/trading/" + defaultConfig.landingPageMarket);
  }, [isVerficationSuccess, router]);

  const verifyCode = (code: string) => dispatch(codeVerifyFetch({ email, code }));

  const resendVerificationCode = () => dispatch(resendCodeFetch({ email }));

  return { verifyCode, resendVerificationCode };
};
