import { ReactNode } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Bar, Icon, Skeleton } from "@polkadex/orderbook-ui/molecules";
import { localeDate } from "@polkadex/web-helpers";

export const OpenOrderCard = ({
  date,
  baseUnit,
  quoteUnit,
  side,
  price,
  amount,
  total,
  filled,
  type,
  onCancel,
}: Props) => {
  return (
    <S.Wrapper>
      <span>{localeDate(date, "fullDate")}</span>
      <span>
        {baseUnit}/{quoteUnit}
      </span>
      <span>{type}</span>
      <S.Side isSell={side === "sell"}>{side}</S.Side>
      <span>{price}</span>
      <span>{amount}</span>
      <span>{filled}</span>
      <span>{total}</span>
      {filled <= 100 ? (
        <Icon
          name="Close"
          size="small"
          background="none"
          onClick={onCancel}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div />
      )}
    </S.Wrapper>
  );
};

export const OpenOrderCardReponsive = ({
  date,
  baseUnit,
  quoteUnit,
  side,
  price,
  amount,
  total,
  type = "Limit",
  onCancel,
}: Props) => {
  return (
    <S.Box>
      <S.Header isSell={side === "sell"}>
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
        <OpenOrderInfo label="Date" value={localeDate(date, "fullDate")} />
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
