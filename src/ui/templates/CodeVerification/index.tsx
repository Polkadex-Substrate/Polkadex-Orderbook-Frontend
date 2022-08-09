import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Button, InputLine, Orderbook } from "@polkadex/orderbook-ui/molecules";
import { codeValidations } from "@polkadex/orderbook/validations";
import { useTimer } from "@polkadex/orderbook/v2/hooks";
import { useCodeVerification } from "@polkadex/orderbook-hooks";
const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const CodeVerificationTemplate = () => {
  const [state, setState] = useState(false);
  const { verifyCode, resendVerificationCode } = useCodeVerification();
  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: codeValidations,
    onSubmit: (values) => {
      console.log(values);
      verifyCode(values.code);
    },
  });

  return (
    <>
      <Head>
        <title>Verification Code | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Container>
            <S.Title>
              <div>
                <Orderbook />
              </div>
              <span>
                Not a member? <Link href="/sign"> Sign Up</Link>
              </span>
            </S.Title>
            <S.Card>
              <S.Column />
              <S.Box>
                <h1>Code Verification</h1>
                <form onSubmit={handleSubmit}>
                  <InputLine
                    name="code"
                    label="Code Verification"
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
                    Verify code
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
