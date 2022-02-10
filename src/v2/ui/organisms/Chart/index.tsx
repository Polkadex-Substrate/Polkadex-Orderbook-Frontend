import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";

export const Chart = ({ isFull = true }) => {
  return (
    <S.Main isFull={isFull}>
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
    <AvailableMessage message="Soon">
      <S.HeaderLeft>
        <S.HeaderActions>
          <Icon name="Settings" stroke="text" size="extraSmall" />
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
          <Icon name="Calendar" color="text" size="extraSmall" />
        </S.HeaderActions>
      </S.HeaderLeft>
    </AvailableMessage>
    <AvailableMessage message="Soon">
      <S.HeaderRight>
        <ul>
          <S.HeaderLi color="secondaryBackground">Original</S.HeaderLi>
          <S.HeaderLi isActive color="secondaryBackground">
            TradingView
          </S.HeaderLi>
          <S.HeaderLi color="secondaryBackground">Depth</S.HeaderLi>
        </ul>
        <S.HeaderActions>
          <Icon name="Expand" color="text" size="extraSmall" />
        </S.HeaderActions>
      </S.HeaderRight>
    </AvailableMessage>
  </S.Header>
);
const OriginalChart = () => <S.OriginalChart></S.OriginalChart>;
const DepthChart = () => <S.DepthChart></S.DepthChart>;
const TradingViewChart = () => <S.TradingViewChart>TradingView</S.TradingViewChart>;
