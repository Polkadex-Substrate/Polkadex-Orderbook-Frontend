import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { MyCurrentAccountHeader } from "..";

import * as S from "./styles";

import { Icon, TabHeader, TabContent, Tabs, Button } from "src/ui/components";
import { Dropdown, Login, SignUp } from "src/ui/molecules";
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
  const selectedAccount = useReduxSelector(selectPolkadotWalletCurrentAccount); // main addreess.

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
            <h4>{`Select the account you want to register`}</h4>
            <Dropdown
              direction="bottomLeft"
              style={{ width: "100%", top: 0 }}
              title={
                <MyCurrentAccountHeader
                  name={selectedDropDownAccount?.meta.name || "Select your account"}
                  address={
                    selectedDropDownAccount?.address ||
                    "Please install Polkadot {.js} extension"
                  }
                  isHeader
                />
              }>
              <S.SelectAccountContainer>
                {accounts?.length ? (
                  accounts.map((item, index) => (
                    <MyCurrentAccountHeader
                      isActive={selectedDropDownAccount.address === item.address}
                      key={index}
                      name={`${item?.meta.name}`}
                      address={item?.address}
                      onClick={() => {
                        setSelectedDropDown(accounts[index]);
                      }}
                    />
                  ))
                ) : (
                  <MyCurrentAccountHeader />
                )}
              </S.SelectAccountContainer>
            </Dropdown>
            <Button
              title="Continue"
              style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}
              disabled={Boolean(!selectedDropDownAccount.address)}
              onClick={async () => {
                dispatch(polkadotWalletSetAcccount(selectedDropDownAccount));
              }}
            />
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
