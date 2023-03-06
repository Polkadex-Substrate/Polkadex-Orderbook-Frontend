import { FC, PropsWithChildren } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

export interface CommonType {
  isLoading: boolean;
  message: string;
  isError: boolean;
  isSuccess: boolean;
}

export interface AuthState {
  user?: CognitoUser;
  email: string;
  requireVerification?: boolean;
  current_password_entropy: number;
  auth: CommonType;
  logout: CommonType;
  forgotPassword: {
    isLoading: boolean;
    message: string;
    isError: boolean;
    isSuccess: boolean;
    email: string;
  };
  changePassword: CommonType;
}

export type AuthProps = {
  isDevelopment?: boolean;
};

export type AuthProviderProps = PropsWithChildren<{
  value: AuthContextProps;
}>;

export type AuthContextProps = AuthState;

export type AuthComponent = FC<PropsWithChildren<unknown>>;
