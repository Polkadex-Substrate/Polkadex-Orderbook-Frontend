import React from "react";

import * as S from "./styles";

import { Button, TabHeader, TabContent, Tabs } from "src/ui/components";

export const MarketChart = () => {
  return (
    <S.Wrapper>
      <Tabs>
        <S.ChartHeader>
          <S.ChartHeaderWrapper>
            <TabHeader>
              <Button
                title="Market Chart"
                size="Small"
                background="secondaryBackground"
              />
            </TabHeader>
            <TabHeader>
              <Button
                title="Deepth Chart"
                size="Small"
                background="transparent"
              />
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
