import { useReducer } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import router from "next/router";

import { Provider } from "./context";
import { authReducer, initialState } from "./reducer";
import * as T from "./types";
import { AUTH_ERROR_CODES } from "./constants";
import * as A from "./actions";

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions
  const onSignIn = async ({ email, password }: T.SignIn["fetch"]) => {
    let userEmail;
    try {
      userEmail = email;
      const user: CognitoUser = await Auth.signIn(email, password);
      dispatch(A.signInData({ user, email, isConfirmed: true }));
      // This will be called when profile context provider will created
      // yield put(userAuthFetch());
    } catch (error) {
      console.log("error:", error);
      const errorCode = error?.name;
      switch (errorCode) {
        case AUTH_ERROR_CODES.NOT_AUTHORIZED: {
          // yield errorAlert(error);
          return;
        }
        case AUTH_ERROR_CODES.USER_NOT_CONFIRMED: {
          dispatch(A.signInData({ email: userEmail, isConfirmed: false }));
          router.push("/codeVerification");
          // yield alreadyRegisteredNotify();
          return;
        }
        default: {
          // yield errorAlert(error);
        }
      }
    }
  };

  const onSignUp = async ({ email, password }: T.SignUp["fetch"]) => {
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
      // yield put(
      //   sendError({
      //     error,
      //     processingType: "alert",
      //     extraOptions: {
      //       actionError: signUpError,
      //     },
      //   })
      // );
    }
  };

  const onLogout = () => {
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
      // yield put(
      //   sendError({
      //     error,
      //     processingType: "alert",
      //     extraOptions: {
      //       actionError: A.logOutError,
      //     },
      //   })
      // );

      if (error.message.indexOf("identity.session.not_found") > -1) {
        // Will be called when context provider will be created
        // yield put(userAuthFetch());
      }
    }
  };

  const onForgotPassword = async ({ code, newPassword, email }: T.ForgotPassword) => {
    try {
      const data = await Auth.forgotPasswordSubmit(email, code, newPassword);
      dispatch(A.forgotPasswordData());
      setTimeout(() => {
        router.push("/signIn");
        dispatch(A.forgotPasswordReset(true));
      }, 5000);
    } catch (error) {
      console.log(error);
      // yield put(
      //   sendError({
      //     error,
      //     processingType: "alert",
      //     extraOptions: {
      //       actionError: forgotPasswordError,
      //     },
      //   })
      // );
    }
  };

  const onForgotPasswordCode = async (payload: string) => {
    try {
      Auth.forgotPassword(payload.toLowerCase());
      dispatch(A.forgotPasswordData(payload));
      setTimeout(() => {
        router.push("/resetPasswordForm");
        dispatch(A.forgotPasswordReset());
      }, 5000);
    } catch (error) {
      console.log(error);
      // yield put(
      //   sendError({
      //     error,
      //     processingType: "alert",
      //     extraOptions: {
      //       actionError: forgotPasswordError,
      //     },
      //   })
      // );
    }
  };

  const onResendCode = async (email: string) => {
    try {
      const res = await Auth.resendSignUp(email);
      dispatch(A.resendCodeData());
    } catch (error) {
      console.error(error);
      // yield put(
      //   sendError({
      //     error,
      //     processingType: "alert",
      //     extraOptions: {
      //       actionError: A.resendCodeError,
      //     },
      //   })
      // );
    }
  };

  const onCodeVerification = async ({ email, code }: T.CodeVerification) => {
    try {
      const res = await Auth.confirmSignUp(email, code);
      dispatch(A.codeVerifyData());
    } catch (error) {
      console.error(error);
      // yield put(
      //   sendError({
      //     error,
      //     processingType: "alert",
      //     extraOptions: {
      //       actionError: A.codeVerifyError,
      //     },
      //   })
      // );
    }
  };

  const onChangePassword = async ({ newPassword, oldPassword }: T.ChangePassword) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);
      console.log(data);
      dispatch(A.changePasswordData());
    } catch (error) {
      console.log(error);
      // yield put(
      //   sendError({
      //     error,
      //     processingType: "alert",
      //     extraOptions: {
      //       actionError: A.changePasswordError,
      //     },
      //   })
      // );
    }
  };

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
