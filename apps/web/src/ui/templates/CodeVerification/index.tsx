import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import {
  Button,
  InputLine,
  OrderbookLogo,
} from "@polkadex/orderbook-ui/molecules";
import { codeValidations } from "@orderbook/core/validations";
import { useTimer } from "@orderbook/core/hooks";
import { Header, Menu } from "@polkadex/orderbook-ui/organisms";
import { useAuth } from "@orderbook/core/providers/user/auth";

import * as S from "./styles";

export const CodeVerificationTemplate = ({ email }: { email: string }) => {
  const { onCodeVerification, onResendCode } = useAuth();
  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } =
    useFormik({
      initialValues: {
        code: "",
      },
      validationSchema: codeValidations,
      onSubmit: (values) => {
        onCodeVerification({ email, code: values.code });
      },
    });

  const { t } = useTranslation("codeVerification");
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
                <S.Column />
                <S.Box>
                  <h1>{t("heading")}</h1>
                  <form onSubmit={handleSubmit}>
                    <InputLine
                      label={t("inputLabel")}
                      placeholder="000000"
                      error={touched.code ? errors.code : ""}
                      {...getFieldProps("code")}
                    >
                      <Resend onResend={() => onResendCode(email)} />
                    </InputLine>
                    <Button
                      disabled={!(isValid && dirty)}
                      type="submit"
                      size="extraLarge"
                      background="primary"
                      color="white"
                      isFull
                    >
                      {t("verifyCode")}
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

const Resend = ({ onResend }) => {
  const { time, setTime } = useTimer({ direction: "down" });
  const handleResend = () => {
    setTime(60);
    onResend();
  };

  const { t } = useTranslation("codeVerification");
  return (
    <S.ResendButton disabled={time !== 0} type="button" onClick={handleResend}>
      {time === 0 ? t("resend.resendCode") : t("resend.timer", { time })}
    </S.ResendButton>
  );
};
