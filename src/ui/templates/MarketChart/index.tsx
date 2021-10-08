import React from "react";

import * as S from "./styles";

import { Button, Tabs, TabContent, TabHeader } from "src/ui";

export const MarketChart = () => {
  return (
    <S.Wrapper>
      <Tabs>
        <S.ChartHeader>
          <S.ChartHeaderWrapper>
            <TabHeader>
              <Button title="Market Chart" size="small" background="secondaryBackground" />
            </TabHeader>
            <TabHeader>
              <Button title="Deepth Chart" size="small" background="transparent" />
            </TabHeader>
          </S.ChartHeaderWrapper>
        </S.ChartHeader>
        <S.ChartContent>
          <TabContent>{/* <TradingChart /> */}</TabContent>
          <TabContent>{/* <MarketDepthsComponent /> */}</TabContent>
        </S.ChartContent>
      </Tabs>
    </S.Wrapper>
  );
};
