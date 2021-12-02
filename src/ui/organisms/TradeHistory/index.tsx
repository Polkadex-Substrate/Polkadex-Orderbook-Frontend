import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  selectCurrentMarket,
  selectUserLoggedIn,
  selectTradesData,
  tradesFetch,
  selectTradesLoading,
} from "@polkadex/orderbook-modules";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import {
  LoadingTransactions,
  TradeHistoryCard,
  TradeHistoryCardReponsive,
} from "@polkadex/orderbook-ui/molecules";
import { localeDate } from "@polkadex/web-helpers";
import { DEFAULT_MARKET } from "@polkadex/web-constants";

export const TradeHistory = () => {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectTradesData);

  const fetching = useReduxSelector(selectTradesLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket) || DEFAULT_MARKET;
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const { width } = useWindowSize();

  useEffect(() => {
    if (userLoggedIn && currentMarket) dispatch(tradesFetch());
  }, [userLoggedIn, currentMarket, dispatch]);

  return (
    <S.Wrapper>
      {width > 1110 && (
        <S.Header>
          <span>Date</span>
          <span>Symbol</span>
          <span>Side</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Fee</span>
          <span>Realized Profit</span>
        </S.Header>
      )}
      {!fetching ? (
        <S.Content>
          {list?.length &&
            list.map((trade) => {
              const { id, timestamp, price, amount, order_side, fee, symbol } = trade;
              const date = localeDate(new Date(timestamp), "fullDate");
              const CardComponent =
                width > 1130 ? TradeHistoryCard : TradeHistoryCardReponsive;
              return (
                <CardComponent
                  key={id}
                  date={date}
                  symbol={symbol[0]}
                  fee={fee.cost}
                  profit="0.00000"
                  side={order_side}
                  price={price}
                  quantity={amount}
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
