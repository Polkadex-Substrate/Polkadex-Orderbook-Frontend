import { ReactNode } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Bar, Icon, Skeleton } from "@polkadex/orderbook-ui/molecules";

export const OpenOrderCard = ({
  date,
  baseUnit,
  quoteUnit,
  side,
  isSell,
  price,
  amount,
  total,
  filled,
  type = "Limit",
  onCancel,
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
        <span>{amount}</span>
      </S.Container>
      <S.Container>
        <span>{filled}</span>
      </S.Container>
      <S.Container>
        <span>{total}</span>
      </S.Container>
      <S.Container>
        {filled <= 100 && (
          <Icon
            name="Close"
            size="small"
            background="none"
            onClick={onCancel}
            style={{ cursor: "pointer" }}
          />
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export const OpenOrderCardReponsive = ({
  date,
  baseUnit,
  quoteUnit,
  side,
  isSell,
  price,
  amount,
  total,
  filled,
  type = "Limit",
  onCancel,
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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </S.Header>
      <S.Content>
        <OpenOrderInfo label="Date" value={date} />
        <OpenOrderInfo label="Type" value={type} />
        <OpenOrderInfo label="Price" value={price} />
        <OpenOrderInfo label="Amount" value={amount} />
        <OpenOrderInfo label="Total" value={total} />
      </S.Content>
      <S.Footer>
        <S.FlexJustify>
          <span>Filled</span>
          <p>100%</p>
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
const OpenOrderInfo = ({ label = "", value = "" }: InfoProps) => (
  <S.Info>
    <span>{label}</span>
    <p>{value}</p>
  </S.Info>
);

export const LoadingTransactions = () => {
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
