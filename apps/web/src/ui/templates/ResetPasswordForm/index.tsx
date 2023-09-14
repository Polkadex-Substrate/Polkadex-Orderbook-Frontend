import Head from "next/head";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";
import {
  Button,
  InputLine,
  OrderbookLogo,
} from "@polkadex/orderbook-ui/molecules";
import { newPasswordValidations } from "@orderbook/core/validations";
import { Menu, Header } from "@polkadex/orderbook-ui/organisms";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useAuth } from "@orderbook/core/providers/user/auth";

import * as S from "./styles";

export const ResetPasswordFormTemplate = () => {
  const [view, setView] = useState({
    password: false,
    repeatPassword: false,
  });
  const { forgotPassword, onForgotPassword } = useAuth();
  const isLoading = forgotPassword.isLoading;
  const isSuccess = forgotPassword.isSuccess;
  const email = forgotPassword.email;

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } =
    useFormik({
      initialValues: {
        password: "",
        repeatPassword: "",
        code: "",
      },
      validationSchema: newPasswordValidations,
      onSubmit: ({ code, password }) => {
        if (email) onForgotPassword({ email, code, newPassword: password });
      },
    });

  const { t } = useTranslation("resetPasswordForm");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <S.Wrapper>
            <S.Container>
              <S.Title>
                <div>
                  <OrderbookLogo />
                </div>
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
                        label={t("card.inputEmailLabel")}
                        placeholder="000000"
                        error={touched.code ? errors.code : ""}
                        disabled={isLoading}
                        {...getFieldProps("code")}
                      />
                      <InputLine
                        type={view.password ? "text" : "password"}
                        label={t("card.inputPasswordLabel")}
                        placeholder={t("card.inputPasswordPlaceHolder")}
                        disabled={isLoading}
                        error={touched.password ? errors.password : ""}
                        {...getFieldProps("password")}
                      >
                        <S.Show
                          type="button"
                          onClick={() =>
                            setView({ ...view, password: !view.password })
                          }
                        >
                          {view.password ? <Icons.Hidden /> : <Icons.Show />}
                        </S.Show>
                      </InputLine>
                      <InputLine
                        type={view.repeatPassword ? "text" : "password"}
                        label={t("card.inputRepeatPasswordLabel")}
                        placeholder={t("card.inputRepeatPasswordPlaceHolder")}
                        disabled={isLoading}
                        error={
                          touched.repeatPassword ? errors.repeatPassword : ""
                        }
                        {...getFieldProps("repeatPassword")}
                      >
                        <S.Show
                          type="button"
                          onClick={() =>
                            setView({
                              ...view,
                              repeatPassword: !view.repeatPassword,
                            })
                          }
                        >
                          {view.repeatPassword ? (
                            <Icons.Hidden />
                          ) : (
                            <Icons.Show />
                          )}
                        </S.Show>
                      </InputLine>
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
        <Menu />
      </S.Main>
    </>
  );
};

const Success = () => {
  useEffect(() => {
    confetti({
      zIndex: 9999,
      origin: {
        x: 0.53,
        y: 0.5,
      },
    });
  }, []);

  const { t } = useTranslation("resetPasswordForm");

  return (
    <S.Success>
      <div>
        <img src="/img/success.svg" alt="email sent" />
      </div>
      <h2>{t("success.heading")}</h2>
      <p>{t("success.description")}</p>
      <small>{t("success.small")} </small>
    </S.Success>
  );
};
