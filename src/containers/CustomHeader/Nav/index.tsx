import * as React from 'react';

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CustomButton,
  CustomDropdown,
  CustomIcon,
  CustomInputWalletPolkadex,
  CustomSignForm,
  Spinner,
  TabContent,
  TabHeader,
  Tabs,
} from "src/components";
import { useReduxSelector, useSignWithPolkadotJs } from "src/hooks";
import { logoutFetch, selectUserInfo, selectUserLoggedIn } from "src/modules";

import * as S from "./styles";
import { WalletProps } from "./types";

const Nav = () => {
  const { fetchPolkadotJs, loading, error } = useSignWithPolkadotJs();

  const user = useReduxSelector(selectUserInfo);
  const isLoggedIn = useReduxSelector(selectUserLoggedIn);

  const dispatch = useDispatch();

  const account = false;

  return (
    <S.Wrapper>
      {(isLoggedIn && !!user) || account ? (
        <CustomDropdown
          isOpacity
          direction="bottom"
          title={<MyWalletHeader user={user} />}
          style={{width: 'min-content'}}
        >
          <S.MyWallet>
            <MyWalletHeader user={user} />
            <MyWalletContent
              user={user}
              disconnect={() => dispatch(logoutFetch())}
            />
          </S.MyWallet>
        </CustomDropdown>
      ) : (
        <ConnectWallet
          action={fetchPolkadotJs}
          error={error}
          loading={loading}
        />
      )}
    </S.Wrapper>
  );
};

export const MyWalletHeader = ({ user }: WalletProps) => {
  return (
    <S.MyWalletHeaderWrapper>
      <S.MyWalletHeader>
        <img
          src="https://gravatar.com/avatar/9eb9eec3ea8ccdb8137768f4e09bd963?d=https%3A%2F%2Fassets.codepen.io%2Finternal%2Favatars%2Fusers%2Fdefault.png&fit=crop&format=auto&height=80&version=0&width=80"
          alt="Profile avatar"
        />
        <div>
          <span>{user.email}</span>
          <p>{user.uid}</p>
        </div>
      </S.MyWalletHeader>
    </S.MyWalletHeaderWrapper>
  );
};

export const MyWalletContent = ({ user, disconnect }: WalletProps) => {
  return (
    <S.MyWalletContent>
      <S.MyWalletBoxWrapper>
        <div />
        <S.MyWalletBoxButton>
          <button type="button" onClick={disconnect}>
            Disconnnect
          </button>
        </S.MyWalletBoxButton>
      </S.MyWalletBoxWrapper>
      <S.MyWalletInput>
        <CustomInputWalletPolkadex value={user.uid} disabled />
        <a href="/">
          Connected with {user.email ? "Email" : `Polkadot.{js}`}
          <CustomIcon icon="Export" background="none" size="xsmall" />
        </a>
      </S.MyWalletInput>
      <S.MyWalletTransactions href="/">See Transactions</S.MyWalletTransactions>
    </S.MyWalletContent>
  );
};

export const ConnectWallet = ({ action, error, loading }) => {
  const [state, setState] = useState(false);

  return (
    <CustomDropdown
      direction="bottom"
      title={
        <CustomButton
          title="Connect Wallet"
          icon={{ icon: "Wallet", background: "primaryBackground" }}
          style={{ width: "max-content" }}
        />
      }
      isOpacity
    >
      <S.ContentWrapper>
        <Tabs>
          <S.TabWrapper>
            <S.TabWrapperTitle>
              <CustomIcon icon="Wallet" />
              <span>Connect to Wallet</span>
            </S.TabWrapperTitle>
            <S.ContentWrapperHeader>
              <h3>Choose Method</h3>
              <S.ContentWrapperFlex>
                <TabHeader>
                  <CustomButton
                    title="Polkadot"
                    token={{
                      icon: "DOT",
                    }}
                  />
                </TabHeader>
                <TabHeader>
                  <CustomButton
                    style={{ marginLeft: 10 }}
                    title="Email/Password"
                    icon={{
                      icon: "Email",
                    }}
                  />
                </TabHeader>
              </S.ContentWrapperFlex>
            </S.ContentWrapperHeader>
            <S.ContentWrapperContainer>
              <TabContent>
                {state ? (
                  <S.WalletSelectWrapper>
                    <S.WalletSelectHeader
                      type="button"
                      onClick={() => setState(!state)}
                    >
                      <CustomIcon icon="ArrowLeft" background="none" size="small" />
                      Choose Wallet
                    </S.WalletSelectHeader>
                    <DialogStatus
                      error={error}
                      action={action}
                      loading={loading}
                    />
                  </S.WalletSelectWrapper>
                ) : (
                  <S.WalletWrapper>
                    <h4>Choose Wallet</h4>
                    <S.WalletContainer>
                      <S.WalletBox
                        role="button"
                        onClick={() => setState(!state)}
                      >
                        <CustomIcon
                          icon="PolkadotJs"
                          background="none"
                          size="large"
                        />
                        <S.WalletBoxWrapper>
                          <S.WalletBoxContainer>
                            <span>{`Polkadot.{js}`}</span>
                            <p>Installing {`Polkadot.{js}`} extension.</p>
                          </S.WalletBoxContainer>
                          <CustomIcon
                            icon="ArrowRight"
                            size="small"
                            background="none"
                          />
                        </S.WalletBoxWrapper>
                      </S.WalletBox>
                    </S.WalletContainer>
                  </S.WalletWrapper>
                )}
              </TabContent>
              <TabContent>
                <CustomSignForm />
              </TabContent>
            </S.ContentWrapperContainer>
          </S.TabWrapper>
        </Tabs>
      </S.ContentWrapper>
    </CustomDropdown>
  );
};

export const DialogStatus = ({ error, action, loading }) => {
  useEffect(() => {
    action();
  }, []);
  return (
    <S.WalletSelectContent>
      {loading && <Spinner />}
      {error && (
        <>
          <p>
            <strong>{error}</strong>
            browser extension. This extension allows you to securely sign
            transactions and manage assets in Polkadot Network.
          </p>

          <S.WalletSeletActions>
            <CustomButton
              title="Install Extension"
              style={{ marginRight: 5 }}
              background="primary"
            />
            <CustomButton title="Learn More" background="secondaryBackground" />
          </S.WalletSeletActions>
        </>
      )}
    </S.WalletSelectContent>
  );
};

export default Nav;
