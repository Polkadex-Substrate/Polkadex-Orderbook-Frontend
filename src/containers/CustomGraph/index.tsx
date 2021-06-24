import * as React from "react"
import { CustomOrderbook, TradingChart } from "src/containers";

import * as S from "./styles";

export const CustomGraph = () => {
  return (
    <S.Wrapper>
      <Chart />
      <CustomOrderbook />
    </S.Wrapper>
  );
};

export const Chart = () => {
  return (
    <S.WrapperChart>
      <S.ChartContent>
        <TradingChart />
      </S.ChartContent>
    </S.WrapperChart>
  );
};
