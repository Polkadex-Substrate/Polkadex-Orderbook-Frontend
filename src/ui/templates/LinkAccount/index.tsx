import Head from "next/head";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { linkAccountValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useLinkMainAccount, useReduxSelector } from "@polkadex/orderbook-hooks";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import { Loading } from "@polkadex/orderbook/v3/ui/molecules";
import {
  selectIsRegisterMainAccountSuccess,
  selectTradeAccountsLoading,
  selectTradeAccountsSuccess,
} from "@polkadex/orderbook-modules";
import { PassCode } from "@polkadex/orderbook-ui/molecules/Input";
import { Mnemonic } from "@polkadex/orderbook-ui/organisms";

export const LinkAccountTemplate = () => {
  const [state, setState] = useState(false);
  const [mnemoicString, setMnemonicString] = useState("");

  const router = useRouter();

  const handleMnemonicUpdate = (value) => setMnemonicString(value);

  const successRegisterMainAccount = useReduxSelector(selectIsRegisterMainAccountSuccess);
  const successRegisterTradeAccount = useReduxSelector(selectTradeAccountsSuccess);
  const isRegisterTradeAccountLoading = useReduxSelector(selectTradeAccountsLoading);

  const { currentMainAccount, shortWallet, loading, registerMainAccount } =
    useLinkMainAccount();

  const { values, errors, touched, handleSubmit, isValid, getFieldProps, setFieldValue } =
    useFormik({
      initialValues: {
        name: "trade-account",
        passcode: "",
      },
      validationSchema: linkAccountValidations,
      onSubmit: (values) =>
        registerMainAccount(currentMainAccount, values.name, mnemoicString),
    });

  useEffect(() => {
    if (successRegisterMainAccount && successRegisterTradeAccount)
      router.push("/accountManager");
  }, [successRegisterTradeAccount, router, successRegisterMainAccount]);

  return (
    <>
      <Head>
        <title>Link Account | Polkadex Orderbook</title>
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
              <div>
                <h1>Link Account</h1>
                <p>
                  Polkadex is a fully non-custodial platform, so the assets in your wallet are
                  always under your control.
                </p>
              </div>
            </S.Column>
            <S.Box>
              <Loading
                message="Block finalization will take a few mins."
                isVisible={loading || isRegisterTradeAccountLoading}>
                <form onSubmit={handleSubmit}>
                  <Mnemonic handleMnemonicUpdate={handleMnemonicUpdate} />
                  <S.SelectInput>
                    <S.SelectInputContainer>
                      <S.SelectAccount>
                        <S.SelectAccountContainer>
                          <Icons.Avatar />
                        </S.SelectAccountContainer>
                        <S.SelectAccountContainer>
                          <div>
                            <strong>
                              {currentMainAccount?.name || "Select your main account"}
                            </strong>
                            <span>{shortWallet}</span>
                          </div>
                        </S.SelectAccountContainer>
                      </S.SelectAccount>
                    </S.SelectInputContainer>
                  </S.SelectInput>
                  <InputLine
                    name="name"
                    label="Trading account name (Optional)"
                    placeholder="Enter a name for your trading account"
                    error={errors.name && touched.name && errors.name}
                    disabled={loading}
                    {...getFieldProps("name")}
                  />
                  <PassCode
                    numInputs={5}
                    onChange={(e) => setFieldValue("passcode", e)}
                    value={values.passcode}
                    name="passcode"
                    label="5-digit trading password (Optional)"
                    error={errors.passcode}
                    isDisabled={loading}
                  />

                  <Button
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    disabled={!isValid || loading}
                    isFull>
                    {loading ? "Loading..." : "Register Account"}
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
