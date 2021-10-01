import * as React from "react";
import { useSelector } from "react-redux";

import * as S from "./styles";

import { Decimal, Icon, Skeleton } from "src/ui/components";
import { Dropdown } from "src/ui/molecules";
import { useReduxSelector } from "src/hooks";
import {
  Market,
  PublicTrade,
  RootState,
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  selectDepthLoading,
  selectLastRecentTrade,
  selectMarketTickers,
  selectMobileDeviceState,
  selectOpenOrdersList,
  setCurrentPrice,
  depthIncrementSubscribeResetLoading,
  Ticker,
} from "src/modules";
import { accumulateVolume } from "src/helpers";
export const Orderbook = () => {
  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const orderBookLoading = useReduxSelector(selectDepthLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const lastRecentTrade = useReduxSelector(selectLastRecentTrade);
  const marketTickers = useReduxSelector(selectMarketTickers);

  const formattedBaseUnit = currentMarket?.base_unit.toUpperCase();
  const formattedQuoteUnit = currentMarket?.quote_unit.toUpperCase();

  const getTickerValue = (currentMarket: Market, tickers: { [key: string]: Ticker }) =>
    tickers[currentMarket?.id];

  const currentTicker = getTickerValue(currentMarket, marketTickers);

  const data = [];
  const getLastPrice = () => {
    let lastPrice = "";
    if (lastRecentTrade?.market === currentMarket?.id) {
      lastPrice = lastRecentTrade?.price;
    } else {
      lastPrice = currentTicker?.last;
    }
    return lastPrice;
  };

  const getOrderbookData = (array: string[][], side: "asks" | "bids", isLarge: boolean) => {
    let total = accumulateVolume(array);
    const priceFixed = currentMarket?.price_precision || 0;
    const amountFixed = currentMarket?.amount_precision || 0;

    return array.length
      ? array.map((item, i) => {
          const [price, volume] = item;

          switch (side) {
            case "asks":
              total = isLarge
                ? accumulateVolume(array)
                : accumulateVolume(array.slice(0).reverse()).slice(0).reverse();

              return [
                <Decimal
                  key={i}
                  fixed={priceFixed}
                  thousSep=","
                  prevValue={array[i + 1] ? array[i + 1][0] : 0}>
                  {price}
                </Decimal>,
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {volume}
                </Decimal>,
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {total[i]}
                </Decimal>,
              ];
            default:
              if (isLarge) {
                return [
                  <Decimal key={i} fixed={amountFixed} thousSep=",">
                    {total[i]}
                  </Decimal>,
                  <Decimal key={i} fixed={amountFixed} thousSep=",">
                    {volume}
                  </Decimal>,
                  <Decimal
                    key={i}
                    fixed={priceFixed}
                    thousSep=","
                    prevValue={array[i - 1] ? array[i - 1][0] : 0}>
                    {price}
                  </Decimal>,
                ];
              } else {
                return [
                  <Decimal
                    key={i}
                    fixed={priceFixed}
                    thousSep=","
                    prevValue={array[i - 1] ? array[i - 1][0] : 0}>
                    {price}
                  </Decimal>,
                  <Decimal key={i} fixed={amountFixed} thousSep=",">
                    {volume}
                  </Decimal>,
                  <Decimal key={i} fixed={amountFixed} thousSep=",">
                    {total[i]}
                  </Decimal>,
                ];
              }
          }
        })
      : [[]];
  };
  console.log("ASKS:", asks);

  console.log(getOrderbookData(asks, "asks", true));
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
          <OrderbookColumn data={data} />
          <S.Select>
            <S.LastPriceWrapper>
              Latest Price
              <S.LastPrice isPositive={currentTicker?.price_change_percent.includes("+")}>
                {Decimal.format(getLastPrice(), currentMarket?.price_precision, ",")}&nbsp;
                {currentMarket?.quote_unit.toUpperCase()}
              </S.LastPrice>
            </S.LastPriceWrapper>
          </S.Select>
          <OrderbookColumn data={data} />
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

const OrderbookColumn = ({ baseQuote = "", baseUnit = "", data = [] }) => {
  return (
    <S.Box>
      <S.BoxHeader>
        <span>Price{baseQuote}</span>
        <span>Amount{baseUnit}</span>
        <span>Total{baseQuote}</span>
      </S.BoxHeader>
      <S.BoxContent>
        {data &&
          data.map((item, index) => (
            <OrderbookCard
              key={index}
              price={item.price}
              amount={item.amount}
              total={item.total}
            />
          ))}
      </S.BoxContent>
    </S.Box>
  );
};

const OrderbookCard = ({ price = "", isSell = false, amount = "", total = "" }) => (
  <S.OrderbookItem>
    <S.OrderbookPrice isSell={isSell}>{price}</S.OrderbookPrice>
    <S.OrderbookAmount>{amount}</S.OrderbookAmount>
    <S.OrderbookItemWrapper>{total}</S.OrderbookItemWrapper>
  </S.OrderbookItem>
);

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
    <S.OrderbookItem style={{ marginBottom: "0.8rem" }}>
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
    </S.OrderbookItem>
  );
};
