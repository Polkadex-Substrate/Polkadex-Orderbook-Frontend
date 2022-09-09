import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  selectCurrentMarket,
  selectTransactionLoading,
  transactionsFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import { DEFAULT_MARKET } from "@polkadex/web-constants";
import {
  TransactionHistoryCard,
  TransactionHistoryCardReponsive,
} from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/TransactionHistoryCard";

export const TransactionHistory = () => {
  const dispatch = useDispatch();
  const list = [];
  const fetching = useReduxSelector(selectTransactionLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket) || DEFAULT_MARKET;

  const { width } = useWindowSize();

  useEffect(() => {
    if (currentMarket) dispatch(transactionsFetch());
  }, [currentMarket, dispatch]);

  return (
    <S.Wrapper>
      {width > 1110 && (
        <S.Header>
          <span>Date</span>
          <span>TXID</span>
          <span>From</span>
          <span>To</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Currency</span>
          <span>Status</span>
          <span>Fee</span>
        </S.Header>
      )}
      {!fetching && (
        <S.Content>
          {list?.length &&
            list.map((transaction) => {
              const {
                id,
                timestamp,
                txid,
                fee,
                from,
                to,
                transaction_type,
                amount,
                currency,
                status,
              } = transaction;
              const CardComponent =
                width > 1130 ? TransactionHistoryCard : TransactionHistoryCardReponsive;
              return (
                <CardComponent
                  key={id}
                  txid={txid}
                  date={timestamp}
                  from={from}
                  to={to}
                  fee={fee.cost}
                  type={transaction_type}
                  currency={currency}
                  status={status}
                  amount={amount}
                />
              );
            })}
        </S.Content>
      )}
    </S.Wrapper>
  );
};
