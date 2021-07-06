import React from "react"
import { CustomButton, TabHeader,TabContent,Tabs } from "src/components";
import { TradingChart, MarketDepthsComponent } from "src/containers";
import * as S from "./styles";

export const CustomGraph = () => {
  return (
    <S.Wrapper>
      <Tabs>
      <S.ChartHeader>
        <S.ChartHeaderWrapper>
          <TabHeader>
            <CustomButton title="Market Chart" size="small" background="secondaryBackground"/>
          </TabHeader>
          <TabHeader>
            <CustomButton title="Deepth Chart" size="small" background="transparent" />
          </TabHeader>
        </S.ChartHeaderWrapper>
      </S.ChartHeader>
      <S.ChartContent>
        <TabContent>
          <TradingChart />
        </TabContent>
        <TabContent>
          <MarketDepthsComponent />
        </TabContent>
      </S.ChartContent>
      </Tabs>
    </S.Wrapper>
  );
};
