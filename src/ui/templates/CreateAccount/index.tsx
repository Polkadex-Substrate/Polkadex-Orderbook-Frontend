import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Button, InputLine, PassCode } from "@polkadex/orderbook-ui/molecules";
import { createAccountValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Mnemonic } from "@polkadex/orderbook-ui/organisms";
const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const CreateAccountTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      name: "",
      passcode: "",
    },
    validationSchema: createAccountValidations,
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
                <Mnemonic />
                <InputLine
                  name="name"
                  label="Account Name (Optional)"
                  placeholder="Enter a name for this account"
                  error={errors.name && touched.name && errors.name}
                  {...getFieldProps("name")}
                />
                <InputLine
                  name="passcode"
                  label="Passcode"
                  placeholder="000000"
                  error={errors.passcode && touched.passcode && errors.passcode}
                  {...getFieldProps("passcode")}
                />
                {/* <PassCode
                  handleChange={(e) => console.log(e)}
                  name="passcode"
                  placeholder="0"
                  inputs={5}
                /> */}
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
