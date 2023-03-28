import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { signUpFetch } from "../modules/user/auth";
import { useAuth } from "../providers/user/auth";

export const useSignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    signup: { isLoading: loading, isSuccess },
  } = useAuth();

  useEffect(() => {
    if (isSuccess) router.push("/codeVerification");
  }, [isSuccess, router]);

  const signUp = (email: string, password: string) =>
    dispatch(signUpFetch({ email: email.toLowerCase(), password }));

  return { signUp, loading };
};
