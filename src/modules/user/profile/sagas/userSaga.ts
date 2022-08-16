// TODO : Fix saga
import { API, Auth } from "aws-amplify";
import router from "next/router";
import { call, put } from "redux-saga/effects";

import { notificationPush, sendError } from "../../../";
import { userData, userError, UserFetch } from "../actions";

export function* userSaga(action: UserFetch) {
  try {
    const { email, isAuthenticated, userExists, isConfirmed } = yield call(() =>
      getUserInfo()
    );
    yield put(userData({ email, isAuthenticated, userExists, isConfirmed }));
    if (!isConfirmed && userExists) {
      yield put(
        notificationPush({
          type: "AttentionAlert",
          message: {
            title: "Please confirm your email",
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
          actionError: userError,
        },
      })
    );
  }
}

const getUserInfo = async () => {
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
    const error = e;
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
