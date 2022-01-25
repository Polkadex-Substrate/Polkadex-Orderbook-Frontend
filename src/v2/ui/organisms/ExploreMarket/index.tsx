import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
export const ExploreMarket = () => {
  return (
    <S.Main>
      <S.Container>
        <Card pair="DOT" token="PDEX" price="0.03209666" change="19.08" isActive />
        <Card pair="DOT" token="PDEX" price="0.03209666" change="19.08" />
        <Card pair="DOT" token="PDEX" price="0.03209666" change="19.08" />
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
