import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Context } from "./context";

export const useCodeVerification = () => {
  const router = useRouter();
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Auth context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  const isVerificationSuccess = state.userConfirmed;
  const email = state.email;

  useEffect(() => {
    if (isVerificationSuccess) {
      alert("Successfully created a new account!");
      //   Will be called when notification context will created
      //   dispatch(
      //     notificationPush({
      //       message: {
      //         title: "Successfully created a new account!",
      //         description: "Please sign in with your new account.",
      //       },
      //       time: new Date().getTime(),
      //     })
      //   );
      setTimeout(() => {
        router.push("/signIn");
      }, 2000);
    }
  }, [isVerificationSuccess, router]);

  useEffect(() => {
    if (!email) router.push("/sign");
  }, [email, router]);

  return { ...state };
};
