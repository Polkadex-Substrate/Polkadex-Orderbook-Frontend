import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { generateUsername } from "friendly-username-generator";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

import { Button, InputLine, Loading } from "@polkadex/orderbook-ui/molecules";
import { createAccountValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Mnemonic, Menu, Header } from "@polkadex/orderbook-ui/organisms";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";

export const CreateAccountTemplate = () => {
  const [mnemoicString, setMnemonicString] = useState("");
  const tradeWalletState = useTradeWallet();
  const extensionWalletState = useExtensionWallet();
  const isLoading = tradeWalletState.registerAccountLoading;

  const router = useRouter();
  const handleMnemonicUpdate = (value) => setMnemonicString(value);

  const { touched, handleSubmit, errors, getFieldProps, isValid } = useFormik({
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
        allAccounts: extensionWalletState.allAccounts,
      });
    },
  });

  const { t } = useTranslation("createAccount");
  const { t: tc } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu />
          <S.Wrapper>
            <S.Title type="button" onClick={() => router.back()}>
              <div>
                <Icons.SingleArrowLeft />
              </div>
              {t("overview")}
            </S.Title>
            <S.Container>
              <S.Column>
                <S.ColumnWrapper>
                  <h1>{tc("createAccount")}</h1>
                  <p>
                    {t("info")}
                    <br />
                    <br />
                    {t("downloadMessage")}
                  </p>
                  <S.Download>
                    <a href="/" target="_blank">
                      <span>
                        <Icons.Apple />
                      </span>
                      {t("appStore")}
                    </a>
                    <a href="/" target="_blank">
                      <span>
                        <Icons.Android />
                      </span>
                      {t("googlePlay")}
                    </a>
                  </S.Download>
                </S.ColumnWrapper>
              </S.Column>
              <S.Box>
                <Loading message={tc("blockFinalizationMessage")} isVisible={isLoading}>
                  <form onSubmit={handleSubmit}>
                    <Mnemonic handleMnemonicUpdate={handleMnemonicUpdate} />
                    <InputLine
                      name="name"
                      label={t("inputLabel")}
                      placeholder={t("inputPlaceholder")}
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
                      {tc("createAccount")}
                    </Button>
                  </form>
                </Loading>
              </S.Box>
            </S.Container>
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
