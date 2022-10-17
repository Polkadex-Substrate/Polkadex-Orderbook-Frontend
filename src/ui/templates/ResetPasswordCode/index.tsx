import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";

import * as S from "./styles";

import { Button, InputLine, OrderbookLogo } from "@polkadex/orderbook-ui/molecules";
import { codeValidations } from "@polkadex/orderbook/validations";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import { useCodeVerification, useTimer } from "@polkadex/orderbook-hooks";

export const ResetPasswordCodeTemplate = () => {
  const [state, setState] = useState(false);
  const { verifyCode, resendVerificationCode } = useCodeVerification();

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: codeValidations,
    onSubmit: (values) => console.log(values),
  });

  return (
    <>
      <Head>
        <title>Reset password code verification | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Container>
            <S.Title>
              <div>
                <OrderbookLogo />
              </div>
            </S.Title>
            <S.Card>
              <S.Column />
              <S.Box>
                <S.BoxTitle>
                  <h1>Security verification</h1>
                  <p>To secure your account, please complete the following verification</p>
                </S.BoxTitle>
                <form onSubmit={handleSubmit}>
                  <InputLine
                    name="email"
                    label="Email code verification"
                    placeholder="000000"
                    error={errors.code && touched.code && errors.code}
                    {...getFieldProps("code")}>
                    <Resend onResend={() => resendVerificationCode()} />
                  </InputLine>
                  <Button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    isFull>
                    Continue
                  </Button>
                </form>
              </S.Box>
            </S.Card>
          </S.Container>
        </S.Wrapper>
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
  return (
    <S.ResendButton disabled={time !== 0} type="button" onClick={handleResend}>
      {time === 0 ? "Resend Code" : `Resend Code in ${time}s`}
    </S.ResendButton>
  );
};
