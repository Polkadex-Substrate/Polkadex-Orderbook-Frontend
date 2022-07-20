import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Button, InputLine, Orderbook } from "@polkadex/orderbook-ui/molecules";
import { codeValidations } from "@polkadex/orderbook/validations";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const CodeVerificationTemplate = () => {
  const router = useRouter();
  const [state, setState] = useState(false);

  const { touched, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: codeValidations,
    onSubmit: (values) => {
      console.log(values);
      router.push("/accountManager");
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
                    placeholder="Type the code sent code to your email"
                    error={errors.code && touched.code && errors.code}
                    {...getFieldProps("code")}
                  />

                  <Button
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
