import CoinIcon from "../CoinIcon";

import * as S from "./styles";

export type MarketTokenProps = {
  name: string;
  shortName: string;
  source: string;
  pricing: number;
  volume: number;
  percent: number;
};

const MarketToken = ({
  name,
  shortName,
  source,
  pricing,
  volume,
  percent,
}: MarketTokenProps) => (
  <S.Tr>
    <S.Td>
      <S.ContainerCoin>
        <CoinIcon source={`/img/cryptocurrencies/${source}.svg`} />
        <S.ContainerCoinName>
          <span> {name} </span>
          <S.Span> {shortName} </S.Span>
        </S.ContainerCoinName>
      </S.ContainerCoin>
    </S.Td>
    <S.Td>${pricing}</S.Td>
    <S.Td>
      <S.ContainerPricing>
        <S.PricingPercent>${volume}mi</S.PricingPercent>
        <S.PricingVolume>{percent}%</S.PricingVolume>
      </S.ContainerPricing>
    </S.Td>
  </S.Tr>
);

export default MarketToken;
