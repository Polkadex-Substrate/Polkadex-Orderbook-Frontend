import React from 'react'
import * as S from "./styles";
import { CustomRecentTrades } from './customRecentTrades';

import {
  selectCurrentMarket,
  selectDepthLoading,

} from 'src/modules';
import { useReduxSelector } from 'src/hooks';

export const CustomMarketTrade = () => {
  const orderBookLoading = useReduxSelector(selectDepthLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  return (
    <S.Wrapper>
      <S.Header>
        <h2>Market Trade</h2>
      </S.Header>
      <S.Content>
        { orderBookLoading && !currentMarket ? <p>Loading</p> : <CustomRecentTrades /> }
      </S.Content>
  </S.Wrapper>
  )
}

