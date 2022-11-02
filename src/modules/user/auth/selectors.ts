import { CommonError } from "../../types";
import { RootState } from "../../";

import { AuthState } from "./reducer";

export const selectSignUpError = (state: RootState): CommonError | undefined =>
  state.user.auth.signUpError;

export const selectSignInLoading = (state: RootState): AuthState["signInLoading"] =>
  state.user.auth.signInLoading;

export const selectSignInSuccess = (state: RootState): AuthState["signInSuccess"] =>
  state.user.auth.signInSuccess;

export const selectSignInError = (state: RootState): AuthState["authError"] =>
  state.user.auth.authError;

export const selectSignUpLoading = (state: RootState): AuthState["signUpLoading"] =>
  state.user.auth.signUpLoading;

export const selectSignUpSuccess = (state: RootState): AuthState["signUpSuccess"] =>
  state.user.auth.signUpSuccess;

export const selectUserConfirmed = (state: RootState): AuthState["userConfirmed"] =>
  state.user.auth.userConfirmed;

export const selectUserAuthEmail = (state: RootState): AuthState["email"] =>
  state.user.auth.email;

export const selectForgotPasswordLoading = (
  state: RootState
): AuthState["forgotPasswordLoading"] => state.user.auth.forgotPasswordLoading;

export const selectForgotPasswordSuccess = (
  state: RootState
): AuthState["forgotPasswordSuccess"] => state.user.auth.forgotPasswordSuccess;
