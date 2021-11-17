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
