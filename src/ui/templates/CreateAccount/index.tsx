import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const CreateAccountTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      amount: 0.0,
      asset: null,
    },
    validationSchema: withdrawValidations,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Head>
        <title>Create Account | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title type="button" onClick={() => router.back()}>
            <div>
              <Icons.SingleArrowLeft />
            </div>
            Overview
          </S.Title>
          <S.Container>
            <S.Column>
              <S.ColumnWrapper>
                <h1>Create Account</h1>
                <p>
                  Did you know that you can use your account in the Polkadex Mobile app?
                  <br />
                  <br />
                  Download your paper wallet and scan the qr code.
                </p>
                <S.Download>
                  <a href="/" target="_blank">
                    <span>
                      <Icons.Apple />
                    </span>
                    App store
                  </a>
                  <a href="/" target="_blank">
                    <span>
                      <Icons.Android />
                    </span>
                    Google Play
                  </a>
                </S.Download>
              </S.ColumnWrapper>
            </S.Column>
            <S.Box>
              <form onSubmit={handleSubmit}>
                <InputLine
                  name="amount"
                  label="Account Name (Optional)"
                  placeholder="Enter a name for this account"
                  error={errors.amount && touched.amount && errors.amount}
                  {...getFieldProps("amount")}
                />

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
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
