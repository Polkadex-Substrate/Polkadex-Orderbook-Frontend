import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  Decimal,
  LoadingTransactions,
  OrderHistoryCard,
  OrderHistoryCardReponsive,
} from "src/ui";
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

const timeFrom = String(Math.floor((Date.now() - 1000 * 60 * 60 * 24) / 1000));
const handleHighlightValue = (prevValue: string, curValue: string) => {
  let highlighted = "";
  let val = curValue;
  let prev = prevValue;

  while (val !== prev && val.length > 0) {
    highlighted = val[val.length - 1] + highlighted;
    val = val.slice(0, -1);
    prev = prev.slice(0, -1);
  }

  return (
    <>
      {val}
      {highlighted}
    </>
  );
};

export const OrderHistory = () => {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectHistory);
  const fetching = useReduxSelector(selectHistoryLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket) || DEFAULT_MARKET;
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const { width } = useWindowSize();

  useEffect(() => {
    if (userLoggedIn && currentMarket)
      dispatch(
        fetchHistory({
          type: "trades",
          page: 0,
          time_from: timeFrom,
          market: currentMarket.id,
        })
      );
  }, [userLoggedIn, currentMarket]);

  return (
    <S.Wrapper>
      {width > 1110 && (
        <S.Header>
          <span>Date</span>
          <span>Pair</span>
          <span>Type</span>
          <span>Side</span>
          <span>Price</span>
          <span>Executed</span>
          <span>Amount</span>
          <span>Total</span>
          <span>All</span>
        </S.Header>
      )}
      {!fetching ? (
        <S.Content>
          {list?.map((item, i) => {
            const { id, created_at, price, amount, taker_type } = item;
            const priceFixed = currentMarket ? currentMarket.price_precision : 0;
            const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
            const orderSide = taker_type === "sell";

            const higlightedDate = handleHighlightValue(
              String(localeDate([...list][i - 1] ? [...list][i - 1].created_at : "", "time")),
              String(localeDate(created_at, "time"))
            );

            const date = localeDate(created_at, "fullDate");
            const CardComponent = width > 1130 ? OrderHistoryCard : OrderHistoryCardReponsive;
            return (
              <CardComponent
                key={id}
                date={date}
                baseUnit={"TEST"}
                quoteUnit={"NOTEST"}
                side={taker_type.toUpperCase()}
                isSell={orderSide}
                price={Decimal.format(price, priceFixed, ",")}
                amount={Decimal.format(amount, amountFixed, ",")}
                total={"100"}
                executed={"0.3"}
                type={"Limit"}
                transactionType={"filled"}
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
