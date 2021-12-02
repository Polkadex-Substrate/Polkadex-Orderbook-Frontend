import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  openOrdersCancelFetch,
  selectCurrentMarket,
  selectOpenOrdersFetching,
  selectOpenOrdersHistory,
  selectOrdersHistoryLoading,
  selectUserInfo,
  selectUserLoggedIn,
  userOpenOrdersFetch,
  userOrdersHistoryFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import {
  LoadingTransactions,
  OpenOrderCard,
  OpenOrderCardReponsive,
} from "@polkadex/orderbook-ui/molecules";

export const OpenOrders = () => {
  const dispatch = useDispatch();

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const openOrders = useReduxSelector(selectOpenOrdersHistory);
  const fetching = useReduxSelector(selectOrdersHistoryLoading);

  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const userAccount = useReduxSelector(selectUserInfo);
  const { width } = useWindowSize();

  const handleCancel = (index: number) =>
    dispatch(openOrdersCancelFetch({ order: openOrders[index] }));

  useEffect(() => {
    if (userLoggedIn && currentMarket) {
      dispatch(userOrdersHistoryFetch({ userAccount }));
    }
  }, [userLoggedIn, currentMarket, dispatch, userAccount]);

  console.log({ openOrders });
  return (
    <S.Wrapper>
      {width > 1110 && (
        <S.Header>
          <span>Date</span>
          <span>Pair</span>
          <span>Type</span>
          <span>Side</span>
          <span>Price</span>
          <span>Amount</span>
          <span>Filled</span>
          <span>Total</span>
          <span></span>
        </S.Header>
      )}
      {!fetching ? (
        <S.Content>
          {openOrders?.map((item, index) => {
            const {
              id,
              timestamp,
              symbol,
              order_side,
              price,
              amount,
              average,
              filled,
              order_type,
            } = item;

            const CardComponent = width > 1110 ? OpenOrderCard : OpenOrderCardReponsive;
            return (
              <CardComponent
                key={id}
                id={id}
                timestamp={timestamp}
                symbol={symbol}
                order_side={order_side}
                price={price}
                filled={filled}
                amount={amount}
                average={average}
                order_type={order_type}
                onCancel={() => handleCancel(index)}
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
