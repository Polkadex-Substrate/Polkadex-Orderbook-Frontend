import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";

import * as S from "./styles";

import { Button, Checkbox, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { signUpValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useSignUp } from "@polkadex/orderbook-hooks";
import { Menu } from "@polkadex/orderbook-ui/organisms";

export const SignTemplate = () => {
  const { signUp, loading } = useSignUp();
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
      signUp(email, password);
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
                      {view.password ? <Icons.Hidden /> : <Icons.Show />}
                    </S.Show>
                  </InputLine>
                  <InputLine
                    name="repeatPassword"
                    type={view.repeatPassword ? "text" : "password"}
                    label="Repeat password"
                    placeholder="Repeat your password"
                    disabled={loading}
                    error={
                      errors.repeatPassword && touched.repeatPassword && errors.repeatPassword
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
                  <S.Terms>
                    <Checkbox
                      checked={values.termsAccepted}
                      onChange={() => setFieldValue("termsAccepted", !values.termsAccepted)}>
                      <span>
                        By clicking the submit button below,I hereby agree with Polkadex{" "}
                        <a
                          href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
                          target="_blank"
                          rel="noreferrer">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
                          target="_blank"
                          rel="noreferrer">
                          Privacy Policy
                        </a>
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
              </S.Box>
            </S.Card>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
