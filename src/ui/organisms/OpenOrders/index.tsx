import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  notificationPush,
  openOrdersCancelFetch,
  selectCurrentMarket,
  selectOpenOrdersHistory,
  selectOrdersHistoryLoading,
  selectUserLoggedIn,
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
  const { width } = useWindowSize();

  const handleCancel = (id: string) =>
    dispatch(
      notificationPush({
        type: "Error",
        message: {
          title: "Not Available in Beta",
          description: "Polkadex team is currently working on this functionality.",
        },
      })
    );

  // const handleCancel = (id: string) => dispatch(openOrdersCancelFetch({ id }));

  useEffect(() => {
    if (userLoggedIn) dispatch(userOrdersHistoryFetch());
  }, [userLoggedIn, dispatch]);

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
          {openOrders?.map((item) => {
            const {
              order_id,
              timestamp,
              base_asset,
              quote_asset,
              order_side,
              price,
              amount,
              filled_qty,
              order_type,
            } = item;

            const CardComponent = width > 1110 ? OpenOrderCard : OpenOrderCardReponsive;
            return (
              <CardComponent
                key={order_id}
                order_id={order_id}
                timestamp={timestamp}
                base_asset={base_asset}
                quote_asset={quote_asset}
                order_side={order_side}
                price={price}
                filled_qty={filled_qty}
                amount={amount}
                order_type={order_type}
                onCancel={() => handleCancel(order_id)}
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
