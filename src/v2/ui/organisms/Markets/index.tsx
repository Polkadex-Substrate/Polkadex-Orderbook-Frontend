import { Sparklines, SparklinesLine } from "react-sparklines";
import { FC } from "react";

import * as S from "./styles";
import * as F from "./fakeData";

import { InitialMarkets, useMarkets } from "@orderbook/v2/hooks";
import { Icon, Dropdown, Skeleton } from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { isNegative } from "@polkadex/orderbook/v2/helpers";
import { useCookieHook } from "@polkadex/orderbook-hooks";

const Markets = ({ isFull = false, hasMargin = false }) => {
  const {
    marketTokens,
    marketTickers,
    handleChangeMarket,
    handleFieldChange,
    handleMarketsTabsSelected,
    currentTickerImg,
    currentTickerName,
    fieldValue,
  } = useMarkets();

  return (
    <S.Main isFull={isFull} hasMargin={hasMargin}>
      <S.HeaderWrapper>
        <HeaderMarket pair={currentTickerName} pairTicker={currentTickerImg} />
      </S.HeaderWrapper>
      <Filters searchField={fieldValue.searchFieldValue} handleChange={handleFieldChange}  />
      <Content tokens={marketTokens()} changeMarket={handleChangeMarket} />
      <Footer
        tickers={marketTickers}
        changeMarket={handleMarketsTabsSelected}
        tabField={fieldValue.marketsTabsSelected}
      />
    </S.Main>
  );
};

export const HeaderMarket = ({
  pair = "Empty  Token",
  pairSymbol = "Polkadex",
  pairTicker,
  onOpenMarkets = undefined,
}) => {
  return (
    <S.Header onClick={onOpenMarkets}>
      <S.HeaderAsideLeft>
        <S.HeaderToken>
          <Icon isToken name={pairTicker} size="large" color="text" />
        </S.HeaderToken>
        <S.HeaderInfo>
          <S.HeaderInfoContainer>
            <span>{pair}</span>
          </S.HeaderInfoContainer>
          <p>{pairSymbol}</p>
        </S.HeaderInfo>
      </S.HeaderAsideLeft>
      <S.HeaderAsideCenter>
        <Sparklines data={F.fakeChartData}>
          <SparklinesLine color="#E6007A" />
        </Sparklines>
      </S.HeaderAsideCenter>
    </S.Header>
  );
};

const Filters = ({ searchField, handleChange }) => {
  return (
    <S.Title>
      <h2>Markets</h2>
      <S.TitleActions>
        <S.Search>
          <button>
            <Icon name="Search" size="extraSmall" stroke="text" color="text" />
          </button>
          <input
            type="text"
            placeholder="Search Menu.."
            value={searchField}
            onChange={handleChange}
          />
        </S.Search>
        <S.Favorite>
          <Icon name="Star" size="extraSmall" stroke="text" color="secondaryBackground" />
        </S.Favorite>
      </S.TitleActions>
    </S.Title>
  );
};

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
              id={token.id}
              pair={token.name}
              tokenTicker={token.tokenTickerName}
              vol={Decimal.format(Number(token.volume), token.price_precision, ",")}
              price={Decimal.format(Number(token.last), token.price_precision, ",")}
              fiat={Decimal.format(Number(token.last), token.price_precision, ",")}
              change={Decimal.format(Number(token.price_change_percent), 2, ",") + "%"}
              changeMarket={() => changeMarket(token.name)}
            />
          ))}
      </S.ContainerWrapper>
    </S.Content>
  );
};

const Card = ({ id, pair, tokenTicker, vol, price, fiat, change, changeMarket }) => {
  const { handleChangeFavourite, isFavourite } = useCookieHook(id);
  return (
    <S.Card onClick={changeMarket}>
      <S.CardInfo>
        <S.CardInfoActions>
          <button type="button" onClick={handleChangeFavourite}>
            <Icon
              name="Star"
              size="extraSmall"
              stroke={isFavourite ? "orange" : "text"}
              color={isFavourite ? "orange" : "secondaryBackground"}
            />
          </button>
        </S.CardInfoActions>
        <S.CardInfoContainer>
          <S.CardToken>
            <Icon isToken name={tokenTicker} size="large" color="text" />
          </S.CardToken>
          <S.CardInfoWrapper>
            <span>{pair}</span>
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
};

const Footer: FC<{
  tickers: string[];
  changeMarket: (value: string) => void;
  tabField: string;
}> = ({ tickers, changeMarket, tabField }) => (
  <S.Footer>
    {!!tickers.length &&
      tickers.map((ticker) => (
        <S.FooterCard
          isActive={tabField === ticker}
          onClick={() => changeMarket(ticker)}
          key={ticker}>
          {ticker}
        </S.FooterCard>
      ))}
    {/* <S.FooterCard>
      <Dropdown header="ALTS">
        <p>ETH</p>
        <p>SOL</p>
        <p>DOGE</p>
      </Dropdown>
    </S.FooterCard> */}
  </S.Footer>
);
export const MarketsSkeleton = () => <Skeleton height="100%" width="100%" />;

export default Markets;
