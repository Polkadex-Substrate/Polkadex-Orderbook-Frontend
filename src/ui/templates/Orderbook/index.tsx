import * as React from "react";

import * as S from "./styles";

import { Decimal, Icon, Skeleton } from "src/ui/components";
import { Dropdown } from "src/ui/molecules";
import { useReduxSelector } from "src/hooks";
import {
  Market,
  selectCurrentMarket,
  selectDepthAsks,
  selectDepthBids,
  selectDepthLoading,
  selectLastRecentTrade,
  selectMarketTickers,
  Ticker,
} from "src/modules";
import { accumulateVolume } from "src/helpers";
export const Orderbook = () => {
  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const orderBookLoading = useReduxSelector(selectDepthLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const lastRecentTrade = useReduxSelector(selectLastRecentTrade);
  const marketTickers = useReduxSelector(selectMarketTickers);

  const getTickerValue = (currentMarket: Market, tickers: { [key: string]: Ticker }) =>
    tickers[currentMarket?.id];

  const currentTicker = getTickerValue(currentMarket, marketTickers);

  const getLastPrice = () => {
    let lastPrice = "";
    if (lastRecentTrade?.market === currentMarket?.id) {
      lastPrice = lastRecentTrade?.price;
    } else {
      lastPrice = currentTicker?.last;
    }
    return lastPrice;
  };

  return (
    <S.Wrapper>
      <S.Header>
        <h2>Orderbook</h2>
        <S.Options>
          <ul>
            <li>
              <Icon icon="OrdersBuy" size="xsmall" />
            </li>
            <li>
              <Icon icon="OrdersAll" size="xsmall" />
            </li>
            <li>
              <Icon icon="OrdersSell" size="xsmall" />
            </li>
          </ul>
          <Dropdown title="001" direction="bottom">
            <p>testing</p>
          </Dropdown>
        </S.Options>
      </S.Header>
      {!orderBookLoading || !currentMarket ? (
        <S.Content>
          <OrderbookColumn data={asks} side="asks" />
          <S.Select>
            <S.LastPriceWrapper>
              Latest Price
              <S.LastPrice isPositive={currentTicker?.price_change_percent.includes("+")}>
                {Decimal.format(getLastPrice(), currentMarket?.price_precision, ",")}&nbsp;
                {currentMarket?.quote_unit.toUpperCase()}
              </S.LastPrice>
            </S.LastPriceWrapper>
          </S.Select>
          <OrderbookColumn data={bids} side="bids" />
        </S.Content>
      ) : (
        <S.Content>
          <LoadingContainer />
          <S.Select>
            <Skeleton width="4rem" style={{ display: "inline-block", marginLeft: 5 }} />
          </S.Select>
          <LoadingContainer />
        </S.Content>
      )}
    </S.Wrapper>
  );
};

const OrderbookColumn = ({ data = [], side = "asks", isLarge = true }) => {
  const currentMarket = useReduxSelector(selectCurrentMarket);

  const formattedBaseUnit = currentMarket?.base_unit.toUpperCase();
  const formattedQuoteUnit = currentMarket?.quote_unit.toUpperCase();
  const priceFixed = currentMarket?.price_precision || 0;
  const amountFixed = currentMarket?.amount_precision || 0;

  const isSell = side === "asks";

  return (
    <S.Box>
      <S.BoxHeader>
        <span>Price({formattedBaseUnit})</span>
        <span>Amount({formattedQuoteUnit})</span>
        <span>Total({formattedBaseUnit})</span>
      </S.BoxHeader>
      <S.BoxContent>
        {data &&
          data.map((item, index) => {
            const total = isLarge
              ? accumulateVolume(data)
              : accumulateVolume(data.slice(0).reverse()).slice(0).reverse();
            const [price, volume] = item;
            return (
              <S.OrderbookCard key={index}>
                <S.OrderbookPrice isSell={isSell}>
                  <Decimal
                    key={index}
                    fixed={priceFixed}
                    thousSep=","
                    prevValue={data[index + 1] ? data[index + 1][0] : 0}>
                    {price}
                  </Decimal>
                </S.OrderbookPrice>
                <S.OrderbookAmount>
                  <Decimal key={index} fixed={amountFixed} thousSep=",">
                    {volume}
                  </Decimal>
                </S.OrderbookAmount>
                <S.OrderbookCardWrapper>
                  <Decimal key={index} fixed={amountFixed} thousSep=",">
                    {total[index]}
                  </Decimal>
                </S.OrderbookCardWrapper>
              </S.OrderbookCard>
            );
          })}
      </S.BoxContent>
    </S.Box>
  );
};

const LoadingContainer = () => {
  return (
    <S.Box>
      <S.BoxHeader>
        <span>Price</span>
        <span>Amount</span>
        <span>Total</span>
      </S.BoxHeader>
      <S.BoxContent>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </S.BoxContent>
    </S.Box>
  );
};

const LoadingCard = () => {
  return (
    <S.OrderbookCard style={{ marginBottom: "0.8rem" }}>
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
    </S.OrderbookCard>
  );
};
