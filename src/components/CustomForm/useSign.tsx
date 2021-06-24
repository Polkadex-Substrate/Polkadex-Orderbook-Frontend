import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { captchaLogin, captchaType } from "src/api";
import { Captcha } from "src/components";
import { EMAIL_REGEX } from "src/helpers";
import { useReduxSelector } from "src/hooks";
import {
  selectCaptchaResponse,
  selectRecaptchaSuccess,
  selectSignInError,
  selectSignInRequire2FA,
  selectUserFetching,
  selectUserLoggedIn,
  signIn,
} from "src/modules";

import { SignInProps } from "./types";

export const useSign = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isLoggedIn = useReduxSelector(selectUserLoggedIn);
  const loading = useReduxSelector(selectUserFetching);
  const require2FA = useReduxSelector(selectSignInRequire2FA);
  const requireEmailVerification = useReduxSelector(
    (x) => x.user.auth.requireVerification
  );
  const errorSignIn = useReduxSelector(selectSignInError);
  const reCaptchaSuccess = useReduxSelector(selectRecaptchaSuccess);
  const captcha_response = useReduxSelector(selectCaptchaResponse);

  const refreshError = useCallback(() => {
    setEmailError("");
    setPasswordError("");
  }, []);

  const handleSignIn = useCallback(() => {
    dispatch(
      signIn({
        email,
        password,
        ...(captchaType() !== "none" && captchaLogin() && { captcha_response }),
      })
    );
  }, [dispatch, email, password, captcha_response]);

  const validateForm = useCallback(() => {
    const isEmailValid = email.match(EMAIL_REGEX);
    if (!isEmailValid) {
      setEmailError("Invalid Email");
      setPasswordError("");
      return;
    }
    if (!password) {
      setEmailError("");
      setPasswordError("Empty Password");
    }
  }, [email, password]);

  const handleChangeEmailValue = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handleChangePasswordValue = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const renderCaptcha = useMemo(
    () => <Captcha error={errorSignIn || emailError} />,
    [errorSignIn, emailError]
  );

  return {
    email,
    emailError,
    password,
    passwordError,
    isLoggedIn,
    loading,
    require2FA,
    requireEmailVerification,
    errorSignIn,
    reCaptchaSuccess,
    captcha_response,
    renderCaptcha,
    handleChangePasswordValue,
    handleChangeEmailValue,
    validateForm,
    refreshError,
    handleSignIn,
  };
};

export const useSignIn = ({
  email,
  password,
  refreshError,
  onSignIn,
  isFormValid,
  changePassword,
  changeEmail,
  isLoading,
}: Omit<SignInProps, "emailError" | "passwordError">) => {
  const isValidForm = useCallback(() => {
    const isEmailValid = email.match(EMAIL_REGEX);
    return email && isEmailValid && password;
  }, [email, password]);

  const handleChangeEmail = useCallback(
    (value: string) => {
      changeEmail(value);
    },
    [changeEmail]
  );

  const handleChangePassword = useCallback(
    (value: string) => {
      changePassword(value);
    },
    [changePassword]
  );

  const handleSubmitForm = useCallback(() => {
    refreshError();
    onSignIn();
  }, [onSignIn, refreshError]);

  const handleValidateForm = useCallback(() => {
    console.log("Verificando Form");
    isFormValid();
  }, [isFormValid]);

  const isButtonDisabled = isLoading || !email.match(EMAIL_REGEX) || !password;

  const handleClick = useCallback(
    (e?: MouseEvent) => {
      if (e) {
        e.preventDefault();
      }
      if (!isValidForm()) {
        handleValidateForm();
      } else {
        handleSubmitForm();
      }
    },
    [handleSubmitForm, handleValidateForm, isValidForm]
  );

  return {
    handleClick,
    handleChangePassword,
    handleChangeEmail,
    isButtonDisabled,
  };
};
