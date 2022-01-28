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
      dispatch(userOrdersHistoryFetch());
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
          <span>Status</span>
        </S.Header>
      )}
      {!fetching ? (
        <S.Content>
          {list?.map((item, i) => {
            const {
              order_id,
              timestamp,
              base_asset,
              quote_asset,
              order_side,
              price,
              amount,
              filled_qty,
              status,
              order_type,
            } = item;
            const priceFixed = currentMarket ? currentMarket.price_precision : 0;
            const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
            const orderSide = order_side === "Sell";
            const orderPrice = order_type === "Limit" ? price : average;
            const date = localeDate(new Date(Number(timestamp)), "fullDate");
            const CardComponent = width > 1130 ? OrderHistoryCard : OrderHistoryCardReponsive;
            return (
              <CardComponent
                key={order_id}
                date={date}
                baseUnit={base_asset}
                quoteUnit={quote_asset}
                side={order_side.toUpperCase()}
                isSell={orderSide}
                price={Decimal.format(orderPrice, priceFixed, ",")}
                amount={Decimal.format(amount, amountFixed, ",")}
                total={Number(price) * Number(amount)}
                executed={filled_qty}
                type={order_type}
                transactionType={status}
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
