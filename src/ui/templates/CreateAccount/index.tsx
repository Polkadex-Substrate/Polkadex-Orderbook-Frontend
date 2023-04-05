import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { generateUsername } from "friendly-username-generator";

import * as S from "./styles";

import { Button, InputLine, Loading } from "@polkadex/orderbook-ui/molecules";
import { createAccountValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Mnemonic, Menu } from "@polkadex/orderbook-ui/organisms";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";

export const CreateAccountTemplate = () => {
  const [state, setState] = useState(false);
  const [mnemoicString, setMnemonicString] = useState("");
  const tradeWalletState = useTradeWallet();
  const isLoading = tradeWalletState.registerAccountLoading;

  const router = useRouter();
  const dispatch = useDispatch();
  const handleMnemonicUpdate = (value) => setMnemonicString(value);

  const { values, setFieldValue, touched, handleSubmit, errors, getFieldProps, isValid } =
    useFormik({
      initialValues: {
        name: generateUsername({ useRandomNumber: false }),
        passcode: "",
      } as Record<string, string>,
      validationSchema: createAccountValidations,
      onSubmit: (values) => {
        tradeWalletState.onRegisterTradeAccount({
          name: values.name,
          password: String(values.passcode),
          address: mnemoicString,
        });
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
                  {/* <PassCode */}
                  {/*  numInputs={5} */}
                  {/*  onChange={(e) => setFieldValue("passcode", e)} */}
                  {/*  value={values.passcode} */}
                  {/*  name="passcode" */}
                  {/*  label="5-digit trading password (Optional)" */}
                  {/*  error={errors.passcode} */}
                  {/*  isDisabled={isLoading} */}
                  {/* /> */}
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
