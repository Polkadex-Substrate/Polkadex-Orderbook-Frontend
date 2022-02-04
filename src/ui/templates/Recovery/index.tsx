// TODO: Move mnemonic state to Formik
import Link from "next/link";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";

import * as S from "./styles";

import { HeaderBack } from "@polkadex/orderbook-ui/organisms";
import { Button, Icon, InputPrimary } from "@polkadex/orderbook-ui/molecules";
import { MnemonicImport } from "@polkadex/orderbook-ui/molecules/Mnemonic";
import { signUp } from "@polkadex/orderbook-modules";

const defaultValues = {
  password: "",
  accountName: "Main Account",
};

export const RecoveryTemplate = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ tags: [] });
  return (
    <S.Main>
      <S.Wrapper>
        <S.Content>
          <HeaderBack />
          <S.Container>
            <S.AsideLeft>
              <S.Title>
                <h1>Import an account</h1>
                <p>
                  Do you have an account? <Link href="/login"> Sign in </Link>
                </p>
              </S.Title>
              <S.Form>
                <Formik
                  initialValues={defaultValues}
                  onSubmit={async (values) => {
                    console.log("mnemonic array", state.tags);
                    if (state.tags.length === 12) {
                      const { password, accountName } = values;
                      console.log(state.tags, password, accountName);
                      const mnemoicString = state.tags.join(" ");
                      dispatch(
                        signUp({
                          accountName,
                          mnemonic: mnemoicString,
                          password,
                        })
                      );
                    } else alert("mnemonic not correct");
                  }}>
                  {({ errors, touched }) => (
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
                        error={errors.accountName && touched.accountName && errors.accountName}
                      />
                      <InputPrimary
                        label="Password"
                        placeholder="Enter your password for this account"
                        type="password"
                        name="password"
                        error={errors.password && touched.password && errors.password}
                      />
                      <Button size="extraLarge" type="submit" style={{ marginTop: 20 }}>
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
  );
};
