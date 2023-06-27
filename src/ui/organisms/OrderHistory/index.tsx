import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";

import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import {
  OrderHistoryCard,
  EmptyData,
  LoadingSpinner,
  Button,
} from "@polkadex/orderbook-ui/molecules";
import { OrderCommon } from "@polkadex/orderbook/providers/types";
import { OrderHistoryContextProps } from "@polkadex/orderbook/providers/user/orderHistoryProvider/types";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
import { useSessionProvider } from "@polkadex/orderbook/providers/user/sessionProvider/useSessionProvider";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

type Props = {
  orderHistory: OrderHistoryContextProps;
};

export const OrderHistory = ({ orderHistory }: Props) => {
  const { orders, onOrdersHistoryFetch, orderHistoryNextToken, loading, error } = orderHistory;
  const { selectGetAsset } = useAssetsProvider();
  const { currentMarket } = useMarketsProvider();
  const priceFixed = currentMarket?.quote_precision;
  const amountFixed = currentMarket?.base_precision;

  const { dateTo, dateFrom } = useSessionProvider();
  const { selectedAccount } = useProfile();

  useEffect(() => {
    if (orders.length) return;
    if (selectedAccount.tradeAddress) {
      onOrdersHistoryFetch({
        dateFrom,
        dateTo,
        tradeAddress: selectedAccount.tradeAddress,
        orderHistoryNextToken: null,
      });
    }
  }, [selectedAccount.tradeAddress, dateFrom, dateTo, onOrdersHistoryFetch, orders.length]);

  return (
    <S.Wrapper>
      {orders?.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Id</S.Th>
              <S.Th>Pair</S.Th>
              <S.Th>Date</S.Th>
              <S.Th>Type</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Total</S.Th>
              <S.Th>Filled</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            <InfiniteScroll
              dataLength={orders.length}
              next={() => {
                onOrdersHistoryFetch({
                  dateFrom,
                  dateTo,
                  orderHistoryNextToken,
                  tradeAddress: selectedAccount.tradeAddress,
                });
              }}
              hasMore={orderHistoryNextToken !== null}
              height={300}
              loader={
                <S.Loader>
                  <LoadingSpinner size="2rem" />
                </S.Loader>
              }>
              {orders &&
                orders.map((order: OrderCommon, i) => {
                  const [base, quote] = order.m.split("-");
                  const date = new Date(order.time).toLocaleString();
                  const isSell = order.side === "Ask";
                  const isMarket = order.order_type === "MARKET";
                  const baseUnit = selectGetAsset(base)?.symbol;
                  const quoteUnit = selectGetAsset(quote)?.symbol;
                  const avgPrice = order.avg_filled_price;
                  const shortId =
                    order.id.slice(0, 4) + "..." + order.id.slice(order.id.length - 4);

                  return (
                    <OrderHistoryCard
                      key={i}
                      id={shortId}
                      isSell={isSell}
                      orderSide={order.side}
                      orderType={order.order_type}
                      baseUnit={baseUnit}
                      quoteUnit={quoteUnit}
                      data={[
                        { value: date },
                        { value: order.order_type },
                        { value: order.status },
                        {
                          value: isMarket ? "-" : Decimal.format(order.price, priceFixed, ","),
                        },
                        { value: Decimal.format(order.qty, amountFixed, ",") },
                        { value: Decimal.format(order.filled_quantity, amountFixed, ",") },
                        {
                          value: Decimal.format(avgPrice, priceFixed, ","),
                        },
                      ]}
                    />
                  );
                })}
              {!loading && error && (
                <S.ErrorWrapper>
                  <p>{error.message}</p>
                  <Button
                    onClick={() => {
                      onOrdersHistoryFetch({
                        dateFrom,
                        dateTo,
                        orderHistoryNextToken,
                        tradeAddress: selectedAccount.tradeAddress,
                      });
                    }}>
                    Try Again
                  </Button>
                </S.ErrorWrapper>
              )}
            </InfiniteScroll>
          </S.Tbody>
        </S.Table>
      ) : (
        <S.EmptyWrapper>
          <EmptyData />
        </S.EmptyWrapper>
      )}
    </S.Wrapper>
  );
};
