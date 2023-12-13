import Head from "next/head";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { generateUsername } from "friendly-username-generator";
import { useTranslation } from "next-i18next";
import { Button, InputLine, Loading } from "@polkadex/orderbook-ui/molecules";
import { createAccountValidations } from "@orderbook/core/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Mnemonic, Menu, Header } from "@polkadex/orderbook-ui/organisms";
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";

import * as S from "./styles";

export const CreateAccountTemplate = () => {
  const { onRegisterTradeAccount, registerStatus } = useWalletProvider();
  const isLoading = registerStatus === "loading";

  const router = useRouter();

  const { touched, handleSubmit, errors, getFieldProps, isValid } = useFormik({
    initialValues: {
      name: generateUsername({ useRandomNumber: false }),
      passcode: "",
    } as Record<string, string>,
    validationSchema: createAccountValidations,
    onSubmit: (values) => {
      typeof onRegisterTradeAccount === "function" &&
        onRegisterTradeAccount({
          name: values.name,
          password: String(values.passcode),
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
                <Loading
                  message={tc("blockFinalizationMessage")}
                  isVisible={isLoading}
                >
                  <form onSubmit={handleSubmit}>
                    <Mnemonic />
                    <InputLine
                      label={t("inputLabel")}
                      placeholder={t("inputPlaceholder")}
                      error={touched.name ? errors.name : ""}
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
                      isLoading={isLoading}
                    >
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
