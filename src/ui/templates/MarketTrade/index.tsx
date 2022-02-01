import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  selectCurrentMarket,
  recentTradesFetch,
  selectRecentTradesOfCurrentMarket,
  PublicTrade,
  selectRecentTrades,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { localeDate } from "@polkadex/web-helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { Skeleton } from "@polkadex/orderbook-ui/molecules";

const getHighLightValue = (prevValue: string, curValue: string) => {
  let highlighted = "";
  let val = curValue;
  let prev = prevValue;

  while (val !== prev && val.length > 0) {
    highlighted = val[val.length - 1] + highlighted;
    val = val.slice(0, -1);
    prev = prev.slice(0, -1);
  }

  return `${val}${highlighted}`;
};

export const MarketTrade = () => {
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const recentTrades: PublicTrade[] = useReduxSelector(selectRecentTradesOfCurrentMarket);
  useEffect(() => {
    if (currentMarket) dispatch(recentTradesFetch(currentMarket));
  }, [dispatch, currentMarket]);

  return (
    <S.Wrapper>
      <S.Header>
        <h2>Market Trade</h2>
      </S.Header>
      <S.Content>
        <S.HeaderBox>
          <span>Time</span>
          <span>Amount</span>
          <span>Price</span>
        </S.HeaderBox>
        <S.Box>
          {recentTrades.length ? (
            recentTrades.map((item, index) => {
              const higlightedDate = getHighLightValue(
                localeDate(
                  recentTrades[index - 1] ? recentTrades[index - 1].timestamp.toString() : "",
                  "time"
                ),
                localeDate(item.timestamp.toString(), "time")
              );

              return (
                <Card
                  key={index}
                  isSell={item.order_side === "Sell"}
                  time={item.timestamp}
                  price={Decimal.format(item.price, currentMarket.price_precision, ",")}
                  amount={Decimal.format(item.amount, currentMarket.amount_precision, ",")}
                />
              );
            })
          ) : (
            <LoadingContainer />
          )}
        </S.Box>
      </S.Content>
    </S.Wrapper>
  );
};

const Card = ({ time, amount, price, isSell = false }) => {
  return (
    <S.CardWrapper isSell={isSell}>
      <span>{time}</span>
      <span>{amount}</span>
      <span>{price}</span>
    </S.CardWrapper>
  );
};

const LoadingContainer = () => (
  <>
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
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </>
);

const LoadingCard = () => {
  return (
    <S.CardWrapper>
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
    </S.CardWrapper>
  );
};
