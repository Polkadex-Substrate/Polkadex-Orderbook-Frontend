import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  openOrdersCancelFetch,
  selectCurrentMarket,
  selectOpenOrdersFetching,
  selectOpenOrdersHistory,
  selectUserLoggedIn,
  userOpenOrdersFetch,
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
  const fetching = useReduxSelector(selectOpenOrdersFetching);
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);

  const { width } = useWindowSize();

  const handleCancel = (index: number) =>
    dispatch(openOrdersCancelFetch({ order: openOrders[index] }));

  useEffect(() => {
    if (userLoggedIn && currentMarket)
      dispatch(userOpenOrdersFetch({ market: currentMarket }));
  }, [userLoggedIn, currentMarket]);

  console.log();
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
              uuid,
              date,
              baseUnit,
              quoteUnit,
              side,
              price,
              amount,
              total,
              filled,
              type,
            } = item;

            const CardComponent = width > 1110 ? OpenOrderCard : OpenOrderCardReponsive;
            return (
              <CardComponent
                key={uuid}
                uuid={uuid}
                date={date}
                baseUnit={baseUnit}
                quoteUnit={quoteUnit}
                side={side}
                price={price}
                filled={filled}
                amount={amount}
                total={total}
                type={type}
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
