import Link from "next/link";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { HeaderBack } from "@polkadex/orderbook-ui/organisms";
import {
  Button,
  Dropdown,
  Icon,
  InputPrimary,
  Loading,
  MnemonicExport,
  MyAccountLoading,
  SelectAccount,
} from "@polkadex/orderbook-ui/molecules";
import { PaperWallet } from "@polkadex/orderbook-ui/templates";
import { FlexSpaceBetween } from "@polkadex/orderbook-ui/atoms";
import { useMnemonic } from "@polkadex/orderbook-hooks";
import { useSignUp } from "@polkadex/orderbook/v2/hooks";
import { setMainAccountFetch, signUp } from "@polkadex/orderbook-modules";

const defaultValues = {
  password: "",
  accountName: "",
  selectedAccount: {
    address: "",
    meta: {
      name: "",
      source: "",
    },
    type: [],
  },
};

export const SignUpTemplate = () => {
  const dispatch = useDispatch();
  const { mnemonic, mnemoicString } = useMnemonic();
  const {
    signUpLoading,
    isLoading,
    handlePrint,
    isSuccess,
    isPublicBranch,
    signUpSuccess,
    componentRef,
    extensionAccounts,
  } = useSignUp();

  if (signUpSuccess) return <div />;

  return (
    <S.Main>
      {!!mnemonic?.length && (
        <div style={{ display: "none" }}>
          <PaperWallet
            mnemonic={mnemonic}
            mnemoicString={mnemoicString}
            forwardedRef={componentRef}
          />
        </div>
      )}
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
              <Loading isActive={isSuccess} color="primaryBackgroundOpacity">
                <S.Form>
                  <Formik
                    initialValues={defaultValues}
                    onSubmit={async (values) => {
                      const { password, accountName } = values;
                      if (!isPublicBranch) {
                        dispatch(
                          signUp({
                            accountName,
                            mnemonic: mnemoicString,
                            password,
                          })
                        );
                      } else alert("signup is not available for beta");
                    }}>
                    {({ values, errors, touched, setFieldValue }) => (
                      <Form>
                        <Dropdown
                          direction="bottom"
                          isClickable
                          header={
                            <SelectAccount
                              isHeader
                              accountName={
                                values?.selectedAccount?.meta?.name ||
                                "Select your main account"
                              }
                              fullDescription
                              address={
                                values?.selectedAccount?.address ||
                                "This wallet will be linked to your Polkadex account"
                              }
                            />
                          }>
                          <S.SelectContent isOverflow={extensionAccounts?.length > 2}>
                            {isLoading ? (
                              <MyAccountLoading />
                            ) : extensionAccounts?.length ? (
                              extensionAccounts.map((item, index) => (
                                <SelectAccount
                                  isActive={item.address === values?.selectedAccount?.address}
                                  key={index}
                                  accountName={item.meta.name || `Account ${index}`}
                                  address={item.address}
                                  onClick={() => {
                                    setFieldValue("selectedAccount", extensionAccounts[index]);
                                    dispatch(setMainAccountFetch(extensionAccounts[index]));
                                  }}
                                />
                              ))
                            ) : (
                              <S.SelectMessage>
                                You dont have account, please create one
                              </S.SelectMessage>
                            )}
                          </S.SelectContent>
                        </Dropdown>
                        <MnemonicExport label="12-word mnemonic seed" phrases={mnemonic} />
                        <InputPrimary
                          label="Proxy account name"
                          placeholder="Proxy account act as a controller for you main account"
                          type="accountName"
                          name="accountName"
                          error={
                            errors.accountName && touched.accountName && errors.accountName
                          }
                        />
                        <InputPrimary
                          label="Password"
                          placeholder="Enter your password for this account"
                          type="password"
                          name="password"
                          error={errors.password && touched.password && errors.password}
                        />
                        <FlexSpaceBetween style={{ marginTop: 20 }}>
                          <Button size="extraLarge" type="submit" disabled={signUpLoading}>
                            {signUpLoading ? "Loading.." : "Create Account"}
                          </Button>
                          <Button
                            onClick={handlePrint}
                            type="button"
                            background="transparent"
                            color="text"
                            style={{ padding: 0 }}
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
              </Loading>
              <S.Footer>
                <p>
                  Do you want to import an account?
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
