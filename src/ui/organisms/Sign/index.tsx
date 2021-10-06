import * as S from "./styles";

import { Icon, TabHeader, TabContent, Tabs } from "src/ui/components";
import { Dropdown, Login, SignUp } from "src/ui/molecules";
import { useState } from "react";
import { MyCurrentAccountHeader } from "..";

export const SignContent = () => {
  const [accounts, setAccounts] = useState() //Selected Account..
  const [selectedAccount, setSelectedAccounts] = useState()
  const data = [{
    name: "Account 1",
    address: '0x000000000'
  }]

  return (
    <S.Wrapper>
      <S.Title>
        <Icon icon="Wallet" />
        <h3>Connect to wallet</h3>
      </S.Title>
      <S.Content>
        { !selectedAccount ?
         ( <div>
            <h4>Select your account</h4>
            <Dropdown
                direction="bottomLeft"
                style={{ width: "100%", top: 0 }}
                title={
                  <MyCurrentAccountHeader
                    name={"Account"}
                    address={'0x000000'}
                    isHeader
                  />
                }>
                <S.SelectAccountContainer>
                  {data.length
                    ? data.map((item, index) => (
                        <MyCurrentAccountHeader
                          isActive={false}
                          key={index}
                          name={ `Account ${index}`}
                          address={item.address}
                          onClick={() => {
                            console.log("Change account..")
                            setSelectedAccounts(true)}
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
        ) }
      </S.Content>
    </S.Wrapper>
  );
};
