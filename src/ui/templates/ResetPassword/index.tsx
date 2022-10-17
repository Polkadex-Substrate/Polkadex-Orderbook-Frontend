import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";

import * as S from "./styles";

import { Button, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { resetPasswordValidations } from "@polkadex/orderbook/validations";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";

export const ResetPasswordTemplate = () => {
  const [state, setState] = useState(false);
  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordValidations,
    onSubmit: (values) => console.log(values),
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
                    error={errors.email && touched.email && errors.email}
                    {...getFieldProps("email")}
                  />
                  <Button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    isFull>
                    Reset password
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
