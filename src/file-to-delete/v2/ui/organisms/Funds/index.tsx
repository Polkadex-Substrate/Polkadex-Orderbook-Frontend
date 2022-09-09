import { useDispatch } from "react-redux";
import { useEffect } from "react";

import * as S from "./styles";

import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import { FundCard, FundCardReponsive } from "@polkadex/orderbook-ui/molecules";
import {
  selectUserBalance,
  balancesFetch,
  selectHasCurrentTradeAccount,
  selectBalancesLoading,
} from "@polkadex/orderbook-modules";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

export const Funds = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const balances = useReduxSelector(selectUserBalance);
  const hasUser = useReduxSelector(selectHasCurrentTradeAccount);
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
      {!isLoading && (
        <S.Content>
          {balances?.length &&
            balances?.map((token, i) => {
              const CardComponent = width > 1130 ? FundCard : FundCardReponsive;
              const assetid = Number(token.symbol);
              const tokenName = getSymbolFromAssetId(assetid);
              return (
                <CardComponent
                  key={i}
                  tokenTicker={token.symbol}
                  tokenTickerName={""}
                  tokenName={tokenName}
                  totalAmount={""}
                  totalAmountFiat="0.0000000"
                  availableAmount={""}
                  availableAmountFiat="0.0000000"
                  reservedAmount={""}
                  reservedAmountFiat="0.0000000"
                  handleTransfer={undefined}
                  handleTrade={undefined}
                />
              );
            })}
        </S.Content>
      )}
    </S.Wrapper>
  );
};
