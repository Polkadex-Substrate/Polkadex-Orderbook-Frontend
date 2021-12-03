import { ReactNode } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Bar, Skeleton } from "@polkadex/orderbook-ui/molecules";
import { localeDate } from "@polkadex/web-helpers";

export const TransactionHistoryCard = ({
  date,
  txid,
  fee,
  from,
  to,
  type,
  amount,
  currency,
  status,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Container>
        <span>{localeDate(new Date(date), "fullDate")}</span>
      </S.Container>
      <S.Container>
        <span>{txid}</span>
      </S.Container>
      <S.Container>
        <span>{from}</span>
      </S.Container>
      <S.Container>
        <span>{to}</span>
      </S.Container>
      <S.Container>
        <span>{type}</span>
      </S.Container>
      <S.Container>
        <span>{amount}</span>
      </S.Container>
      <S.Container>
        <span>{currency}</span>
      </S.Container>
      <S.Container>
        <span>{status}</span>
      </S.Container>
      <S.Container>
        <span>{fee}</span>
      </S.Container>
    </S.Wrapper>
  );
};

export const TransactionHistoryCardReponsive = ({
  date,
  txid,
  fee,
  from,
  to,
  type,
  amount,
  currency,
  status,
}: Props) => {
  return (
    <S.Box>
      <S.Header>
        <div>
          <p>{currency}</p>
          <span>{type}</span>
        </div>
      </S.Header>
      <S.Content>
        <TransactionHistoryInfo label="TXID" value={txid} />
        <TransactionHistoryInfo label="Date" value={localeDate(new Date(date), "fullDate")} />
        <TransactionHistoryInfo label="From" value={from} />
        <TransactionHistoryInfo label="To" value={to} />
        <TransactionHistoryInfo label="Fee" value={fee} />
      </S.Content>
      <S.Footer>
        <S.FlexJustify>
          <span>{amount}</span>
          <p>{status}</p>
        </S.FlexJustify>
        <Bar percent={0} />
      </S.Footer>
    </S.Box>
  );
};

type InfoProps = {
  label?: string;
  value?: string | number | ReactNode;
};
const TransactionHistoryInfo = ({ label = "", value = "" }: InfoProps) => (
  <S.Info>
    <span>{label}</span>
    <p>{value}</p>
  </S.Info>
);

export const TransactionHistoryLoading = () => {
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
