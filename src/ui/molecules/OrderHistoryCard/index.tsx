import { ReactNode } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Bar, Icon, Skeleton } from "src/ui";

export const OrderHistoryCard = ({
  date,
  baseUnit,
  quoteUnit,
  side,
  isSell,
  price,
  amount,
  total,
  executed,
  type = "Limit",
  transactionType,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Container>
        <span>{date}</span>
      </S.Container>
      <S.Container>
        <span>
          {baseUnit}/{quoteUnit}
        </span>
      </S.Container>
      <S.Container>
        <span>{type}</span>
      </S.Container>
      <S.Container>
        <S.Side isSell={isSell}>{side}</S.Side>
      </S.Container>
      <S.Container>
        <span>{price}</span>
      </S.Container>
      <S.Container>
        <span>{executed}</span>
      </S.Container>
      <S.Container>
        <span>{amount}</span>
      </S.Container>
      <S.Container>
        <span>{total}</span>
      </S.Container>
      <S.Container>
        <span>{transactionType}</span>
      </S.Container>
    </S.Wrapper>
  );
};

export const OrderHistoryCardReponsive = ({
  date,
  baseUnit,
  quoteUnit,
  side,
  isSell,
  price,
  amount,
  total,
  executed,
  type = "Limit",
  transactionType,
}: Props) => {
  return (
    <S.Box>
      <S.Header isSell={isSell}>
        <div>
          <p>
            {baseUnit}/{quoteUnit}
          </p>
          <span>{side}</span>
        </div>
      </S.Header>
      <S.Content>
        <OrderHistoryInfo label="Date" value={date} />
        <OrderHistoryInfo label="Type" value={type} />
        <OrderHistoryInfo label="Price" value={price} />
        <OrderHistoryInfo label="Amount" value={amount} />
        <OrderHistoryInfo label="Total" value={total} />
      </S.Content>
      <S.Footer>
        <S.FlexJustify>
          <span>{executed}</span>
          <p>{transactionType}</p>
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
const OrderHistoryInfo = ({ label = "", value = "" }: InfoProps) => (
  <S.Info>
    <span>{label}</span>
    <p>{value}</p>
  </S.Info>
);

export const OrderHistoryLoading = () => {
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
