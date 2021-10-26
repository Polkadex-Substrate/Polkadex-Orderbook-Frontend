import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Decimal, LoadingTransactions, FundCard } from "src/ui";
import {
  selectCurrentMarket,
  selectUserLoggedIn,
  selectHistory,
  selectHistoryLoading,
  fetchHistory,
} from "src/modules";
import { useReduxSelector, useWindowSize } from "src/hooks";
import { localeDate } from "src/helpers";
import { DEFAULT_MARKET } from "src/constants";

export const Funds = () => {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectHistory);
  const fetching = useReduxSelector(selectHistoryLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket) || DEFAULT_MARKET;
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const { width } = useWindowSize();

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
      <S.Content>
        <FundCard
          key={1}
          tokenTicker="ETH"
          tokenName="Ethereum"
          handleTransfer={() => console.log("Transfer")}
          handleTrade={() => console.log("Transfer")}
        />
        <FundCard
          key={1}
          tokenTicker="DASH"
          tokenName="DASH"
          handleTransfer={() => console.log("Transfer")}
          handleTrade={() => console.log("Transfer")}
        />
      </S.Content>

      {/* {!fetching ? (
        <S.Content>
          {list?.map((item, i) => {
            const CardComponent = width > 1130 ? FundCard : null;
            return (
              <FundCard
                key={i}
                tokenIcon="Polkadex"
                pair="Polkadex"
                vol={0}
                priceFiat={0}
                price={0}
                change={0}
                onClick={console.log("...")}
              />
            );
          })}
        </S.Content>
      ) : (
        <LoadingTransactions />
      )} */}
    </S.Wrapper>
  );
};
