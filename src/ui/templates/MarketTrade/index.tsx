import React from "react";

import * as S from "./styles";
import { RecentTrades } from "./recentTrades";

export const MarketTrade = () => {
  return (
    <S.Wrapper>
      <S.Header>
        <h2>Market Trade</h2>
      </S.Header>
      <S.Content>
        <RecentTrades />
      </S.Content>
    </S.Wrapper>
  );
};
