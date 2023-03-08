import { FC, PropsWithChildren } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

// keep this type in the root of the providers folder so it can be accesses by other providers
export interface CommonActionState {
  isLoading: boolean;
  message: string;
  isError: boolean;
  isSuccess: boolean;
}

export type CommonError = {
  code: number;
  message: string[];
};

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
  current_password_entropy: number;
  auth: CommonActionState;
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
};

export type AuthComponent = FC<PropsWithChildren<unknown>>;
