import React from "react";

import * as S from "./styles";

import { Skeleton } from "src/ui";

export default function OpenOrders({ data = [] }) {
  return (
    <S.OpenOrders>
      <S.ContentHeader>
        <span>Date</span>
        <span>Pair</span>
        <span>Type</span>
        <span>Side</span>
        <span>Price</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Total</span>
        <span></span>
      </S.ContentHeader>
      {data.length ? (
        data.map((item, index) => <OpenOrderCard key={index} />)
      ) : (
        <LoadingTransactions />
      )}
    </S.OpenOrders>
  );
}

const OpenOrderCard = ({
  date = "20/09/2021 21:00:11",
  baseUnit = "PDEX",
  quoteUnit = "100.000",
  side = "DOT",
  isSell = false,
  price = "100.000",
  amount = " 100.000",
  total = "100.000",
  filled = "Filled",
  type = "Limit",
  cancel = () => console.log("Cancel"),
}) => {
  return (
    <S.CardWrapper>
      <S.CardContainer>
        <span>{date}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>
          {baseUnit}/{quoteUnit}
        </span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{type}</span>
      </S.CardContainer>
      <S.CardContainer>
        <S.Side isSell={isSell}>{side}</S.Side>
      </S.CardContainer>
      <S.CardContainer>
        <span>{price}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{amount}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{filled}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{total}</span>
      </S.CardContainer>
      <S.CardContainer>
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      </S.CardContainer>
    </S.CardWrapper>
  );
};

const LoadingTransactions = () => {
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
    <S.CardWrapper>
      <S.CardContainer>
        <Skeleton height="1rem" />
      </S.CardContainer>
      <S.CardFlex>
        <Skeleton height="1rem" width="100%" style={{ marginRight: 5 }} />
        <Skeleton height="1rem" width="4rem" />
      </S.CardFlex>
      <S.CardContainer>
        <Skeleton height="1rem" />
      </S.CardContainer>
      <S.CardContainer>
        <Skeleton height="1rem" />
      </S.CardContainer>
      <S.CardContainer>
        <Skeleton height="1rem" />
      </S.CardContainer>
      <S.CardContainer>
        <Skeleton height="1rem" />
      </S.CardContainer>
      <S.CardContainer>
        <Skeleton height="1rem" />
      </S.CardContainer>
      <S.CardContainer>
        <Skeleton height="1rem" />
      </S.CardContainer>
    </S.CardWrapper>
  );
};
