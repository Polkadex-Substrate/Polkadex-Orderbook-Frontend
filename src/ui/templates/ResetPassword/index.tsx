import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Button, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { resetPasswordValidations } from "@polkadex/orderbook/validations";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import {
  forgotPasswordCode,
  selectForgotPasswordSuccess,
  selectForgotPasswordLoading,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const ResetPasswordTemplate = () => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useReduxSelector(selectForgotPasswordLoading);
  const isSuccess = useReduxSelector(selectForgotPasswordSuccess);

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordValidations,
    onSubmit: ({ email }) => {
      dispatch(forgotPasswordCode(email));
    },
  });

  return (
    <>
      <Head>
        <title>Reset password | Polkadex Orderbook</title>
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
              <span>
                Back to <Link href="/signIn"> login</Link>
              </span>
            </S.Title>
            {isSuccess ? (
              <Success />
            ) : (
              <S.Card>
                <S.Column />
                <S.Box>
                  <S.BoxTitle>
                    <h1>Reset password?</h1>
                    <p>No worries, we`ll send you instructions.</p>
                  </S.BoxTitle>
                  <form onSubmit={handleSubmit}>
                    <InputLine
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      disabled={isLoading}
                      error={errors.email && touched.email && errors.email}
                      {...getFieldProps("email")}
                    />
                    <Button
                      disabled={!(isValid && dirty)}
                      type="submit"
                      size="extraLarge"
                      background="primary"
                      color="white"
                      isLoading={isLoading}
                      isFull>
                      Send reset code
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
  return (
    <S.Success>
      <div>
        <img src="/img/emailSent.svg" alt="email sent" />
      </div>
      <h2>Email has been sent!</h2>
      <p>
        If this email address was used to create an account, a code will arrive in your email.
        Please check your email.
      </p>
      <small>You will be automatically redirected in 5 seconds. </small>
    </S.Success>
  );
};
