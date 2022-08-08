import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Button, Dropdown } from "@polkadex/orderbook-ui/molecules";
import { linkAccountValidations } from "@polkadex/orderbook/validations";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useLinkMainAccount } from "@polkadex/orderbook-hooks";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const LinkAccountTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();
  const { mainAccounts, handleSelectMainAccount, currentMainAccount, registerMainAccount } =
    useLinkMainAccount();

  const { handleSubmit, isValid, dirty } = useFormik({
    initialValues: {},
    validationSchema: linkAccountValidations,
    onSubmit: (values) => {
      registerMainAccount(currentMainAccount);
    },
  });

  console.log("Selected Token id via url:", router.query.id);
  return (
    <>
      <Head>
        <title>Link Account | Polkadex Orderbook</title>
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
                <h1>Link Account</h1>
                <p>
                  Polkadex is a fully non-custodial platform, so the assets in your wallet are
                  always under your control.
                </p>
              </div>
            </S.Column>
            <S.Box>
              <form onSubmit={handleSubmit}>
                <S.SelectInput>
                  <span>Select main account</span>
                  <S.SelectInputContainer>
                    <Dropdown
                      isClickable
                      direction="bottom"
                      header={
                        <S.SelectAccount>
                          <S.SelectAccountContainer>
                            <Icons.Avatar />
                          </S.SelectAccountContainer>
                          <S.SelectAccountContainer>
                            <div>
                              <strong>{currentMainAccount?.name}</strong>
                              <span>{currentMainAccount?.address}</span>
                            </div>
                            <div>
                              <Icons.ArrowBottom />
                            </div>
                          </S.SelectAccountContainer>
                        </S.SelectAccount>
                      }>
                      <S.DropdownContent>
                        {mainAccounts.map((account) => {
                          return (
                            <button
                              key={account.address}
                              type="button"
                              onClick={() => handleSelectMainAccount(account.address)}>
                              {account.meta.name}
                              <span>{account.address}</span>
                            </button>
                          );
                        })}
                      </S.DropdownContent>
                    </Dropdown>
                  </S.SelectInputContainer>
                </S.SelectInput>

                <Button
                  type="submit"
                  size="extraLarge"
                  background="primary"
                  color="white"
                  disabled={false}
                  isFull>
                  Register Account
                </Button>
              </form>
            </S.Box>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
