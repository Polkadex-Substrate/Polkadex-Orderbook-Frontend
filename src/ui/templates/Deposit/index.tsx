import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Button, Dropdown, InputLine } from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Icons, Tokens } from "@polkadex/orderbook-ui/atoms";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const DepositTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();

  const { touched, handleSubmit, errors, getFieldProps, setFieldValue, isValid, dirty } =
    useFormik({
      initialValues: {
        amount: 0.0,
        asset: null,
      },
      validationSchema: withdrawValidations,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  return (
    <>
      <Head>
        <title>Deposit | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title type="button" onClick={() => router.back()}>
            <div>
              <Icons.SingleArrowLeft />
            </div>
            Overview
          </S.Title>
          <S.Container>
            <S.Column>
              <div>
                <h1>Deposit Crypto</h1>
                <p>
                  Polkadex is a fully non-custodial platform, so the assets in your wallet are
                  always under your control.
                </p>
              </div>
            </S.Column>
            <S.Box>
              <S.SelectAccount>
                <div>
                  <Icons.Avatar />
                </div>
                <div>
                  <strong>Main Account</strong>
                  <span>esoDF9faq...9dD7GtQvg</span>
                </div>
              </S.SelectAccount>
              <form onSubmit={handleSubmit}>
                <S.SelectInput>
                  <span>Select a coin</span>
                  <S.SelectInputContainer>
                    <Dropdown
                      isClickable
                      direction="bottom"
                      header={
                        <S.DropdownHeader>
                          <div>
                            <span>
                              <Tokens.PDEX />
                            </span>
                            Polkadex PDEX
                          </div>
                          <div>
                            <span>
                              <Icons.ArrowBottom />
                            </span>
                          </div>
                        </S.DropdownHeader>
                      }>
                      <S.DropdownContent>
                        <button type="button" onClick={undefined}>
                          Polkadex PDEX
                        </button>
                      </S.DropdownContent>
                    </Dropdown>
                  </S.SelectInputContainer>
                  <S.Available>
                    Avlb <strong>120PDEX</strong>
                  </S.Available>
                </S.SelectInput>
                <InputLine
                  name="amount"
                  label="Token Amount"
                  placeholder="0.00"
                  error={errors.amount && touched.amount && errors.amount}
                  {...getFieldProps("amount")}
                />

                <Button
                  type="submit"
                  size="extraLarge"
                  background="primary"
                  color="white"
                  disabled={!(isValid && dirty)}
                  isFull>
                  Deposit
                </Button>
              </form>
            </S.Box>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
