import { ReactNode } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Skeleton } from "@polkadex/orderbook-ui/molecules";
import { localeDate } from "@polkadex/web-helpers";

export const TradeHistoryCard = ({
  date,
  symbol,
  fee,
  profit,
  side,
  price,
  quantity,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Container>
        <span>{date}</span>
      </S.Container>
      <S.Container>
        <span>{symbol}</span>
      </S.Container>
      <S.Container>
        <S.Side isSell={side === "Sell"}>{side}</S.Side>
      </S.Container>
      <S.Container>
        <span>{price}</span>
      </S.Container>
      <S.Container>
        <span>{quantity}</span>
      </S.Container>
    </S.Wrapper>
  );
};

export const TradeHistoryCardReponsive = ({
  date,
  symbol,
  fee,
  profit,
  side,
  price,
  quantity,
}: Props) => {
  return (
    <S.Box>
      <S.Header isSell={side === "Sell"}>
        <div>
          <p>{symbol}</p>
          <span>{side}</span>
        </div>
      </S.Header>
      <S.Content>
        <TradeHistoryInfo label="Date" value={date} />
        <TradeHistoryInfo label="Price" value={price} />
        <TradeHistoryInfo label="Quantity" value={quantity} />
      </S.Content>
    </S.Box>
  );
};

type InfoProps = {
  label?: string;
  value?: string | number | ReactNode;
};
const TradeHistoryInfo = ({ label = "", value = "" }: InfoProps) => (
  <S.Info>
    <span>{label}</span>
    <p>{value}</p>
  </S.Info>
);

export const TradeHistoryLoading = () => {
  return (
    <div style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
    </div>
  );
};

const LoadingTransactionItem = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <Skeleton height="1rem" />
      </S.Container>
      <S.Flex>
        <Skeleton height="1rem" width="100%" style={{ marginRight: 5 }} />
        <Skeleton height="1rem" width="4rem" />
      </S.Flex>
      <S.Container>
        <Skeleton height="1rem" />
      </S.Container>
      <S.Container>
        <Skeleton height="1rem" />
      </S.Container>
      <S.Container>
        <Skeleton height="1rem" />
      </S.Container>
      <S.Container>
        <Skeleton height="1rem" />
      </S.Container>
      <S.Container>
        <Skeleton height="1rem" />
      </S.Container>
      <S.Container>
        <Skeleton height="1rem" />
      </S.Container>
    </S.Wrapper>
  );
};
