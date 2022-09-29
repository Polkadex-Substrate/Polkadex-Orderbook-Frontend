import * as S from "./styles";
import * as T from "./types";

import { HeaderMarket } from "@polkadex/orderbook-ui/organisms/Markets";
import { AvailableMessage } from "@polkadex/orderbook-ui/molecules";
import { useInformation } from "@polkadex/orderbook-hooks";

const Information = ({ onOpenMarkets }) => {
  const {
    pairName,
    pairTicker,
    baseUnit,
    quoteUnit,
    lastPrice,
    volume24h,
    priceHigh,
    price24h,
    priceLow,
    isNegative,
  } = useInformation();
  return (
    <S.Main>
      <S.AsideLeft>
        <HeaderMarket pair={pairName} pairTicker={pairTicker} onOpenMarkets={onOpenMarkets} />
      </S.AsideLeft>
      <S.AsideRight>
        <Card title="Market Price" description={lastPrice}>
          <S.Ticker>{quoteUnit}</S.Ticker>
        </Card>
        <Card title="Price 24h" description={price24h}>
          <S.Tag isNegative={isNegative}>0.00%</S.Tag>
        </Card>
        <Card title={`Volume 24h (${quoteUnit})`} description={volume24h}>
          <S.Tag>0.00%</S.Tag>
        </Card>
        <S.Group>
          <Card
            title={`24h High(${quoteUnit})`}
            description={priceHigh}
            isHorizontal
            textColor="green"
          />
          <Card
            title={`24h Low(${quoteUnit})`}
            description={priceLow}
            isHorizontal
            textColor="primary"
          />
        </S.Group>
      </S.AsideRight>
    </S.Main>
  );
};

const Card = ({ title, description, isHorizontal, textColor, children }: T.Props) => (
  <S.Card isHorizontal={isHorizontal} textColor={textColor}>
    <S.CardTitle>{title}</S.CardTitle>
    <AvailableMessage message="Soon" isVisible>
      <S.CardContainer>
        {description && <p>{description}</p>}
        {children && <S.CardChildren hasMargin={!!description}>{children}</S.CardChildren>}
      </S.CardContainer>
    </AvailableMessage>
  </S.Card>
);

export default Information;
