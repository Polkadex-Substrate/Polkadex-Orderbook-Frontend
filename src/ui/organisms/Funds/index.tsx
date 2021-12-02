import { useDispatch } from "react-redux";
import { useEffect } from "react";

import * as S from "./styles";

import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import { FundCard, LoadingTransactions } from "@polkadex/orderbook-ui/molecules";
import {
  selectUserBalance,
  balancesFetch,
  selectHasUser,
  selectBalancesLoading,
} from "@polkadex/orderbook-modules";

export const Funds = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const balances = useReduxSelector(selectUserBalance);
  const hasUser = useReduxSelector(selectHasUser);
  const isLoading = useReduxSelector(selectBalancesLoading);

  useEffect(() => {
    if (hasUser) dispatch(balancesFetch());
  }, [hasUser, dispatch]);

  return (
    <S.Wrapper>
      {width > 1110 && (
        <S.Header>
          <span>Token</span>
          <span>Total</span>
          <span>Available</span>
          <span>Reserved</span>
          <span>Actions</span>
        </S.Header>
      )}
      {!isLoading ? (
        <S.Content>
          {balances?.length &&
            balances?.map((token, i) => {
              const CardComponent = width > 1130 ? FundCard : null;
              return (
                <FundCard
                  key={i}
                  tokenTicker={token.ticker}
                  tokenName={token.ticker}
                  totalAmount={token.total.toString()}
                  totalAmountFiat="0.0000000"
                  availableAmount={token.free.toString()}
                  availableAmountFiat="0.0000000"
                  reservedAmount={token.used.toString()}
                  reservedAmountFiat="0.0000000"
                  handleTransfer={() => console.log("Transfer")}
                  handleTrade={() => console.log("Trade")}
                />
              );
            })}
        </S.Content>
      ) : (
        <LoadingTransactions />
      )}
    </S.Wrapper>
  );
};
