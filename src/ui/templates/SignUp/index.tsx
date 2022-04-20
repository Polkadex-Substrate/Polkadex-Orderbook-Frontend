import Link from "next/link";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";

import * as S from "./styles";

import { HeaderBack, QrCode } from "@polkadex/orderbook-ui/organisms";
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
import { FlexSpaceBetween, Icons } from "@polkadex/orderbook-ui/atoms";
import { useMnemonic } from "@polkadex/orderbook-hooks";
import { useSignUp } from "@polkadex/orderbook/v2/hooks";
import { signUp } from "@polkadex/orderbook-modules";

const defaultValues = {
  password: "",
  accountName: "Main Account",
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
  const [isVisible, setIsVisible] = useState(false);
  const { mnemonic, mnemoicString } = useMnemonic();
  const {
    isSuccess,
    signUpLoading,
    isLoading,
    accounts,
    handlePrint,
    isPublicBranch,
    signUpSuccess,
    componentRef,
  } = useSignUp();
  const success = true;
  if (signUpSuccess) return <div />;
  const mnemonicTest = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
    "test12",
  ];
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
              <Loading isActive={!isSuccess} color="primaryBackgroundOpacity">
                <S.Form>
                  <S.FormTitle>
                    <S.FormTitleWrapper>
                      {success && (
                        <S.SuccessWrapper>
                          <Icons.Checked />
                        </S.SuccessWrapper>
                      )}

                      <h3>Create your Polkadex Account</h3>
                    </S.FormTitleWrapper>
                    {success && <p>Congrats your account has been created !</p>}
                  </S.FormTitle>
                  {success ? (
                    <S.Phrases>
                      <S.PhrasesTitle>
                        <h5>My Mnemonic Phrases</h5>
                        <p>Never share your mnemonic seed with anyone. </p>
                      </S.PhrasesTitle>
                      <div>
                        <S.PhrasesContent>
                          {mnemonicTest.map((phrase, i) => (
                            <div key={i}>
                              <span>{i + 1}.</span>
                              <p>{phrase}</p>
                            </div>
                          ))}
                        </S.PhrasesContent>
                      </div>
                      <Button
                        onClick={handlePrint}
                        type="button"
                        background="transparent"
                        color="text"
                        style={{ padding: 0, marginTop: "2rem" }}
                        icon={{
                          size: "large",
                          name: "Print",
                          background: "inverse",
                          color: "text",
                        }}>
                        Print mnemonic
                      </Button>
                    </S.Phrases>
                  ) : (
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
                            <S.SelectContent isOverflow={accounts?.length > 2}>
                              {isLoading ? (
                                <MyAccountLoading />
                              ) : accounts?.length ? (
                                accounts.map((item, index) => (
                                  <SelectAccount
                                    isActive={
                                      item.address === values?.selectedAccount?.address
                                    }
                                    key={index}
                                    accountName={item.meta.name || `Account ${index}`}
                                    address={item.address}
                                    onClick={() =>
                                      setFieldValue("selectedAccount", accounts[index])
                                    }
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
                            label="Account Name"
                            placeholder="Enter a name for this account"
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
                          </FlexSpaceBetween>
                        </Form>
                      )}
                    </Formik>
                  )}
                </S.Form>
                {success && (
                  <>
                    <S.Login>
                      <S.LoginWrapper>
                        <h3>Login</h3>
                        <p>Simply dummy text of the printing</p>
                      </S.LoginWrapper>
                      <Button background="secondaryBackground" color="black">
                        Login
                      </Button>
                    </S.Login>
                    <S.Connect>
                      <S.ConnectTitle>
                        <S.ConnectTitleWrapper>
                          <h3>Connect to Phone(Optional)</h3>
                          <div>
                            <p>Polkadex App is avaible in</p>
                            <S.ConnetTitleIcon href="#">
                              <Icons.Apple />
                            </S.ConnetTitleIcon>
                            <S.ConnetTitleIcon href="#">
                              <Icons.Android />
                            </S.ConnetTitleIcon>
                          </div>
                        </S.ConnectTitleWrapper>
                        <Button background="secondaryBackground" color="black">
                          View QR Code
                        </Button>
                      </S.ConnectTitle>
                      <S.ConnectContent>
                        {isVisible ? (
                          <S.ConnectBox>
                            <h4>Mnemonic Phrases QR Code</h4>
                            <p>
                              Open Polkadex Exchange App and import your wallet via QR code.
                            </p>
                            <QrCode mnemoicString={"['test1','test2','test3' ]"} />
                          </S.ConnectBox>
                        ) : (
                          <S.ConnectEmpty>
                            <p>I saved my mnemonic seed</p>
                            <Button
                              type="button"
                              onClick={() => setIsVisible(true)}
                              background="secondaryBackground"
                              color="black">
                              View QR Code
                            </Button>
                          </S.ConnectEmpty>
                        )}
                      </S.ConnectContent>
                    </S.Connect>
                  </>
                )}
              </Loading>
              {!success && (
                <S.Footer>
                  <p>
                    Do you want to import an account?
                    <Link href="/recovery"> Import Account </Link>
                  </p>
                </S.Footer>
              )}
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
