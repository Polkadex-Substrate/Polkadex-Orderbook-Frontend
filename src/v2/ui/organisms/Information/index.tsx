import * as S from "./styles";
import * as T from "./types";

import { HeaderMarket } from "@orderbook/v2/ui/organisms/Markets";
import { selectCurrentMarket, selectMarketTickers } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { isNegative } from "@polkadex/orderbook/v2/helpers";

export const Information = ({ onOpenMarkets }) => {
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const marketTickers = useReduxSelector(selectMarketTickers);

  // const getTickerValue = (value: string) => marketTickers[currentMarket?.id][value] || 0;

  const bidUnit = currentMarket?.quote_unit?.toUpperCase();
  // const isPositive = isNegative(getTickerValue("price_change_percent"));

  return (
    <S.Main>
      <S.AsideLeft>
        <HeaderMarket
          pair={currentMarket?.name}
          pairIcon={"DOT"}
          onOpenMarkets={onOpenMarkets}
        />
      </S.AsideLeft>
      <S.AsideRight>
        <Card title="Market Price" description="0.03209666">
          <S.Ticker>PDEX</S.Ticker>
        </Card>
        <Card title="Price 24h">
          <S.Tag>36.94%</S.Tag>
        </Card>
        <Card title="Volume 24h (DOT)" description="71,459.80">
          <S.Tag>12.02%</S.Tag>
        </Card>
        <S.Group>
          <Card title="24h High" description="0.05446660" isHorizontal textColor="primary" />
          <Card title="24h Low" description="0.02900341" isHorizontal textColor="green" />
        </S.Group>
      </S.AsideRight>
    </S.Main>
  );
};

const Card = ({ title, description, isHorizontal, textColor, children }: T.Props) => (
  <S.Card isHorizontal={isHorizontal} textColor={textColor}>
    <S.CardTitle>{title}</S.CardTitle>
    <S.CardContainer>
      {description && <p>{description}</p>}
      {children && <S.CardChildren hasMargin={!!description}>{children}</S.CardChildren>}
    </S.CardContainer>
  </S.Card>
);
