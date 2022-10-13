import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectSignUpLoading, selectSignUpSuccess, signUpFetch } from "../modules/user/auth";

import { useReduxSelector } from "./useReduxSelector";

export const useSignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useReduxSelector(selectSignUpLoading);
  const isSuccess = useReduxSelector(selectSignUpSuccess);

  useEffect(() => {
    if (isSuccess) router.push("/codeVerification");
  }, [isSuccess, router]);

  const signUp = (email: string, password: string) =>
    dispatch(signUpFetch({ email: email.toLowerCase(), password }));

  return { signUp, loading };
};
