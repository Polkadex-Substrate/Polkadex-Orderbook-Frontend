import { useCallback, useReducer } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import router from "next/router";

import { Provider } from "./context";
import { authReducer, initialState } from "./reducer";
import * as T from "./types";
import { AUTH_ERROR_CODES } from "./constants";
import * as A from "./actions";

export const AuthProvider: T.AuthComponent = ({ onError, children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions
  const onSignIn = useCallback(
    async ({ email, password }: T.SignIn["fetch"]) => {
      let userEmail;
      try {
        dispatch(A.signInFetch({ email, password }));
        userEmail = email;
        const user: CognitoUser = await Auth.signIn(email, password);
        dispatch(A.signInData({ user, email, isConfirmed: true }));
        // This will be called when profile context provider will created
        // yield put(userAuthFetch());
      } catch (error) {
        console.log("error:", error);
        const errorCode = error?.name;
        const errorMessage = error instanceof Error ? error.message : (error as string);
        switch (errorCode) {
          case AUTH_ERROR_CODES.NOT_AUTHORIZED: {
            if (typeof onError === "function") onError(errorMessage);
            else dispatch(A.signInError(error));
            return;
          }
          case AUTH_ERROR_CODES.USER_NOT_CONFIRMED: {
            dispatch(A.signInData({ email: userEmail, isConfirmed: false }));
            router.push("/codeVerification");
            // yield alreadyRegisteredNotify();
            return;
          }
          default: {
            if (typeof onError === "function") onError(errorMessage);
            else dispatch(A.signInError(error));
          }
        }
      }
    },
    [onError]
  );

  const onSignUp = useCallback(
    async ({ email, password }: T.SignUp["fetch"]) => {
      try {
        const { user, userConfirmed } = await Auth.signUp({
          username: email.toLowerCase(),
          password,
          attributes: {
            email,
          },
        });
        dispatch(A.signUpData({ userConfirmed, email }));
      } catch (error) {
        console.log("error: ", error);
        const errorMessage = error instanceof Error ? error.message : (error as string);
        if (typeof onError === "function") onError(errorMessage);
        else dispatch(A.signUpError(error));
      }
    },
    [onError]
  );

  const onLogout = useCallback(() => {
    try {
      Auth.signOut();
      dispatch(A.logOutData());
      // yield put(
      //   notificationPush({
      //     type: "SuccessAlert",
      //     message: {
      //       title: "Logged out",
      //       description: "You have been logged out.",
      //     },
      //     time: new Date().getTime(),
      //   })
      // );
      // yield put(userReset());
    } catch (error) {
      console.log("error: ", error);
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      else dispatch(A.logOutError(error));

      if (error.message.indexOf("identity.session.not_found") > -1) {
        // Will be called when profile context provider will be created
        // yield put(userAuthFetch());
      }
    }
  }, [onError]);

  const onForgotPassword = useCallback(
    async ({ code, newPassword, email }: T.ForgotPassword) => {
      try {
        const data = await Auth.forgotPasswordSubmit(email, code, newPassword);
        dispatch(A.forgotPasswordData());
        setTimeout(() => {
          router.push("/signIn");
          dispatch(A.forgotPasswordReset(true));
        }, 5000);
      } catch (error) {
        console.log("error:", error);
        const errorMessage = error instanceof Error ? error.message : (error as string);
        if (typeof onError === "function") onError(errorMessage);
        else dispatch(A.forgotPasswordError(error));
      }
    },
    [onError]
  );

  const onForgotPasswordCode = useCallback(
    async (payload: string) => {
      try {
        Auth.forgotPassword(payload.toLowerCase());
        dispatch(A.forgotPasswordData(payload));
        setTimeout(() => {
          router.push("/resetPasswordForm");
          dispatch(A.forgotPasswordReset());
        }, 5000);
      } catch (error) {
        console.log("error:", error);
        const errorMessage = error instanceof Error ? error.message : (error as string);
        if (typeof onError === "function") onError(errorMessage);
        else dispatch(A.forgotPasswordError(error));
      }
    },
    [onError]
  );

  const onResendCode = useCallback(
    async (email: string) => {
      try {
        const res = await Auth.resendSignUp(email);
        dispatch(A.resendCodeData());
      } catch (error) {
        console.log("error:", error);
        const errorMessage = error instanceof Error ? error.message : (error as string);
        if (typeof onError === "function") onError(errorMessage);
        else dispatch(A.resendCodeError(error));
      }
    },
    [onError]
  );

  const onCodeVerification = useCallback(
    async ({ email, code }: T.CodeVerification) => {
      try {
        const res = await Auth.confirmSignUp(email, code);
        dispatch(A.codeVerifyData());
      } catch (error) {
        console.log("error:", error);
        const errorMessage = error instanceof Error ? error.message : (error as string);
        if (typeof onError === "function") onError(errorMessage);
        else dispatch(A.codeVerifyError(error));
      }
    },
    [onError]
  );

  const onChangePassword = useCallback(
    async ({ newPassword, oldPassword }: T.ChangePassword) => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const data = await Auth.changePassword(user, oldPassword, newPassword);
        console.log(data);
        dispatch(A.changePasswordData());
      } catch (error) {
        console.log("error:", error);
        const errorMessage = error instanceof Error ? error.message : (error as string);
        if (typeof onError === "function") onError(errorMessage);
        else dispatch(A.changePasswordError(error));
      }
    },
    [onError]
  );

  return (
    <Provider
      value={{
        ...state,
        onSignIn,
        onSignUp,
        onLogout,
        onForgotPassword,
        onForgotPasswordCode,
        onResendCode,
        onCodeVerification,
        onChangePassword,
      }}>
      {children}
    </Provider>
  );
};
