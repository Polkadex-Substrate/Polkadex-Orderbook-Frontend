import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import {
  Button,
  InputLine,
  OrderbookLogo,
} from "@polkadex/orderbook-ui/molecules";
import { resetPasswordValidations } from "@orderbook/core/validations";
import { Menu, Header } from "@polkadex/orderbook-ui/organisms";
import { useAuth } from "@orderbook/core/providers/user/auth";

import * as S from "./styles";

export const ResetPasswordTemplate = () => {
  const { forgotPassword, onForgotPasswordCode } = useAuth();
  const isLoading = forgotPassword.isLoading;
  const isSuccess = forgotPassword.isSuccess;

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: resetPasswordValidations,
      onSubmit: ({ email }) => {
        onForgotPasswordCode(email);
      },
    });

  const { t } = useTranslation("resetPassword");

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
            <S.Container>
              <S.Title>
                <div>
                  <OrderbookLogo />
                </div>
                <span>
                  {t("backTo")} <Link href="/signIn"> {t("login")}</Link>
                </span>
              </S.Title>
              {isSuccess ? (
                <Success />
              ) : (
                <S.Card>
                  <S.Column />
                  <S.Box>
                    <S.BoxTitle>
                      <h1>{t("card.title")}</h1>
                      <p>{t("card.description")}</p>
                    </S.BoxTitle>
                    <form onSubmit={handleSubmit}>
                      <InputLine
                        label={t("card.input.label")}
                        placeholder={t("card.input.placeHolder")}
                        disabled={isLoading}
                        error={touched.email ? errors.email : ""}
                        {...getFieldProps("email")}
                      />
                      <Button
                        disabled={!(isValid && dirty)}
                        type="submit"
                        size="extraLarge"
                        background="primary"
                        color="white"
                        isLoading={isLoading}
                        isFull
                      >
                        {t("card.button")}
                      </Button>
                    </form>
                  </S.Box>
                </S.Card>
              )}
            </S.Container>
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};

const Success = () => {
  const { t } = useTranslation("resetPassword");

  return (
    <S.Success>
      <div>
        <img src="/img/emailSent.svg" alt="email sent" />
      </div>
      <h2>{t("success.heading")}</h2>
      <p>{t("success.description")}</p>
      <small>{t("success.small")} </small>
    </S.Success>
  );
};
