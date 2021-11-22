import Link from "next/link";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";

import * as S from "./styles";

import { HeaderBack } from "@polkadex/orderbook-ui/organisms";
import { Button, Icon, InputPrimary } from "@polkadex/orderbook-ui/molecules";
import { FlexSpaceBetween } from "@polkadex/orderbook-ui/atoms";
import { MnemonicExport } from "@polkadex/orderbook-ui/molecules/Mnemonic";
import { useMnemonic } from "@polkadex/orderbook-hooks";
import { signUp } from "@polkadex/orderbook-modules";

const defaultValues = {
  password: "",
  accountName: "Main Account",
};
export const SignUpTemplate = () => {
  const dispatch = useDispatch();
  const { mnemonic, mnemoicString } = useMnemonic();

  return (
    <S.Main>
      <S.Wrapper>
        <S.Content>
          <HeaderBack />
          <S.Container>
            <S.AsideLeft>
              <S.Title>
                <h1>Create an account</h1>
                <p>
                  Do you have an account? <Link href="/login"> Sign in </Link>
                </p>
              </S.Title>
              <S.Form>
                <Formik
                  initialValues={defaultValues}
                  onSubmit={async (values) => {
                    const { password, accountName } = values;
                    dispatch(
                      signUp({
                        accountName,
                        mnemonic: mnemoicString,
                        password,
                      })
                    );
                  }}>
                  {({ errors, touched }) => (
                    <Form>
                      <MnemonicExport label="12-word mnemonic seed" phrases={mnemonic} />
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
                      <FlexSpaceBetween style={{ marginTop: 20 }}>
                        <Button size="extraLarge" type="submit">
                          Verify Account
                        </Button>
                        <Button
                          background="transparent"
                          color="text"
                          icon={{
                            size: "large",
                            name: "Print",
                            background: "inverse",
                            color: "text",
                          }}>
                          Print mnemonic
                        </Button>
                      </FlexSpaceBetween>
                    </Form>
                  )}
                </Formik>
              </S.Form>
              <S.Footer>
                <p>
                  Do you want to import an account?{" "}
                  <Link href="/recovery"> Import Account </Link>
                </p>
              </S.Footer>
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
