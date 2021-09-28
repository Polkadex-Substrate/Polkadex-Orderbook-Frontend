import * as S from "./styles";

import { Icon, TabHeader, TabContent, Tabs } from "src/ui/components";
import { Login, SignUp } from "src/ui/molecules";

export const SignContent = () => {
  return (
    <S.Wrapper>
      <S.Title>
        <Icon icon="Wallet" />
        <h3>Connect to wallet</h3>
      </S.Title>

      <S.Content>
        <Tabs>
          <div>
            <h4>I want</h4>
            <S.TabHeader>
              <TabHeader>
                <S.ListItem>Create an account</S.ListItem>
              </TabHeader>
              <TabHeader>
                <S.ListItem>Sign In</S.ListItem>
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
      </S.Content>
    </S.Wrapper>
  );
};
