import * as S from "./styles";

import { Icon, TabHeader, TabContent, Tabs } from "src/ui/components";
import { Dropdown, Login, SignUp } from "src/ui/molecules";
import { useEffect, useState } from "react";
import { MyCurrentAccountHeader } from "..";
import { useDispatch } from "react-redux";
import { InjectedAccount, polkadotWalletFetch, polkadotWalletSetAcccount, selectPolkadotWalletAccounts, selectPolkadotWalletCurrentAccount } from "src/modules/user/polkadotWallet";
import { useReduxSelector } from "src/hooks";

export const SignContent = () => {
  const dispatch = useDispatch();
  const accounts = useReduxSelector(selectPolkadotWalletAccounts)
  const selectedAccount= useReduxSelector(selectPolkadotWalletCurrentAccount)  
  console.log({ selectedAccount})
  useEffect(() => {
    if (accounts.length === 0) { dispatch(polkadotWalletFetch()) }
    console.log("dispatched wallet fetch!")
  }, [])

  console.log("accounts from sign in content", accounts)
  return (
    <S.Wrapper>
      <S.Title>
        <Icon icon="Wallet" />
        <h3>Connect to wallet</h3>
      </S.Title>
      <S.Content>
        {!selectedAccount.address ?
          (<div>
            <h4>{`Select your Polkadot{.js} account`}</h4>
            <Dropdown
              direction="bottomLeft"
              style={{ width: "100%", top: 0 }}
              title={
                <MyCurrentAccountHeader
                  name={selectedAccount?.meta.name}
                  address={selectedAccount?.address}
                  isHeader
                />
              }>
              <S.SelectAccountContainer>
                {accounts.length
                  ? accounts.map((item, index) => (
                    <MyCurrentAccountHeader
                      isActive={false}
                      key={index}
                      name={`${item.meta.name}`}
                      address={item.address}
                      onClick={() => {
              
                        console.log("selected", accounts[index])
                        dispatch(polkadotWalletSetAcccount(accounts[index]))
                      }
                      }
                    />
                  ))
                  : "Empty"}
              </S.SelectAccountContainer>
            </Dropdown>
          </div>)
          : (
            <Tabs>
              <div>
                <S.TabHeader>
                  <TabHeader>
                    <S.ListItem>Step 1</S.ListItem>
                  </TabHeader>
                  <TabHeader>
                    <S.ListItem>Step 2</S.ListItem>
                  </TabHeader>
                </S.TabHeader>
              </div>
              <S.TabContent>
                <TabContent>
                  <SignUp />
                </TabContent>
                <TabContent>
                  <Login />
                </TabContent>
              </S.TabContent>
            </Tabs>
          )}
      </S.Content>
    </S.Wrapper>
  );
};
