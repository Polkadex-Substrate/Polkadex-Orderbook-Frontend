import * as S from "./styles";

import { Tabs, TabContent, TabHeader, MarketDepth } from "src/ui";

export const MarketChart = () => {
  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <S.Nav>
            <ul>
              <TabHeader>
                <S.Li>Market Chart</S.Li>
              </TabHeader>
              <TabHeader>
                <S.Li>Deepth Chart</S.Li>
              </TabHeader>
            </ul>
          </S.Nav>
          <S.Actions>
            <ul>
              <li></li>
            </ul>
          </S.Actions>
        </S.Header>
        <S.Content>
          <TabContent></TabContent>
          <TabContent>
            <MarketDepth />
          </TabContent>
        </S.Content>
      </Tabs>
    </S.Wrapper>
  );
};
