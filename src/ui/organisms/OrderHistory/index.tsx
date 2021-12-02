import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  selectCurrentMarket,
  selectUserLoggedIn,
  selectOrdersHistory,
  selectUserInfo,
  selectOrdersHistoryLoading,
  userOrdersHistoryFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import {
  LoadingTransactions,
  OrderHistoryCard,
  OrderHistoryCardReponsive,
} from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { localeDate } from "@polkadex/web-helpers";
import { DEFAULT_MARKET } from "@polkadex/web-constants";

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

  const list = useReduxSelector(selectOrdersHistory);
  const userAccount = useReduxSelector(selectUserInfo);

  const fetching = useReduxSelector(selectOrdersHistoryLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket) || DEFAULT_MARKET;
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const { width } = useWindowSize();

  useEffect(() => {
    if (userLoggedIn && currentMarket) {
      dispatch(userOrdersHistoryFetch({ userAccount }));
    }
  }, [userLoggedIn, currentMarket, dispatch, userAccount]);

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
            const { id, timestamp, price, amount, order_side, symbol, order_type } = item;
            const priceFixed = currentMarket ? currentMarket.price_precision : 0;
            const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
            const orderSide = order_side === "Sell";

            const date = localeDate(new Date(timestamp), "fullDate");
            const CardComponent = width > 1130 ? OrderHistoryCard : OrderHistoryCardReponsive;
            return (
              <CardComponent
                key={id}
                date={date}
                baseUnit={symbol[0]}
                quoteUnit={symbol[1]}
                side={order_side.toUpperCase()}
                isSell={orderSide}
                price={Decimal.format(price, priceFixed, ",")}
                amount={Decimal.format(amount, amountFixed, ",")}
                total={"100"}
                executed={"0.3"}
                type={order_type}
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
