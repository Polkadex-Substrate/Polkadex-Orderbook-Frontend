// TODO: Reset Selected account and Fetch PolkadotWallet -> useRanger
import Link from "next/link";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import * as S from "./styles";

import { HeaderBack, TemporaryMessage } from "@polkadex/orderbook-ui/organisms";
import {
  selectHasUser,
  selectProxyAccount,
  selectPolkadotWalletAccounts,
  selectPolkadotWalletLoading,
  selectPolkadotWalletSuccess,
  selectSignInLoading,
  selectSignUpSuccess,
  setProxyAccount,
  signIn,
  selectImportAccountSuccess,
} from "@polkadex/orderbook-modules";
import {
  Button,
  Dropdown,
  SelectAccount,
  InputPrimary,
  MyAccountLoading,
  Loading,
} from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { loginValidations } from "@polkadex/orderbook/validations";

const defaultValues = {
  password: "",
  address: "",
};

export const LoginTemplate = () => {
  const [state, setState] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const accounts = useReduxSelector(selectPolkadotWalletAccounts);
  const isLoading = useReduxSelector(selectPolkadotWalletLoading);
  const isImportAccountSuccess = useReduxSelector(selectImportAccountSuccess);
  const selectedAccount = useReduxSelector(selectProxyAccount);
  const hasUser = useReduxSelector(selectHasUser);
  const isSuccess = useReduxSelector(selectPolkadotWalletSuccess);
  const signUpSuccess = useReduxSelector(selectSignUpSuccess);
  const isSignInLoading = useReduxSelector(selectSignInLoading);

  useEffect(() => {
    if (hasUser) router.push("/trading");
  }, [hasUser, router]);

  useEffect(() => {
    if (signUpSuccess || isImportAccountSuccess) window.location.reload();
  }, [signUpSuccess, isImportAccountSuccess]);
  if (hasUser) return <div />;
  return (
    <S.Main>
      <TemporaryMessage
        message="The tech team is using this testnet for development. Expect frequent restarts of the testnet and wipe offs leading to loss of your test token balances and order history. You may have to create new proxy accounts when the testnet is restarted."
        isVisible={state}
        onClose={() => setState(false)}
      />
      <S.Wrapper>
        <HeaderBack hasArrow={false} />
        <S.Container>
          <S.AsideLeft>
            <S.Title>
              <h1>Welcome Back!</h1>
              <p>
                Don&apos;t you have an account yet?
                <Link href="/signUp"> Sign up </Link>
              </p>
            </S.Title>
            <Loading isActive={!isSuccess} color="primaryBackgroundOpacity">
              <S.Form>
                <Formik
                  initialValues={defaultValues}
                  validationSchema={loginValidations}
                  onSubmit={async (values) => {
                    dispatch(signIn(selectedAccount.address, values.password));
                  }}>
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                      <S.SelectAccount>
                        <Dropdown
                          direction="bottom"
                          isClickable
                          header={
                            <SelectAccount
                              isHeader
                              accountName={selectedAccount?.meta.name || "Select your account"}
                              address={
                                selectedAccount?.address || "Polkadex is completely free"
                              }
                            />
                          }>
                          <S.SelectContent isOverflow={accounts?.length > 2}>
                            {isLoading ? (
                              <MyAccountLoading />
                            ) : accounts?.length ? (
                              accounts.map((item, index) => (
                                <SelectAccount
                                  isActive={item.address === selectedAccount?.address}
                                  key={index}
                                  accountName={item.meta.name || `Account ${index}`}
                                  address={item.address}
                                  onClick={() => {
                                    setFieldValue("address", item.address);
                                    dispatch(setProxyAccount(accounts[index]));
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
                        {errors.address && <S.Error>{errors.address}</S.Error>}
                      </S.SelectAccount>

                      <InputPrimary
                        label="Password"
                        placeholder="Enter your password for this account"
                        type="password"
                        name="password"
                        error={errors.password && touched.password && errors.password}
                      />
                      <S.Flex>
                        <Button
                          size="extraLarge"
                          type="submit"
                          disabled={!errors.password && !errors.address && isSignInLoading}
                          isLoading={isSignInLoading}>
                          Login
                        </Button>
                        <Link href="connectToPhone">Connect to Phone</Link>
                      </S.Flex>
                    </Form>
                  )}
                </Formik>
              </S.Form>
            </Loading>

            <S.Footer>
              <p>
                Do you already have a proxy account ?{" "}
                <Link href="/recovery"> Import Account </Link>
              </p>
            </S.Footer>
          </S.AsideLeft>
          <S.AsideRight>
            <div>
              <h2>
                Buy and Sell Cryptocurrencies.<strong>Fast and Secure</strong>{" "}
              </h2>
            </div>
            <figure>
              <img src="/img/polkadexExchangeLight.svg" />
            </figure>
          </S.AsideRight>
        </S.Container>
      </S.Wrapper>
    </S.Main>
  );
};
