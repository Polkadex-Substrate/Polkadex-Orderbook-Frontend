import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";

import * as S from "./styles";

import { Button, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { newPasswordValidations } from "@polkadex/orderbook/validations";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const ResetPasswordFormTemplate = () => {
  const [state, setState] = useState(false);
  const [view, setView] = useState({
    password: false,
    repeatPassword: false,
  });

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: newPasswordValidations,
    onSubmit: (values) => console.log(values),
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
                  <Button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    isFull>
                    Continue
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
