import { ReactNode } from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Bar, Icon, Skeleton } from "@polkadex/orderbook-ui/molecules";
import { localeDate } from "@polkadex/web-helpers";

export const OpenOrderCard = ({
  order_id,
  timestamp,
  base_asset,
  quote_asset,
  order_side,
  price,
  amount,
  filled_qty,
  order_type,
  onCancel,
}: Props) => {
  const baseUnit = base_asset;
  const quoteUnit = quote_asset;
  return (
    <S.Wrapper>
      <span>{localeDate(new Date(Number(timestamp)), "fullDate")}</span>
      <span>
        {baseUnit}/{quoteUnit}
      </span>
      <span>{order_type}</span>
      <S.Side isSell={order_side === "Sell"}>{order_side}</S.Side>
      <span>{price}</span>
      <span>{amount}</span>
      <span>{filled_qty}</span>
      <span>{Number(price) * Number(amount)}</span>
      {Number(filled_qty) <= 100 ? (
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
  order_id,
  timestamp,
  base_asset,
  quote_asset,
  order_side,
  price,
  amount,
  filled_qty,
  order_type = "Limit",
  onCancel,
}: Props) => {
  const baseUnit = base_asset;
  const quoteUnit = quote_asset;
  return (
    <S.Box>
      <S.Header isSell={order_side === "Sell"}>
        <div>
          <p>
            {baseUnit}/{quoteUnit}
          </p>
          <span>{order_side}</span>
        </div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </S.Header>
      <S.Content>
        <OpenOrderInfo
          label="Date"
          value={localeDate(new Date(Number(timestamp)), "fullDate")}
        />
        <OpenOrderInfo label="Type" value={order_type} />
        <OpenOrderInfo label="Price" value={price} />
        <OpenOrderInfo label="Amount" value={amount} />
        <OpenOrderInfo label="Total" value={Number(price) * Number(amount)} />
      </S.Content>
      <S.Footer>
        <S.FlexJustify>
          <span>Filled</span>
          <p>{filled_qty}</p>
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
