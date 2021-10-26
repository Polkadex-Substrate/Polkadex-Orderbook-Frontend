import { ReactNode } from "react";
import { BiFemaleSign } from "react-icons/bi";

import * as S from "./styles";
import { Props } from "./types";

import { Bar, Icon, IconToken, Skeleton, Tag } from "src/ui";

export const FundCard = ({
  tokenTicker,
  tokenName,
  totalAmount = "0.0000000",
  totalAmountFiat = "0.0000000",
  availableAmount = "0.0000000",
  availableAmountFiat = "0.0000000",
  reservedAmount = "0.0000000",
  reservedAmountFiat = "0.0000000",
  handleTransfer,
  handleTrade,
}: Props) => (
  <S.Wrapper>
    <S.Token>
      {tokenTicker ? (
        <IconToken
          size="large"
          icon={tokenTicker}
          style={{ width: "3.5rem", height: "3.5rem", borderRadius: "25%", padding: 2 }}
        />
      ) : (
        <Skeleton width="4rem" height="4rem" style={{ marginRight: 10 }} />
      )}
      <div>
        {tokenName ? (
          <p>{tokenName}</p>
        ) : (
          <Skeleton width="10rem" style={{ marginBottom: 10 }} />
        )}
        {tokenTicker ? <span> {tokenTicker}</span> : <Skeleton width="6rem" />}
      </div>
    </S.Token>
    <S.Container>
      {totalAmount ? (
        <p>{totalAmount}</p>
      ) : (
        <Skeleton width="6rem" style={{ marginBottom: 10 }} />
      )}
      {totalAmountFiat ? <span>~${totalAmountFiat}</span> : <Skeleton width="4rem" />}
    </S.Container>
    <S.Container>
      {availableAmount ? (
        <p>$ {availableAmount}</p>
      ) : (
        <Skeleton width="6rem" style={{ marginBottom: 10 }} />
      )}
      {availableAmountFiat ? <span>~${availableAmountFiat}</span> : <Skeleton width="4rem" />}
    </S.Container>
    <S.Container>
      {reservedAmount ? (
        <p>{reservedAmount}</p>
      ) : (
        <Skeleton width="6rem" style={{ marginBottom: 10 }} />
      )}
      {reservedAmountFiat ? <span>~${reservedAmountFiat}</span> : <Skeleton width="4rem" />}
    </S.Container>
    <S.Actions>
      <button type="button" onClick={handleTransfer}>
        Transfer
      </button>
      <button type="button" onClick={handleTrade}>
        Trade
      </button>
    </S.Actions>
  </S.Wrapper>
);
