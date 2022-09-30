// TODO: Move mnemonic state to Formik
import { Formik, Form } from "formik";
import { useState } from "react";
import Head from "next/head";
import { generateUsername } from "friendly-username-generator";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { HeaderBack } from "@polkadex/orderbook-ui/organisms";
import { Button, Icon, InputPrimary, MnemonicImport } from "@polkadex/orderbook-ui/molecules";
import { importValiations } from "@polkadex/orderbook/validations";
import { importTradeAccountFetch } from "@polkadex/orderbook-modules";

const defaultValues = {
  accountName: generateUsername({ useRandomNumber: false }),
};

export const RecoveryTemplate = () => {
  const [state, setState] = useState({ tags: [] });
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Import Wallet | Polkadex Orderbook</title>
        <meta name="description" content="Feels like a CEX, works like a DEX" />
      </Head>
      <S.Main>
        <S.Wrapper>
          <S.Content>
            <HeaderBack />
            <S.Container>
              <S.AsideLeft>
                <S.Title>
                  <h1>Import trade account</h1>
                  <p>Do you have a trade account? Import it here and start trading</p>
                </S.Title>
                <S.Form>
                  <Formik
                    initialValues={defaultValues}
                    validationSchema={importValiations}
                    onSubmit={async (values) => {
                      if (state.tags.length === 12) {
                        const { accountName } = values;
                        const mnemonicString = state.tags.join(" ");
                        dispatch(
                          importTradeAccountFetch({
                            mnemonic: mnemonicString,
                            name: accountName,
                            password: "",
                          })
                        );
                      }
                    }}>
                    {({ errors, touched, values }) => (
                      <Form>
                        <MnemonicImport
                          label="12-word mnemonic seed"
                          state={state}
                          handleChange={setState}
                        />
                        <InputPrimary
                          label="Account Name"
                          placeholder="Enter name for this account"
                          type="accountName"
                          name="accountName"
                          error={
                            errors.accountName && touched.accountName && errors.accountName
                          }
                        />
                        <Button
                          size="extraLarge"
                          type="submit"
                          disabled={state.tags.length < 12}
                          style={{ marginTop: 20 }}>
                          Import Account
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </S.Form>
              </S.AsideLeft>
              <S.AsideRight></S.AsideRight>
            </S.Container>
          </S.Content>
          <S.Box>
            <S.Card>
              <S.CardContent>
                <Icon size="extraLarge" color="inverse" name="Mnemonic" />
                <h4>What do you use mnemonic for?</h4>
                <p>
                  A Mnemonic Phrase is also called Seed Phrase or Recovery Backup for a
                  decentralized wallet. It is a list of words and proof of ownership of your
                  crypto assets. Polkadex does not store any information about your wallet.
                  <strong>Never share your mnemonic phrase with anyone</strong>
                </p>
              </S.CardContent>
            </S.Card>
          </S.Box>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
