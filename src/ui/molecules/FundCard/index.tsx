import { ReactNode } from "react";
import * as cryptoIcons from "@styled-icons/crypto";

import { AvailableMessage } from "../AvailableMessage";

import * as S from "./styles";
import { Props } from "./types";

import { Skeleton } from "@polkadex/orderbook-ui/molecules";

export const FundCard = ({
  tokenTicker,
  tokenTickerName,
  tokenName,
  totalAmount = "0.0000000",
  totalAmountFiat = "0.0000000",
  availableAmount = "0.0000000",
  availableAmountFiat = "0.0000000",
  reservedAmount = "0.0000000",
  reservedAmountFiat = "0.0000000",
  handleTransfer,
  handleTrade,
}: Props) => {
  const IconComponent = cryptoIcons[tokenTickerName];
  return (
    <S.Wrapper>
      <S.Token>
        {tokenTickerName && IconComponent ? (
          <S.TokenWrapper>
            <IconComponent />
          </S.TokenWrapper>
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
          <p>{availableAmount}</p>
        ) : (
          <Skeleton width="6rem" style={{ marginBottom: 10 }} />
        )}
        {availableAmountFiat ? (
          <span>~${availableAmountFiat}</span>
        ) : (
          <Skeleton width="4rem" />
        )}
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
        <AvailableMessage message="Soon" style={{ display: "inline-block" }}>
          <button type="button" onClick={handleTransfer}>
            Transfer
          </button>
        </AvailableMessage>
        <button type="button" onClick={handleTrade}>
          Trade
        </button>
      </S.Actions>
    </S.Wrapper>
  );
};

export const FundCardReponsive = ({
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
}: Props) => {
  return (
    <S.Box>
      <S.Header>
        <div>
          <p>{tokenName}</p>
          <span>{tokenTicker}</span>
        </div>
      </S.Header>
      <S.Content>
        <FundCardInfo label="Total Amount" value={totalAmount} />
        <FundCardInfo label="Total Amount Fiat" value={totalAmountFiat} />
        <FundCardInfo label="Available Amount" value={availableAmount} />
        <FundCardInfo label="Available Amount Fiat" value={availableAmountFiat} />
        <FundCardInfo label="Reserved Amount" value={reservedAmount} />
        <FundCardInfo label="Reserved Amount Fiat" value={reservedAmountFiat} />
      </S.Content>
    </S.Box>
  );
};
type InfoProps = {
  label?: string;
  value?: string | number | ReactNode;
};
const FundCardInfo = ({ label = "", value = "" }: InfoProps) => (
  <S.Info>
    <span>{label}</span>
    <p>{value}</p>
  </S.Info>
);
