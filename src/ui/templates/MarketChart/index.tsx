import dynamic from "next/dynamic";

import * as S from "./styles";

import { Button, Tabs, TabContent, TabHeader, MarketDepth } from "src/ui";
const TradingChart = dynamic(() => import("src/ui/Templates/TradingChart"), { ssr: false });

export const MarketChart = () => {
  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <S.ChartHeaderWrapper>
            <TabHeader>
              <Button title="Market Chart" size="small" background="secondaryBackground" />
            </TabHeader>
            <TabHeader>
              <Button title="Deepth Chart" size="small" background="transparent" />
            </TabHeader>
          </S.ChartHeaderWrapper>
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
