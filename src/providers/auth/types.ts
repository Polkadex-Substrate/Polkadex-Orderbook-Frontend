import { FC, PropsWithChildren } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

// keep this type in the root of the providers folder so it can be accesses by other providers
export interface CommonActionState {
  isLoading: boolean;
  message: string;
  isError: boolean;
  isSuccess: boolean;
}

export interface AuthState {
  user?: CognitoUser;
  email: string;
  requireVerification?: boolean;
  auth: CommonActionState;
  logout: CommonActionState;
  forgotPassword: { email: string } & CommonActionState;
  changePassword: CommonActionState;
}

export type AuthProps = {
  isDevelopment?: boolean;
};

export type AuthProviderProps = PropsWithChildren<{
  value: AuthContextProps;
}>;

export type AuthContextProps = AuthState;

export type AuthComponent = FC<PropsWithChildren<unknown>>;
