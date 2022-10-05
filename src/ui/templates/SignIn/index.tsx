import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";

import * as S from "./styles";

import { Button, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { signValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useSignIn } from "@polkadex/orderbook-hooks";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";

export const SignInTemplate = () => {
  const { signIn, loading } = useSignIn();
  const [state, setState] = useState(false);
  const [view, setView] = useState(false);
  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: signValidations,
    onSubmit: (values) => signIn(values.email, values.password),
  });

  return (
    <>
      <Head>
        <title>Login | Polkadex Orderbook</title>
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
                Not a member? <Link href="/sign"> Sign Up</Link>
              </span>
            </S.Title>

            <S.Card>
              <S.Column>
                <div>
                  <h2>Welcome Back!</h2>
                  <p>Buy and Sell Cryptocurrencies. Fast and Secure</p>
                </div>
              </S.Column>
              <S.Box>
                <h1>Sign In to Orderbook</h1>
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
                    type={view ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password && touched.password && errors.password}
                    disabled={loading}
                    {...getFieldProps("password")}>
                    <S.Show type="button" onClick={() => setView(!view)}>
                      {view ? <Icons.Hidden /> : <Icons.Show />}
                    </S.Show>
                  </InputLine>
                  <S.Terms>
                    <span>
                      By clicking the submit button below,I hereby agree with Polkadex{" "}
                      <a
                        href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
                        target="_blank"
                        rel="noreferrer">
                        Terms of Service and Privacy Policy
                      </a>
                    </span>
                  </S.Terms>
                  <Button
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    disabled={!(isValid && dirty) || loading}
                    isFull
                    isLoading={loading}>
                    Log In
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
