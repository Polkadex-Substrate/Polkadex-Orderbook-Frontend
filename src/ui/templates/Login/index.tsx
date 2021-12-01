// TODO: Reset Selected account and Fetch PolkadotWallet -> useRanger
import Link from "next/link";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as S from "./styles";

import { HeaderBack } from "@polkadex/orderbook-ui/organisms";
import {
  selectHasUser,
  selectMainAccount,
  selectPolkadotWalletAccounts,
  selectPolkadotWalletLoading,
  selectPolkadotWalletSuccess,
  selectSignUpSuccess,
  setMainAccount,
  signIn,
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

const defaultValues = {
  password: "",
  address: "",
};

export const LoginTemplate = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const accounts = useReduxSelector(selectPolkadotWalletAccounts);
  const isLoading = useReduxSelector(selectPolkadotWalletLoading);

  const selectedAccount = useReduxSelector(selectMainAccount);
  const hasUser = useReduxSelector(selectHasUser);
  const isSuccess = useReduxSelector(selectPolkadotWalletSuccess);
  const signUpSuccess = useReduxSelector(selectSignUpSuccess);

  useEffect(() => {
    if (hasUser) router.push("/trading");
  }, [hasUser, router]);

  useEffect(() => {
    if (signUpSuccess) window.location.reload();
  }, [signUpSuccess]);
  if (hasUser) return <div />;
  return (
    <S.Main>
      <S.Wrapper>
        <HeaderBack />
        <S.Container>
          <S.AsideLeft>
            <S.Title>
              <h1>Welcome Back!</h1>
              <p>
                Dont you have an account yet? <Link href="/signUp"> Sign up </Link>
              </p>
            </S.Title>
            <Loading isActive={!isSuccess} color="primaryBackgroundOpacity">
              <S.Form>
                <Formik
                  initialValues={defaultValues}
                  onSubmit={async (values) => {
                    dispatch(signIn(selectedAccount.address, values.password));
                  }}>
                  {({ errors, touched }) => (
                    <Form>
                      <Dropdown
                        direction="bottom"
                        isClickable
                        header={
                          <SelectAccount
                            accountName={selectedAccount?.meta.name || "Select your account"}
                            address={selectedAccount?.address || "Polkadex is completely free"}
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
                                  dispatch(setMainAccount(accounts[index]));
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
                      <InputPrimary
                        label="Password"
                        placeholder="Enter your password for this account"
                        type="password"
                        name="password"
                        error={errors.password && touched.password && errors.password}
                      />
                      <Button size="extraLarge" type="submit">
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
              </S.Form>
            </Loading>

            <S.Footer>
              <p>
                Do you want to import an account?{" "}
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
