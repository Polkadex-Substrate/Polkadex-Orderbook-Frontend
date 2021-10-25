import dynamic from "next/dynamic";

import * as S from "./styles";

import { Tabs, TabContent, TabHeader, MarketDepth } from "src/ui";
const TradingChart = dynamic(() => import("../TradingChart"), {
  ssr: false,
});
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
          <TabContent>
            <TradingChart />
          </TabContent>
          <TabContent>
            <MarketDepth />
          </TabContent>
        </S.Content>
      </Tabs>
    </S.Wrapper>
  );
};
