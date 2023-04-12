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
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const AuthProvider: T.AuthComponent = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const profileState = useProfile();
  const { onHandleNotification, onHandleError } = useSettingsProvider();

  // Actions
  const onSignIn = useCallback(
    async ({ email, password }: T.SignIn["fetch"]) => {
      try {
        dispatch(A.signInFetch({ email, password }));
        const user: CognitoUser = await Auth.signIn(email, password);
        dispatch(A.signInData({ user, email, isConfirmed: true }));
        profileState.onUserAuthFetch();
      } catch (error) {
        console.log("error:", error);
        const errorCode = error?.name;
        switch (errorCode) {
          case AUTH_ERROR_CODES.NOT_AUTHORIZED: {
            onHandleError({
              error,
              processingType: "alert",
            });
            dispatch(A.signInError(error));
            return;
          }
          case AUTH_ERROR_CODES.USER_NOT_CONFIRMED: {
            dispatch(A.signInData({ email, isConfirmed: false }));
            onHandleNotification({
              message: {
                title: "Sign in Failed!",
                description:
                  "It looks like you have not confirmed your email. Please confirm your email and try again.",
              },
              time: new Date().getTime(),
              type: "AttentionAlert",
            });
            dispatch(A.signInError(error));
            router.push("/codeVerification");
            return;
          }
          default: {
            onHandleError({
              error,
              processingType: "alert",
            });
            dispatch(A.signInError(error));
          }
        }
      }
    },
    [profileState, onHandleError, onHandleNotification]
  );

  const onSignUp = useCallback(
    async ({ email, password }: T.SignUp["fetch"]) => {
      try {
        dispatch(A.signUpFetch({ email, password }));
        const { userConfirmed } = await Auth.signUp({
          username: email.toLowerCase(),
          password,
          attributes: {
            email,
          },
        });
        dispatch(A.signUpData({ userConfirmed, email }));
      } catch (error) {
        console.log("error: ", error);
        onHandleError({
          error,
          processingType: "alert",
        });
        dispatch(A.signUpError(error));
      }
    },
    [onHandleError]
  );

  const onLogout = useCallback(() => {
    try {
      Auth.signOut();
      dispatch(A.logOutData());
      onHandleNotification({
        type: "SuccessAlert",
        message: {
          title: "Logged out",
          description: "You have been logged out.",
        },
        time: new Date().getTime(),
      });
    } catch (error) {
      console.log("error: ", error);

      onHandleError({
        error,
        processingType: "alert",
      });

      dispatch(A.logOutError(error));

      if (error.message.indexOf("identity.session.not_found") > -1) {
        profileState.onUserAuthFetch();
      }
    }
  }, [onHandleError, onHandleNotification, profileState]);

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
        onHandleError({
          error,
          processingType: "alert",
        });
        dispatch(A.forgotPasswordError(error));
      }
    },
    [onHandleError]
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
        onHandleError({
          error,
          processingType: "alert",
        });
        dispatch(A.forgotPasswordError(error));
      }
    },
    [onHandleError]
  );

  const onResendCode = useCallback(
    async (email: string) => {
      try {
        await Auth.resendSignUp(email);
        dispatch(A.resendCodeData());
      } catch (error) {
        console.log("error:", error);
        onHandleError({
          error,
          processingType: "alert",
        });
        dispatch(A.resendCodeError(error));
      }
    },
    [onHandleError]
  );

  const onCodeVerification = useCallback(
    async ({ email, code }: T.CodeVerification) => {
      try {
        await Auth.confirmSignUp(email, code);
        dispatch(A.codeVerifyData());
      } catch (error) {
        console.log("error:", error);
        onHandleError({
          error,
          processingType: "alert",
        });
        dispatch(A.codeVerifyError(error));
      }
    },
    [onHandleError]
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
        onHandleError({
          error,
          processingType: "alert",
        });
        dispatch(A.changePasswordError(error));
      }
    },
    [onHandleError]
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
  }, [isAuthenticated, signinIsSuccess]);

  // For SignUp Purposes
  const signupIsSuccess = state.signup.isSuccess;
  useEffect(() => {
    if (signupIsSuccess) router.push("/codeVerification");
  }, [signupIsSuccess]);

  // For Code Verification Purposes
  const isVerificationSuccess = state.userConfirmed;
  const email = state.email;

  useEffect(() => {
    if (signupIsSuccess && isVerificationSuccess) {
      onHandleNotification({
        message: {
          title: "Successfully created a new account!",
          description: "Please sign in with your new account.",
        },
        time: new Date().getTime(),
      });
      setTimeout(() => {
        router.push("/signIn");
      }, 2000);
    }
  }, [isVerificationSuccess, signupIsSuccess, onHandleNotification]);

  useEffect(() => {
    if (signupIsSuccess && !email) router.push("/sign");
  }, [email, signupIsSuccess]);

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
