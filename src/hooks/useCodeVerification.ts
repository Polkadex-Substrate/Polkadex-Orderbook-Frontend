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

export const useCodeVerification = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isVerificationSuccess = useReduxSelector(selectUserConfirmed);
  const email = useReduxSelector(selectUserAuthEmail);

  useEffect(() => {
    if (isVerificationSuccess) router.push("/signIn");
  }, [isVerificationSuccess, router]);

  useEffect(() => {
    if (!email) router.push("/sign");
  }, [email, router]);

  const verifyCode = (code: string) => dispatch(codeVerifyFetch({ email, code }));

  const resendVerificationCode = () => dispatch(resendCodeFetch({ email }));

  return { verifyCode, resendVerificationCode };
};
