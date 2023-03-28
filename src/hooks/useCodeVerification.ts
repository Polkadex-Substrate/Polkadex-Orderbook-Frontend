import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { codeVerifyFetch, resendCodeFetch } from "../modules/user/auth";

import { notificationPush } from "@polkadex/orderbook-modules";
import { useAuth } from "../providers/user/auth";

export const useCodeVerification = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { userConfirmed: isVerificationSuccess, email } = useAuth();

  useEffect(() => {
    if (isVerificationSuccess) {
      dispatch(
        notificationPush({
          message: {
            title: "Successfully created a new account!",
            description: "Please sign in with your new account.",
          },
          time: new Date().getTime(),
        })
      );
      router.push("/signIn");
    }
  }, [isVerificationSuccess, router, dispatch]);

  useEffect(() => {
    if (!email) router.push("/sign");
  }, [email, router]);

  const verifyCode = (code: string) => dispatch(codeVerifyFetch({ email, code }));

  const resendVerificationCode = () => dispatch(resendCodeFetch({ email }));

  return { verifyCode, resendVerificationCode };
};
