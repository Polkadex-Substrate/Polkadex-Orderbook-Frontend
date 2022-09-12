import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Button, InputLine, Loading } from "@polkadex/orderbook-ui/molecules";
import { createAccountValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Mnemonic } from "@polkadex/orderbook-ui/organisms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import {
  registerTradeAccountFetch,
  selectRegisterTradeAccountLoading,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const CreateAccountTemplate = () => {
  const [state, setState] = useState(false);
  const [mnemoicString, setMnemonicString] = useState("");
  const isLoading = useReduxSelector(selectRegisterTradeAccountLoading);

  const router = useRouter();
  const dispatch = useDispatch();
  const handleMnemonicUpdate = (value) => setMnemonicString(value);

  const { touched, handleSubmit, errors, getFieldProps, isValid } = useFormik({
    initialValues: {
      name: "trade-account-2",
      password: "",
    } as Record<string, string>,
    validationSchema: createAccountValidations,
    onSubmit: (values) => {
      dispatch(
        registerTradeAccountFetch({
          name: values.name,
          password: values.password,
          mnemonic: mnemoicString,
        })
      );
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
              <Loading
                message="Block finalization will take a few mins."
                isVisible={isLoading}>
                <form onSubmit={handleSubmit}>
                  <Mnemonic handleMnemonicUpdate={handleMnemonicUpdate} />
                  <InputLine
                    name="name"
                    label="Account Name (Optional)"
                    placeholder="Enter a name for this account"
                    error={errors.name && touched.name && errors.name}
                    {...getFieldProps("name")}
                  />
                  {/* <InputLine
                    name="password"
                    label="Password (Optional)"
                    placeholder="Enter a password for this account"
                    type="password"
                    error={errors.password && touched.password && errors.password}
                    disabled={isLoading}
                    {...getFieldProps("password")}
                  /> */}
                  <Button
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    disabled={!isValid || isLoading}
                    isFull
                    isLoading={isLoading}>
                    Create Account
                  </Button>
                </form>
              </Loading>
            </S.Box>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
