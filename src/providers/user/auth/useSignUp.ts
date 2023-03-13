import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Context } from "./context";

export const useSignUp = () => {
  const router = useRouter();
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Auth context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  const loading = state.auth.isLoading;
  const isSuccess = state.auth.isSuccess;

  useEffect(() => {
    if (isSuccess) router.push("/codeVerification");
  }, [isSuccess, router]);

  return { ...state };
};
