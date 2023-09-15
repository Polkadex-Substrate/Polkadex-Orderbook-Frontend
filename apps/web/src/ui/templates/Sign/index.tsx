import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { defaultConfig } from "@orderbook/core/config";
import {
  Button,
  Checkbox,
  InputLine,
  OrderbookLogo,
} from "@polkadex/orderbook-ui/molecules";
import { signUpValidations } from "@orderbook/core/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Header, Menu } from "@polkadex/orderbook-ui/organisms";
import { useAuth } from "@orderbook/core/providers/user/auth";

import * as S from "./styles";

export const SignTemplate = () => {
  const {
    signup: { isLoading: loading },
    onSignUp,
  } = useAuth();
  const [view, setView] = useState({
    password: false,
    repeatPassword: false,
  });

  const {
    touched,
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    dirty,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
      email: "",
      termsAccepted: false,
    },
    validationSchema: signUpValidations,
    onSubmit: (values) => {
      const { password, email } = values;
      onSignUp({ email, password });
    },
  });

  const { t } = useTranslation("sign");
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
            <S.Container>
              <S.Title>
                <div>
                  <OrderbookLogo />
                </div>
                <span>
                  {t("alreadyMember")}{" "}
                  <Link href="/signIn"> {t("signIn")}</Link>
                </span>
              </S.Title>
              <S.Card>
                <S.Column>
                  <div>
                    <h2>{t("card.title")}</h2>
                    <p>{t("card.description")}</p>
                  </div>
                </S.Column>
                <S.Box>
                  <h1>{t("card.secondaryTitle")}</h1>
                  {!defaultConfig.signUpDisabled ? (
                    <form onSubmit={handleSubmit}>
                      <InputLine
                        label={t("card.input.email.label")}
                        placeholder={t("card.input.email.placeHolder")}
                        error={touched.email ? errors.email : ""}
                        disabled={loading}
                        {...getFieldProps("email")}
                      />
                      <InputLine
                        type={view.password ? "text" : "password"}
                        label={t("card.input.password.label")}
                        placeholder={t("card.input.password.placeHolder")}
                        disabled={loading}
                        error={touched.password ? errors.password : ""}
                        {...getFieldProps("password")}
                      >
                        <S.Show
                          type="button"
                          onClick={() =>
                            setView({ ...view, password: !view.password })
                          }
                        >
                          {view.password ? <Icons.Show /> : <Icons.Hidden />}
                        </S.Show>
                      </InputLine>
                      <InputLine
                        type={view.repeatPassword ? "text" : "password"}
                        label={t("card.input.repeatPassword.label")}
                        placeholder={t("card.input.repeatPassword.placeHolder")}
                        disabled={loading}
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
                            <Icons.Show />
                          ) : (
                            <Icons.Hidden />
                          )}
                        </S.Show>
                      </InputLine>
                      <S.Terms>
                        <Checkbox
                          checked={values.termsAccepted}
                          onChange={() =>
                            setFieldValue(
                              "termsAccepted",
                              !values.termsAccepted
                            )
                          }
                        >
                          <span>
                            {t("card.checkBox")}{" "}
                            <a
                              href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {tc("termsOfService")}
                            </a>
                            ,{" "}
                            <a
                              href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {tc("privacyPolicy")}
                            </a>
                            ,{" "}
                            <a
                              href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {tc("disclaimerAndLegalNotice")}
                            </a>{" "}
                          </span>
                        </Checkbox>
                      </S.Terms>
                      <Button
                        type="submit"
                        size="extraLarge"
                        background="primary"
                        color="white"
                        disabled={!(isValid && dirty) || loading}
                        isFull
                        isLoading={loading}
                      >
                        {t("card.input.button")}
                      </Button>
                    </form>
                  ) : (
                    <S.Disabled>{t("card.input.disabledText")}</S.Disabled>
                  )}
                </S.Box>
              </S.Card>
            </S.Container>
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
