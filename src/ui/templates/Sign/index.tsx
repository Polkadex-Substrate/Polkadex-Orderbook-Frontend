import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";

import * as S from "./styles";

import { Button, Checkbox, InputLine, Orderbook } from "@polkadex/orderbook-ui/molecules";
import { signValidations } from "@polkadex/orderbook/validations";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const SignTemplate = () => {
  const [state, setState] = useState(false);

  const { touched, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
      email: "",
      terms: false,
    },
    validationSchema: signValidations,
    onSubmit: (values) => {
      console.log(values);
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
                <Orderbook />
              </div>
              <span>
                Already a member? <Link href="/login"> Sign In</Link>
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
                    {...getFieldProps("email")}
                  />
                  <InputLine
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password && touched.password && errors.password}
                    {...getFieldProps("password")}
                  />
                  <InputLine
                    name="repeatPassword"
                    type="password"
                    label="Repeat password"
                    placeholder="Repeat your password"
                    error={
                      errors.repeatPassword && touched.repeatPassword && errors.repeatPassword
                    }
                    {...getFieldProps("repeatPassword")}
                  />
                  <S.Terms>
                    <Checkbox
                      error={errors.terms && touched.terms && errors.terms}
                      id="terms"
                      name="terms"
                      {...getFieldProps("terms")}
                    />
                    <span>
                      Creating an account means you’re okay with our
                      <a href="/"> Terms of Service</a> and <a href="/"> Privacy Policy</a>
                    </span>
                  </S.Terms>
                  <Button
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    isFull>
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
