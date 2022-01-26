import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
export const ExploreMarket = ({ isFull = false }) => {
  return (
    <S.Main isFull={isFull}>
      <S.Container>
        <Card pair="DOT" token="PDEX" price="0.03209666" change="19.08" isActive />
        <Card pair="DOT" token="ETH" price="0.03417652" change="18.71" />
        <Card pair="DOT" token="DOT" price="0.03507542" change="19.21" />
      </S.Container>
      <S.Actions>
        <Icon name="SingleArrowRight" color="inverse" size="extraSmall" />
      </S.Actions>
    </S.Main>
  );
};

const Card = ({ pair, token, price, change, isActive = false }) => (
  <S.Card isActive={isActive}>
    <S.CardAsideLeft>
      <S.CardTitle>
        {pair}/{token}
      </S.CardTitle>
      <div>
        <p>{price}</p>
        <span>{change}%</span>
      </div>
    </S.CardAsideLeft>
    <S.CardAsideRight>
      <img src="img/graphTest.svg" alt="graph" />
    </S.CardAsideRight>
  </S.Card>
);
