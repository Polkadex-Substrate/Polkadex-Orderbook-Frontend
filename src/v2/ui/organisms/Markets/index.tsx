import { Sparklines, SparklinesLine } from "react-sparklines";
import { FC } from "react";

import * as S from "./styles";
import * as F from "./fakeData";

import { InitialMarkets, useMarkets } from "@orderbook/v2/hooks";
import { Icon, Dropdown, AvailableMessage } from "@polkadex/orderbook-ui/molecules";
import { Market } from "@polkadex/orderbook-modules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { isNegative } from "@polkadex/orderbook/v2/helpers";

export const Markets = ({ isFull = false }) => {
  const {
    marketTokens,
    marketTickers,
    handleChangeMarket,
    handleFieldChange,
    handleMarketsTabsSelected,
  } = useMarkets();

  return (
    <S.Main isFull={isFull}>
      <S.HeaderWrapper>
        <HeaderMarket />
      </S.HeaderWrapper>
      <AvailableMessage message="Soon">
        <Filters />
      </AvailableMessage>
      <Content tokens={marketTokens()} changeMarket={handleChangeMarket} />
      <AvailableMessage message="Soon">
        <Footer tickers={marketTickers} />
      </AvailableMessage>
    </S.Main>
  );
};

export const HeaderMarket = ({ onOpenMarkets = undefined }) => (
  <S.Header onClick={onOpenMarkets}>
    <S.HeaderAsideLeft>
      <S.HeaderToken>
        <Icon isToken name="DOT" size="large" color="black" />
      </S.HeaderToken>
      <S.HeaderInfo>
        <S.HeaderInfoContainer>
          <span>DOT/PDEX</span>
          <S.HeaderInfoActions>
            <Icon name="Exchange" />
          </S.HeaderInfoActions>
        </S.HeaderInfoContainer>
        <p>Polkadot</p>
      </S.HeaderInfo>
    </S.HeaderAsideLeft>
    <S.HeaderAsideCenter>
      <Sparklines data={F.fakeChartData}>
        <SparklinesLine color="#E6007A" />
      </Sparklines>
    </S.HeaderAsideCenter>
    <S.HeaderAsideRight>
      <Icon name="ArrowBottom" stroke="text" />
    </S.HeaderAsideRight>
  </S.Header>
);

const Filters = () => (
  <S.Title>
    <h2>Markets</h2>
    <S.TitleActions>
      <S.TitleActionCard>
        <Icon name="Search" size="extraSmall" stroke="black" />
      </S.TitleActionCard>
      <S.TitleActionCard>
        <Icon name="Star" size="extraSmall" stroke="black" color="white" />
      </S.TitleActionCard>
    </S.TitleActions>
  </S.Title>
);

const Content: FC<{ tokens?: InitialMarkets[]; changeMarket: (value: string) => void }> = ({
  tokens = [],
  changeMarket,
}) => {
  return (
    <S.Content>
      <S.ContainerTitle></S.ContainerTitle>
      <S.ContainerWrapper>
        {!!tokens.length &&
          tokens.map((token) => (
            <Card
              key={token.id}
              pair={token.name}
              tokenTicker={token.name}
              vol={Decimal.format(Number(token.volume), token.price_precision, ",")}
              price="0"
              fiat={Decimal.format(Number(token.last), token.price_precision, ",")}
              change={token.price_change_percent}
              changeMarket={() => changeMarket(token.name)}
            />
          ))}
      </S.ContainerWrapper>
    </S.Content>
  );
};

const Card = ({ pair, tokenTicker, vol, price, fiat, change, changeMarket }) => (
  <S.Card onClick={changeMarket}>
    <S.CardInfo>
      <S.CardInfoActions>
        <Icon name="Star" size="extraSmall" stroke="black" color="white" />
      </S.CardInfoActions>
      <S.CardInfoContainer>
        <S.CardToken>
          <Icon isToken name={tokenTicker} size="large" color="black" />
        </S.CardToken>
        <S.CardInfoWrapper>
          <span>
            {tokenTicker}/<small>{pair}</small>
          </span>
          <p>Vol:{vol}</p>
        </S.CardInfoWrapper>
      </S.CardInfoContainer>
    </S.CardInfo>
    <S.CardPricing>
      <span>{price}</span>
      <p>{fiat}</p>
    </S.CardPricing>
    <S.CardChange isNegative={isNegative(change.toString())}>
      <span>{change}</span>
    </S.CardChange>
  </S.Card>
);

const Footer: FC<{ tickers: string[] }> = ({ tickers }) => (
  <S.Footer>
    {!!tickers.length &&
      tickers.map((ticker) => (
        <S.FooterCard key={ticker} isActive>
          {ticker}
        </S.FooterCard>
      ))}
    <S.FooterCard>
      <Dropdown header="ALTS">
        <p>ETH</p>
        <p>SOL</p>
        <p>DOGE</p>
      </Dropdown>
    </S.FooterCard>
    <S.FooterCard>
      <Dropdown header="FIAT">
        <p>USDC</p>
        <p>CUSD</p>
        <p>EURT</p>
      </Dropdown>
    </S.FooterCard>
    <S.FooterCard>
      <Dropdown header="ZONES">
        <p>DEFI</p>
        <p>FINANCE</p>
        <p>NFT</p>
      </Dropdown>
    </S.FooterCard>
  </S.Footer>
);
