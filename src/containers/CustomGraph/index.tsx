import React from "react"
import { CustomButton, TabHeader,TabContent,Tabs } from "src/components";
import { CustomOrderbook, TradingChart, MarketDepthsComponent } from "src/containers";
import { useReduxSelector } from "src/hooks";
import { selectCurrentMarket } from "src/modules";
import { CustomPairSelect } from "../CustomPairSelect";

import * as S from "./styles";

export const CustomGraph = () => {
  const currentMarket = useReduxSelector(selectCurrentMarket)
  return (
    <S.Wrapper>
      <Chart baseUnit={currentMarket.base_unit} quoteUnit={currentMarket.quote_unit}/>
      <CustomOrderbook />
    </S.Wrapper>
  );
};

export const Chart = ({baseUnit, quoteUnit}) => {
  return (
    <S.WrapperChart>
      <Tabs>
      <S.ChartHeader>
        <CustomPairSelect baseUnit={baseUnit} quoteUnit={quoteUnit}/>
        <S.ChartHeaderWrapper>
          <TabHeader>
            <CustomButton title="Market Chart"/>
          </TabHeader>
          <TabHeader>
            <CustomButton title="Depth Chart"/>
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
    </S.WrapperChart>
  );
};
