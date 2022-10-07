// TODO : Fix saga
import { Auth } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import {
  notificationPush,
  sendError,
  userAuthData,
  UserAuthFetch,
  userFetch,
} from "../../../";
import { userAuthError } from "../actions";

export function* userAuthSaga(_action: UserAuthFetch) {
  try {
    const { email, isAuthenticated, userExists, isConfirmed } = yield call(() =>
      getUserAuthInfo()
    );
    if (email) {
      yield put(userFetch({ email }));
    }
    yield put(userAuthData({ email, isAuthenticated, userExists, isConfirmed }));
    if (!isConfirmed && userExists) {
      yield put(
        notificationPush({
          type: "AttentionAlert",
          message: {
            title: "Please confirm your email.",
            description: "Sign in again and confirm your email.",
          },
          time: new Date().getTime(),
        })
      );
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userAuthError,
        },
      })
    );
  }
}

const getUserAuthInfo = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      isAuthenticated: true,
      email: user.attributes.email,
      userExists: true,
      isConfirmed: user.attributes.email_verified,
      signInUserSession: user.signInUserSession,
      jwt: user.signInUserSession.accessToken.jwtToken,
    };
  } catch (e) {
    console.log(e);
    if (e === "The user is not authenticated") {
      return {
        email: "",
        isAuthenticated: false,
        userExists: false,
      };
    }
    if (e === "User is not confirmed.") {
      return {
        email: "",
        isAuthenticated: false,
        userExists: true,
        isConfirmed: false,
      };
    }
    throw new Error(e);
  }
};
