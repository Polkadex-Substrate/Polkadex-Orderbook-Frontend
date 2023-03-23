import { useCallback, useEffect, useReducer, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import router from "next/router";

import { Provider } from "./context";
import { authReducer, initialState } from "./reducer";
import * as T from "./types";
import { AUTH_ERROR_CODES } from "./constants";
import * as A from "./actions";
import { defaultConfig } from "@polkadex/orderbook-config";
import { useProfile } from "../profile";

export const AuthProvider: T.AuthComponent = ({ onError, onNotification, children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const profileState = useProfile();

  // Actions
  const onSignIn = useCallback(
    async ({ email, password }: T.SignIn["fetch"]) => {
      try {
        dispatch(A.signInFetch({ email, password }));
        const user: CognitoUser = await Auth.signIn(email, password);
        dispatch(A.signInData({ user, email, isConfirmed: true }));
      } catch (error) {
        console.log("error:", error);
        const errorCode = error?.name;
        const errorMessage = error instanceof Error ? error.message : (error as string);
        switch (errorCode) {
          case AUTH_ERROR_CODES.NOT_AUTHORIZED: {
            if (typeof onError === "function") onError(errorMessage);
            dispatch(A.signInError(error));
            return;
          }
          case AUTH_ERROR_CODES.USER_NOT_CONFIRMED: {
            dispatch(A.signInData({ email, isConfirmed: false }));
            router.push("/codeVerification");
            if (typeof onError === "function") {
              onError(
                "It looks like you have not confirmed your email. Please confirm your email and try again."
              );
            }
            dispatch(A.signInError(error));
            return;
          }
          default: {
            if (typeof onError === "function") onError(errorMessage);
            dispatch(A.signInError(error));
          }
        }
      }
    },
    [onError]
  );

  const onSignUp = useCallback(
    async ({ email, password }: T.SignUp["fetch"]) => {
      try {
        dispatch(A.signUpFetch({ email, password }));
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
        dispatch(A.signUpError(error));
      }
    },
    [onError]
  );

  const onLogout = useCallback(() => {
    try {
      Auth.signOut();
      dispatch(A.logOutData());
      onNotification("You have been logged out.");
    } catch (error) {
      console.log("error: ", error);
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      else dispatch(A.logOutError(error));

      if (error.message.indexOf("identity.session.not_found") > -1) {
        profileState.onUserAuthFetch();
      }
    }
  }, [onError]);

  const onForgotPassword = useCallback(
    async ({ code, newPassword, email }: T.ForgotPassword) => {
      try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
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
        await Auth.resendSignUp(email);
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
        await Auth.confirmSignUp(email, code);
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

  const onUserAuth = async (payload: T.UserAuth) => {
    dispatch(A.authUserData(payload));
  };

  // For SignIn Purposes
  const signinIsSuccess = state.signin.isSuccess;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getIsAuthenticated = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      if (attributes.email) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIsAuthenticated();
  }, []);

  useEffect(() => {
    if (signinIsSuccess || isAuthenticated) {
      router.push("/trading/" + defaultConfig.landingPageMarket);
    }
  }, [isAuthenticated, signinIsSuccess, router]);

  // For SignUp Purposes
  const signupIsSuccess = state.signup.isSuccess;
  useEffect(() => {
    if (signupIsSuccess) router.push("/codeVerification");
  }, [signupIsSuccess, router]);

  // For Code Verification Purposes
  const isVerificationSuccess = state.userConfirmed;
  const email = state.email;

  useEffect(() => {
    if (signupIsSuccess && isVerificationSuccess) {
      onNotification(
        "Successfully created a new account!. Please sign in with your new account."
      );
      setTimeout(() => {
        router.push("/signIn");
      }, 2000);
    }
  }, [isVerificationSuccess, signupIsSuccess, router]);

  useEffect(() => {
    if (signupIsSuccess && !email) router.push("/sign");
  }, [email, signupIsSuccess, router]);

  // For Logout Purposes
  const user = state.user;
  const logoutIsSuccess = state.logout.isSuccess;
  useEffect(() => {
    if (logoutIsSuccess && !user) {
      router.push("/trading/" + defaultConfig.landingPageMarket);
    }
  }, [logoutIsSuccess, user]);

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
        onUserAuth,
      }}>
      {children}
    </Provider>
  );
};
