import { CommonError } from "../../types";
import { RootState } from "../../";

import { AuthState } from "./reducer";

export const selectSignUpError = (state: RootState): CommonError | undefined =>
  state.user.auth.signUpError;

export const selectSignInLoading = (state: RootState): AuthState["signInLoading"] =>
  state.user.auth.signInLoading;

export const selectSignInError = (state: RootState): AuthState["authError"] =>
  state.user.auth.authError;

export const selectSignUpLoading = (state: RootState): AuthState["signUpLoading"] =>
  state.user.auth.signUpLoading;

export const selectSignUpSuccess = (state: RootState): AuthState["signUpSuccess"] =>
  state.user.auth.signUpSuccess;

export const selectConnectPhoneError = (state: RootState): AuthState["authError"] =>
  state.user.auth.connectPhoneError;

export const selectConnectPhoneLoading = (state: RootState): AuthState["signUpLoading"] =>
  state.user.auth.connectPhoneLoading;

export const selectConnectPhoneSuccess = (state: RootState): AuthState["signUpSuccess"] =>
  state.user.auth.connectPhoneSuccess;

export const selectImportAccountLoading = (
  state: RootState
): AuthState["importAccountLoading"] => state.user.auth.importAccountLoading;

export const selectImportAccountError = (state: RootState): AuthState["importAccountError"] =>
  state.user.auth.importAccountError;

export const selectImportAccountSuccess = (
  state: RootState
): AuthState["importAccountSuccess"] => state.user.auth.importAccountSuccess;
