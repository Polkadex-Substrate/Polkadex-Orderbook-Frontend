import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  openOrdersCancelFetch,
  selectCancelOpenOrdersFetching,
  selectCurrentMarket,
  selectOpenOrdersFetching,
  selectOpenOrdersList,
  selectUserLoggedIn,
  userOpenOrdersFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector, useWindowSize } from "@polkadex/orderbook-hooks";
import { Decimal, LoadingTransactions, OpenOrderCard, OpenOrderCardReponsive } from "src/ui";

export const OpenOrders = () => {
  const dispatch = useDispatch();

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const list = useReduxSelector(selectOpenOrdersList);
  const fetching = useReduxSelector(selectOpenOrdersFetching);
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const cancelFetching = useReduxSelector(selectCancelOpenOrdersFetching);

  const { width } = useWindowSize();

  const handleCancel = (index: number) =>
    list && dispatch(openOrdersCancelFetch({ order: list[index], list }));

  // const handleCancelAll = () =>
  // currentMarket && dispatch(ordersCancelAllFetch({ market: currentMarket.id }));

  const currentMarketData = () => {
    const currentAskUnit = currentMarket?.base_unit?.toUpperCase() || "";
    const currentBidUnit = currentMarket?.quote_unit?.toUpperCase() || "";
    return {
      currentAskUnit,
      currentBidUnit,
    };
  };

  useEffect(() => {
    if (userLoggedIn && currentMarket)
      dispatch(userOpenOrdersFetch({ market: currentMarket }));
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
          <span>Amount</span>
          <span>Status</span>
          <span>Total</span>
          <span></span>
        </S.Header>
      )}
      {!fetching ? (
        <S.Content>
          {list?.map((item, index) => {
            const { id, price, created_at, remaining_volume, origin_volume, side } = item;
            const executedVolume = Number(origin_volume) - Number(remaining_volume);
            const remainingAmount = Number(remaining_volume);
            const total = Number(origin_volume) * Number(price);
            const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
            const priceFixed = currentMarket ? currentMarket.price_precision : 0;
            const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
            const orderSide = side === "buy";
            const CardComponent = width > 1110 ? OpenOrderCard : OpenOrderCardReponsive;
            return (
              <CardComponent
                key={id}
                date={localeDate(created_at, "fullDate")}
                baseUnit={currentMarketData().currentAskUnit}
                quoteUnit={currentMarketData().currentBidUnit}
                side={side}
                isSell={orderSide}
                price={Decimal.format(price, priceFixed, ",")}
                amount={Decimal.format(total, amountFixed, ",")}
                total={Decimal.format(remainingAmount, amountFixed, ",")}
                filled={filled}
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
