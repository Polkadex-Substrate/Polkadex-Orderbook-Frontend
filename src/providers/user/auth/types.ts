import { FC, PropsWithChildren } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { CommonActionState } from "../../types";

export interface UserAuth {
  email: string;
  userConfirmed: boolean;
}
export interface SignIn {
  fetch: {
    email: string;
    password: string;
  };
}

export interface SignUp {
  fetch: {
    email: string;
    password: string;
  };
}

export interface ForgotPassword {
  code: string;
  newPassword: string;
  email: string;
}

export interface CodeVerification {
  email: string;
  code: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
export interface AuthState {
  user?: CognitoUser;
  email: string;
  userConfirmed?: boolean;
  signin: CommonActionState;
  signup: CommonActionState;
  logout: CommonActionState;
  forgotPassword: { email: string } & CommonActionState;
  changePassword: CommonActionState;
}

export type AuthProviderProps = PropsWithChildren<{
  value: AuthContextProps;
}>;

export type AuthContextProps = AuthState & {
  onSignIn: (value: SignIn["fetch"]) => void;
  onSignUp: (value: SignUp["fetch"]) => void;
  onLogout: () => void;
  onForgotPassword: (value: ForgotPassword) => void;
  onForgotPasswordCode: (value: string) => void;
  onResendCode: (value: string) => void;
  onCodeVerification: (value: CodeVerification) => void;
  onChangePassword: (value: ChangePassword) => void;
  onUserAuth: (value: UserAuth) => void;
};

export interface AuthProps {
  onError?: (value: string) => void;
}

export type AuthComponent = FC<PropsWithChildren<AuthProps>>;
