import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";

import * as S from "./styles";

import { defaultConfig } from "@polkadex/orderbook-config";
import { Button, Checkbox, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { signUpValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Menu } from "@polkadex/orderbook-ui/organisms";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";

export const SignTemplate = () => {
  const {
    signup: { isLoading: loading },
    onSignUp,
  } = useAuth();
  const [state, setState] = useState(false);
  const [view, setView] = useState({
    password: false,
    repeatPassword: false,
  });

  const {
    touched,
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    dirty,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
      email: "",
      termsAccepted: false,
    },
    validationSchema: signUpValidations,
    onSubmit: (values) => {
      const { password, email } = values;
      onSignUp({ email, password });
    },
  });

  return (
    <>
      <Head>
        <title>New Account | Polkadex Orderbook</title>
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
                Already a member? <Link href="/signIn"> Sign In</Link>
              </span>
            </S.Title>
            <S.Card>
              <S.Column>
                <div>
                  <h2>Discover the decentralized world.</h2>
                  <p>
                    Polkadex is a fully non-custodial platform, so the assets in your wallet
                    are always under your control.
                  </p>
                </div>
              </S.Column>
              <S.Box>
                <h1>Sign up to Orderbook</h1>
                {!defaultConfig.signUpDisabled ? (
                  <form onSubmit={handleSubmit}>
                    <InputLine
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      error={errors.email && touched.email && errors.email}
                      disabled={loading}
                      {...getFieldProps("email")}
                    />
                    <InputLine
                      name="password"
                      type={view.password ? "text" : "password"}
                      label="Password"
                      placeholder="Enter your password"
                      disabled={loading}
                      error={errors.password && touched.password && errors.password}
                      {...getFieldProps("password")}>
                      <S.Show
                        type="button"
                        onClick={() => setView({ ...view, password: !view.password })}>
                        {view.password ? <Icons.Show /> : <Icons.Hidden />}
                      </S.Show>
                    </InputLine>
                    <InputLine
                      name="repeatPassword"
                      type={view.repeatPassword ? "text" : "password"}
                      label="Repeat password"
                      placeholder="Repeat your password"
                      disabled={loading}
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
                        {view.repeatPassword ? <Icons.Show /> : <Icons.Hidden />}
                      </S.Show>
                    </InputLine>
                    <S.Terms>
                      <Checkbox
                        checked={values.termsAccepted}
                        onChange={() => setFieldValue("termsAccepted", !values.termsAccepted)}>
                        <span>
                          By clicking the Create Account button below, I hereby agree with
                          Polkadex{" "}
                          <a
                            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                            target="_blank"
                            rel="noreferrer">
                            Terms of Service
                          </a>
                          ,{" "}
                          <a
                            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
                            target="_blank"
                            rel="noreferrer">
                            Privacy Policy
                          </a>
                          ,{" "}
                          <a
                            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
                            target="_blank"
                            rel="noreferrer">
                            Disclaimer and Legal Notice
                          </a>{" "}
                        </span>
                      </Checkbox>
                    </S.Terms>
                    <Button
                      type="submit"
                      size="extraLarge"
                      background="primary"
                      color="white"
                      disabled={!(isValid && dirty) || loading}
                      isFull
                      isLoading={loading}>
                      Create Account
                    </Button>
                  </form>
                ) : (
                  <S.Disabled>
                    We are only onboarding 50 users per week at the moment. The limit has
                    reached for this week. Check back soon.
                  </S.Disabled>
                )}
              </S.Box>
            </S.Card>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
