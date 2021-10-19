import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  Tabs,
  TabContent,
  TabHeader,
  MyCurrentAccountHeader,
  Dropdown,
  Login,
  SignUp,
  Icon,
} from "src/ui";
import {
  InjectedAccount,
  polkadotWalletFetch,
  polkadotWalletSetAcccount,
  resetPolkadotWallet,
  selectPolkadotWalletAccounts,
  selectPolkadotWalletCurrentAccount,
} from "src/modules/user/polkadotWallet";
import { useReduxSelector } from "src/hooks";
import { useExtrinsics } from "src/hooks/useExtrinsics";

const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
};
export const SignContent = () => {
  const dispatch = useDispatch();
  const accounts = useReduxSelector(selectPolkadotWalletAccounts);
  const selectedAccount = useReduxSelector(selectPolkadotWalletCurrentAccount);
  const [selectedDropDownAccount, setSelectedDropDown] =
    useState<InjectedAccount>(defaultAccount);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    dispatch(polkadotWalletFetch());
  }, []);

  const extrinsics = useExtrinsics(selectedDropDownAccount);
  return (
    <S.Wrapper>
      <S.Title>
        {selectedAccount.address ? (
          <>
            <Icon
              icon="Return"
              background="none"
              size="large"
              onClick={() => dispatch(resetPolkadotWallet())}
            />
            <MyCurrentAccountHeader
              name={selectedAccount?.meta.name}
              address={selectedAccount?.address}
            />
          </>
        ) : (
          <>
            <Icon icon="Wallet" />
            <h3>Connect to wallet</h3>
          </>
        )}
      </S.Title>

      <S.Content>
        {!selectedAccount.address && isActive ? (
          <div>
            <div>
              <h4>{`Select your Polkadot{.js} account`}</h4>
              <Dropdown
                direction="bottomLeft"
                style={{ width: "100%", top: 0 }}
                title={
                  <MyCurrentAccountHeader
                    name={selectedAccount?.meta.name || "Select your account"}
                    address={
                      selectedAccount?.address || "Please install Polkadot {.js} extension"
                    }
                    isHeader
                  />
                }>
                <S.SelectAccountContainer>
                  {accounts?.length ? (
                    accounts.map((item, index) => (
                      <MyCurrentAccountHeader
                        isActive={selectedAccount.address === item.address}
                        key={index}
                        name={`${item?.meta.name}`}
                        address={item?.address}
                        onClick={() => {
                          dispatch(polkadotWalletSetAcccount(accounts[index]));
                        }}
                      />
                    ))
                  ) : (
                    <Loading />
                  )}
                </S.SelectAccountContainer>
              </Dropdown>
            </div>
          </div>
        ) : (
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

const Loading = () => (
  <>
    <MyCurrentAccountHeader />
    <MyCurrentAccountHeader />
    <MyCurrentAccountHeader />
  </>
);
