import Head from "next/head";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import confetti from "canvas-confetti";

import * as S from "./styles";

import { Button, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { newPasswordValidations } from "@polkadex/orderbook/validations";
import { Menu } from "@polkadex/orderbook-ui/organisms";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  forgotPasswordFetch,
  selectForgotPasswordLoading,
  selectForgotPasswordSuccess,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const ResetPasswordFormTemplate = ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const [state, setState] = useState(false);
  const [view, setView] = useState({
    password: false,
    repeatPassword: false,
  });
  const isLoading = useReduxSelector(selectForgotPasswordLoading);
  const isSuccess = useReduxSelector(selectForgotPasswordSuccess);
  const dispatch = useDispatch();

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: newPasswordValidations,
    onSubmit: ({ password }) => {
      dispatch(forgotPasswordFetch({ code, email, newPassword: password }));
    },
  });

  return (
    <>
      <Head>
        <title>New password | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Container>
            <S.Title>
              <div>
                <OrderbookLogo />
              </div>
            </S.Title>
            {isSuccess ? (
              <Success />
            ) : (
              <S.Card>
                <S.Column />
                <S.Box>
                  <S.BoxTitle>
                    <h1>New password</h1>
                    <p>For safety of your account, please use strong password.</p>
                  </S.BoxTitle>
                  <form onSubmit={handleSubmit}>
                    <InputLine
                      name="password"
                      type={view.password ? "text" : "password"}
                      label="Password"
                      placeholder="Enter your password"
                      disabled={isLoading}
                      error={errors.password && touched.password && errors.password}
                      {...getFieldProps("password")}>
                      <S.Show
                        type="button"
                        onClick={() => setView({ ...view, password: !view.password })}>
                        {view.password ? <Icons.Hidden /> : <Icons.Show />}
                      </S.Show>
                    </InputLine>
                    <InputLine
                      name="repeatPassword"
                      type={view.repeatPassword ? "text" : "password"}
                      label="Repeat password"
                      placeholder="Repeat your password"
                      disabled={isLoading}
                      error={
                        errors.repeatPassword &&
                        touched.repeatPassword &&
                        errors.repeatPassword
                      }
                      {...getFieldProps("repeatPassword")}>
                      <S.Show
                        type="button"
                        onClick={() =>
                          setView({ ...view, repeatPassword: !view.repeatPassword })
                        }>
                        {view.repeatPassword ? <Icons.Hidden /> : <Icons.Show />}
                      </S.Show>
                    </InputLine>
                    <Button
                      disabled={!(isValid && dirty)}
                      type="submit"
                      size="extraLarge"
                      background="primary"
                      color="white"
                      isLoading={isLoading}
                      isFull>
                      Continue
                    </Button>
                  </form>
                </S.Box>
              </S.Card>
            )}
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};

const Success = () => {
  useEffect(() => {
    confetti({
      zIndex: 9999,
      origin: {
        x: 0.53,
        y: 0.5,
      },
    });
  }, []);
  return (
    <S.Success>
      <div>
        <img src="/img/success.svg" alt="email sent" />
      </div>
      <h2>Password changed!</h2>
      <p>Awesome, your password has been changed successfully.</p>
      <small>You will be automatically redirected in 5 seconds. </small>
    </S.Success>
  );
};
