import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Button, Checkbox, InputLine, Orderbook } from "@polkadex/orderbook-ui/molecules";
import { signUpValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useSignUp } from "@polkadex/orderbook-hooks";
const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const SignTemplate = () => {
  const { signUp } = useSignUp();
  const [state, setState] = useState(false);
  const [view, setView] = useState({
    password: false,
    repeatPassword: false,
  });

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
      email: "",
      terms: false,
    },
    validationSchema: signUpValidations,
    onSubmit: (values) => {
      console.log(values);
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
                <Orderbook />
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
                    {...getFieldProps("email")}
                  />
                  <InputLine
                    name="password"
                    type={view.password ? "text" : "password"}
                    label="Password"
                    placeholder="Enter your password"
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
                  {/* <S.Terms>
                    <Checkbox id="terms" name="terms" {...getFieldProps("terms")} />
                    <span>
                      Creating an account means you’re okay with our
                      <a href="/"> Terms of Service</a> and <a href="/"> Privacy Policy</a>
                    </span>
                  </S.Terms> */}
                  <Button
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    disabled={!(isValid && dirty)}
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
