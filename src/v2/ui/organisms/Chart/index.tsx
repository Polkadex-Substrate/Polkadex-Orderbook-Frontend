import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const Chart = () => {
  return (
    <S.Main>
      <Header />
      <S.Content>
        <OriginalChart />
        <DepthChart />
        <TradingViewChart />
      </S.Content>
    </S.Main>
  );
};

const Header = () => (
  <S.Header>
    <S.HeaderLeft>
      <S.HeaderActions>
        <Icon name="Settings" color="inverse" size="extraSmall" />
      </S.HeaderActions>
      <ul>
        <S.HeaderLi>1h</S.HeaderLi>
        <S.HeaderLi isActive>24h</S.HeaderLi>
        <S.HeaderLi>7d</S.HeaderLi>
        <S.HeaderLi>1m</S.HeaderLi>
        <S.HeaderLi>1y</S.HeaderLi>
        <S.HeaderLi>All</S.HeaderLi>
      </ul>
      <S.HeaderActions>
        <Icon name="Calendar" color="inverse" size="extraSmall" />
      </S.HeaderActions>
    </S.HeaderLeft>
    <S.HeaderRight>
      <ul>
        <S.HeaderLi color="secondaryBackground">Original</S.HeaderLi>
        <S.HeaderLi isActive color="secondaryBackground">
          TradingView
        </S.HeaderLi>
        <S.HeaderLi color="secondaryBackground">Depth</S.HeaderLi>
      </ul>
      <S.HeaderActions>
        <Icon name="Expand" color="inverse" size="extraSmall" />
      </S.HeaderActions>
    </S.HeaderRight>
  </S.Header>
);
const OriginalChart = () => <S.OriginalChart></S.OriginalChart>;
const DepthChart = () => <S.DepthChart></S.DepthChart>;
const TradingViewChart = () => (
  <S.TradingViewChart>
    <img src="/img/tradingChartExample.svg" alt="" />
  </S.TradingViewChart>
);
