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
  setMainAccount,
  signIn,
} from "@polkadex/orderbook-modules";
import {
  Button,
  Dropdown,
  SelectAccount,
  InputPrimary,
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
  const selectedAccount = useReduxSelector(selectMainAccount);
  const hasUser = useReduxSelector(selectHasUser);

  useEffect(() => {
    if (hasUser) router.push("/trading");
  }, [hasUser, router]);

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
                      header={
                        <SelectAccount
                          accountName={selectedAccount?.meta.name || "Select your account"}
                          address={
                            selectedAccount?.address || "Lorem Ipsum is simply dummy text"
                          }
                        />
                      }>
                      <S.SelectContent>
                        {accounts.length ? (
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
                          <Loading />
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

const Loading = () => (
  <>
    <SelectAccount />
    <SelectAccount />
    <SelectAccount />
  </>
);
