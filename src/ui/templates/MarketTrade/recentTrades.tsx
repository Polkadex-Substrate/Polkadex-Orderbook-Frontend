import React from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Skeleton } from "src/ui/components";

export const RecentTrades = ({ data = [] }) => {
  return (
    <>
      <S.HeaderBox>
        <span>Time</span>
        <span>Amount</span>
        <span>Price</span>
      </S.HeaderBox>
      <S.Box>
        {data.length ? (
          data.map((item, index) => <RecentTradeCard key={index} />)
        ) : (
          <LoadingContainer />
        )}
      </S.Box>
    </>
  );
};

const RecentTradeCard = ({ time, amount, price, isSell, onClick }: Props) => {
  return (
    <S.ItemWrapper isSell={isSell} role="button" onClick={onClick}>
      <span>{time}</span>
      <span>{amount}</span>
      <span>{price}</span>
    </S.ItemWrapper>
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
    <S.ItemWrapper role="button">
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
    </S.ItemWrapper>
  );
};
