import { Sparklines, SparklinesLine } from "react-sparklines";
import { FC } from "react";
import { subDays } from "date-fns";
import { useTranslation } from "next-i18next";
import {
  Icon,
  Skeleton,
  ResultFound,
  Search,
} from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import {
  formatNumber,
  getChainFromTicker,
  isNegative,
} from "@orderbook/core/helpers";
import {
  InitialMarkets,
  useMarkets,
  useMiniGraph,
} from "@orderbook/core/hooks";
import { ORDERBOOK_PRECISION } from "@orderbook/core/constants";

import * as S from "./styles";

import { ArrowBottom } from "@/ui/atoms/Icons";
import { normalizeValue } from "@/utils/normalize";

type Props = {
  hasMargin?: boolean;
  onClose: () => void;
  market: string;
};

export const Markets = ({ hasMargin = false, onClose, market }: Props) => {
  const {
    marketTokens,
    marketTickers,
    handleChangeMarket,
    handleFieldChange,
    handleMarketsTabsSelected,
    handleSelectedFavorite,
    currentTickerImg,
    currentTickerName,
    fieldValue,
    handleShowFavourite,
    id,
  } = useMarkets(market);

  return (
    <S.Main hasMargin={hasMargin}>
      <S.HeaderWrapper>
        <HeaderMarket
          id={id as string}
          pair={currentTickerName as string}
          pairTicker={currentTickerImg as string}
          format={false}
        />
        <S.Favorite>
          <button type="button" onClick={onClose}>
            <Icon name="Close" size="small" color="text" stroke="text" />
          </button>
        </S.Favorite>
      </S.HeaderWrapper>
      <Filters
        searchField={fieldValue.searchFieldValue}
        handleChange={handleFieldChange}
        handleShowFavourite={handleShowFavourite}
        showFavourite={fieldValue.showFavourite}
      />
      <Content
        handleSelectedFavorite={handleSelectedFavorite}
        tokens={marketTokens}
        changeMarket={(e) => handleChangeMarket(e, onClose)}
      />
      <Footer
        tickers={marketTickers}
        changeMarket={handleMarketsTabsSelected}
        tabField={fieldValue.marketsTabsSelected}
      />
    </S.Main>
  );
};

type HeaderMarketProps = {
  id: string;
  pair: string;
  pairSymbol?: string;
  pairTicker: string;
  onOpenMarkets?: () => void;
  isLoading?: boolean;
  format?: boolean;
};

export const HeaderMarket = ({
  id = "",
  pair = "Empty  Token",
  pairSymbol = "Polkadex",
  pairTicker,
  onOpenMarkets = undefined,
  isLoading = false,
  format = true,
}: HeaderMarketProps) => {
  const now = new Date();
  const from = subDays(now, 1);
  const to = now;
  const { graphPoints, isIncreasing } = useMiniGraph(id, from, to);
  const chainName = getChainFromTicker(pairTicker) || pairSymbol;

  if (isLoading) return <MarketsSkeleton />;

  return (
    <S.Header onClick={onOpenMarkets}>
      <S.HeaderAsideContainer background={format}>
        <S.HeaderAsideLeft>
          <S.HeaderToken>
            <Icon isToken name={pairTicker} size="extraMedium" color="text" />
          </S.HeaderToken>
          <S.HeaderInfo>
            <S.HeaderInfoContainer>
              <span>{pair}</span>
            </S.HeaderInfoContainer>
            <p className="truncate max-w-24">{chainName}</p>
          </S.HeaderInfo>
        </S.HeaderAsideLeft>
        <S.HeaderAsideCenter>
          <Sparklines data={graphPoints}>
            <SparklinesLine color={isIncreasing ? "green" : "#E6007A"} />
          </Sparklines>
        </S.HeaderAsideCenter>
        {format && (
          <S.ArrowBottom>
            <ArrowBottom />
          </S.ArrowBottom>
        )}
      </S.HeaderAsideContainer>
    </S.Header>
  );
};

const Filters = ({
  searchField,
  handleChange,
  handleShowFavourite,
  showFavourite,
}) => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`markets.${key}`);

  return (
    <S.Title>
      <h2>{t("markets")}</h2>
      <S.TitleActions>
        <Search
          type="text"
          placeholder={t("searchPlaceHolder")}
          value={searchField}
          onChange={handleChange}
        />
        <S.Favorite>
          <button type="button" onClick={handleShowFavourite}>
            <Icon
              name="Star"
              size="extraSmall"
              stroke={showFavourite ? "orange" : "text"}
              color={showFavourite ? "orange" : "secondaryBackground"}
            />
          </button>
        </S.Favorite>
      </S.TitleActions>
    </S.Title>
  );
};

const Content: FC<{
  tokens?: InitialMarkets[];
  handleSelectedFavorite: (id: string) => void;
  changeMarket: (value: string) => void;
}> = ({ tokens = [], changeMarket, handleSelectedFavorite }) => (
  <S.Content>
    <S.ContainerWrapper>
      {tokens.length ? (
        tokens.map((token) => (
          <Card
            key={token.id}
            id={token.id}
            pair={token.name}
            tokenTicker={token.baseAsset.ticker}
            vol={Decimal.format(Number(token.volume), token.quotePrecision)}
            price={formatNumber(
              Decimal.format(Number(token.last), ORDERBOOK_PRECISION, ",")
            )}
            change={
              Decimal.format(Number(token.price_change_percent), 2, ",") + "%"
            }
            changeMarket={() => changeMarket(token.name)}
            handleSelectedFavorite={handleSelectedFavorite}
            isFavourite={token.isFavourite}
          />
        ))
      ) : (
        <ResultFound />
      )}
    </S.ContainerWrapper>
  </S.Content>
);

const Card = ({
  id,
  pair,
  tokenTicker,
  vol,
  price,
  change,
  changeMarket,
  isFavourite,
  handleSelectedFavorite,
}) => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`markets.${key}`);
  return (
    <S.Card>
      <S.CardInfo type="button" onClick={() => handleSelectedFavorite(id)}>
        <Icon
          name="Star"
          size="extraSmall"
          stroke={isFavourite ? "orange" : "text"}
          color={isFavourite ? "orange" : "secondaryBackground"}
        />
      </S.CardInfo>
      <S.CardInfoContainer role="button" onClick={changeMarket}>
        <S.CardInfoContent>
          <S.CardToken>
            <Icon isToken name={tokenTicker} size="medium" color="text" />
          </S.CardToken>
          <S.CardInfoWrapper>
            <span>{pair}</span>
            <p>
              {t("vol")}
              {vol}
            </p>
          </S.CardInfoWrapper>
        </S.CardInfoContent>
        <S.CardPricing>
          <span>{price}</span>
        </S.CardPricing>
        <S.CardChange isNegative={isNegative(change.toString())}>
          <span>{change}</span>
        </S.CardChange>
      </S.CardInfoContainer>
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
          key={ticker}
        >
          {ticker}
        </S.FooterCard>
      ))}
  </S.Footer>
);

type SkeletonProps = {
  height?: string;
  width?: string;
};

export const MarketsSkeleton = ({
  height = normalizeValue(5.2),
  width = normalizeValue(27),
}: SkeletonProps) => <Skeleton height={height} width={width} />;
