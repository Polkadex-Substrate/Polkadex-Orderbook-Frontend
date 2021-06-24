import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { captchaLogin, captchaType } from "src/api";
import { CustomButton, CustomInputPolkadex } from "src/components";
import { useHistory } from 'react-router';
import {
  resetCaptchaState,
  signInError,
  signUpRequireVerification,
} from "src/modules";

import * as S from "./styles";
import { SignInProps } from "./types";
import { useSign, useSignIn } from "./useSign";

export const CustomSignForm = () => {
  const [state, setState] = useState(true);

  return (
    <S.Wrapper>{state ? <CustomLoginForm /> : <div>SignUp Form</div>}</S.Wrapper>
  );
};

export const CustomLoginForm = () => {
  const dispatch = useDispatch();
  const router = useHistory()

  const {
    email,
    emailError,
    password,
    passwordError,
    isLoggedIn,
    loading,
    require2FA,
    errorSignIn,
    handleChangePasswordValue,
    handleChangeEmailValue,
    validateForm,
    refreshError,
    handleSignIn,
  } = useSign();

  useEffect(() => {
    dispatch(signInError({ code: 0, message: [""] }));
    dispatch(signUpRequireVerification({ requireVerification: false }));

    return () => {
      dispatch(resetCaptchaState());
    };
  }, []);

  useEffect(() => {
    if (
      captchaType() !== "none" &&
      captchaLogin() &&
      errorSignIn &&
      !require2FA
    ) {
      dispatch(resetCaptchaState());
    }
  }, [errorSignIn, captchaType(), captchaLogin()]);

  return (
    <LoginComponent
      email={email}
      emailError={emailError}
      password={password}
      passwordError={passwordError}
      isLoading={loading}
      onSignIn={handleSignIn}
      isFormValid={validateForm}
      refreshError={refreshError}
      changeEmail={handleChangeEmailValue}
      changePassword={handleChangePasswordValue}
    />
  );
};

const LoginComponent = ({
  email,
  password,
  isLoading,
  refreshError,
  onSignIn,
  isFormValid,
  changePassword,
  changeEmail,
  emailError,
  passwordError,
}: SignInProps) => {
  const {
    handleClick,
    handleChangePassword,
    handleChangeEmail,
    isButtonDisabled,
  } = useSignIn({
    email,
    password,
    refreshError,
    onSignIn,
    isFormValid,
    changePassword,
    changeEmail,
    isLoading,
  });

  return (
    <S.Form>
      <S.FormContainer>
        <h4>Let&lsquo;s Access</h4>
        <button type="button">I don&lsquo;t have account</button>
      </S.FormContainer>

      <div>
        <CustomInputPolkadex
          onChange={(e)=>handleChangeEmail(e.target.value)}
          value={email}
          error={emailError}
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          background="secondaryBackground"
          WrapperStyle={{
            style: {
              marginBottom: 10,
            },
          }}
        />
        <CustomInputPolkadex
          onChange={(e)=>handleChangePassword(e.target.value)}
          value={password}
          error={passwordError}
          label="Password"
          placeholder="Enter your password"
          name="password"
          background="secondaryBackground"
          type="password"
        />
      </div>

      <S.FormContainer>
        <CustomButton
          title="Enter"
          background="primary"
          type="button"
          disabled={isButtonDisabled}
          onClick={() => handleClick()}
        />
        <button type="button">Forgot your password?</button>
      </S.FormContainer>
    </S.Form>
  );
};
