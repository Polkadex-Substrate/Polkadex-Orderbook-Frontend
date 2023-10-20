import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import {
  Button,
  InputLine,
  OrderbookLogo,
} from "@polkadex/orderbook-ui/molecules";
import { signValidations } from "@orderbook/core/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Menu, Header } from "@polkadex/orderbook-ui/organisms";
import { useAuth } from "@orderbook/core/providers/user/auth";

import * as S from "./styles";

export const SignInTemplate = () => {
  const {
    signin: { isLoading },
    onSignIn,
  } = useAuth();
  const [view, setView] = useState(false);

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } =
    useFormik({
      initialValues: {
        password: "",
        email: "",
      },
      validationSchema: signValidations,
      onSubmit: (values) =>
        onSignIn({
          email: values.email.toLowerCase(),
          password: values.password,
        }),
    });

  const { t } = useTranslation("signin");
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
                  {t("notMember")} <Link href="/sign"> {tc("signUp")}</Link>
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
                  <form onSubmit={handleSubmit}>
                    <InputLine
                      label={t("card.input.email.label")}
                      placeholder={t("card.input.email.placeHolder")}
                      error={touched.email ? errors.email : ""}
                      disabled={isLoading}
                      {...getFieldProps("email")}
                    />
                    <InputLine
                      type={view ? "text" : "password"}
                      label={t("card.input.password.label")}
                      labelRight={
                        <S.InputLineLink>
                          <Link href="/resetPassword">
                            {t("card.input.password.forgotPassword")}
                          </Link>
                        </S.InputLineLink>
                      }
                      placeholder={t("card.input.password.placeHolder")}
                      error={touched.password ? errors.password : []}
                      disabled={isLoading}
                      {...getFieldProps("password")}
                    >
                      <S.Show type="button" onClick={() => setView(!view)}>
                        {view ? <Icons.Show /> : <Icons.Hidden />}
                      </S.Show>
                    </InputLine>
                    <S.Terms>
                      <span>
                        By clicking the Log In button below, I hereby agree with
                        Polkadex{" "}
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
                        </a>
                      </span>
                    </S.Terms>
                    <Button
                      type="submit"
                      size="extraLarge"
                      background="primary"
                      color="white"
                      disabled={!(isValid && dirty) || isLoading}
                      isFull
                      isLoading={isLoading}
                    >
                      {tc("login")}
                    </Button>
                  </form>
                </S.Box>
              </S.Card>
            </S.Container>
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
