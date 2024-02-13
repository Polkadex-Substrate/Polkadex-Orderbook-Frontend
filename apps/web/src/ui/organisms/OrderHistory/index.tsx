import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "next-i18next";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import {
  OrderHistoryCard,
  EmptyData,
  LoadingSpinner,
  Button,
} from "@polkadex/orderbook-ui/molecules";
import { Ifilters } from "@orderbook/core/providers/types";
import { decimalPlaces, getCurrentMarket } from "@orderbook/core/helpers";
import { MIN_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import { Order } from "@orderbook/core/utils/orderbookService";
import { useMarkets, useOrderHistory } from "@orderbook/core/hooks";

import { TransactionsSkeleton } from "../Transactions";

import * as S from "./styles";

import { normalizeValue } from "@/utils/normalize";

type Props = {
  filters: Ifilters;
  market: string;
};

export const OrderHistory = ({ filters, market }: Props) => {
  const { hasNextPage, isLoading, onFetchNextPage, orderHistory, error } =
    useOrderHistory(market, filters);

  const { list } = useMarkets();
  const currentMarket = getCurrentMarket(list, market);

  const priceFixed = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const amountFixed = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const filledQtyPrecision = Math.max(priceFixed, amountFixed);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`orderHistory.${key}`);

  if (isLoading) return <TransactionsSkeleton />;

  return (
    <S.Wrapper>
      {orderHistory?.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Id</S.Th>
              <S.Th>Pair</S.Th>
              <S.Th>Date</S.Th>
              <S.Th>Type</S.Th>
              <S.Th>Status</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Amount</S.Th>
              <S.Th>Filled</S.Th>
              <S.Th>Fee</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            <InfiniteScroll
              dataLength={orderHistory.length}
              next={() => {
                onFetchNextPage();
              }}
              hasMore={Boolean(hasNextPage)}
              height={300}
              loader={
                <S.Loader>
                  <LoadingSpinner size={normalizeValue(2)} />
                </S.Loader>
              }
            >
              {orderHistory &&
                orderHistory.map((order: Order, i) => {
                  const date = new Date(order.timestamp).toLocaleString();
                  const isSell = order.side === "Ask";
                  const isMarket = order.type === "MARKET";
                  const baseUnit = order.market?.baseAsset?.ticker;
                  const quoteUnit = order.market?.quoteAsset?.ticker;
                  const avgPrice = order.averagePrice;
                  const shortId =
                    order.orderId.slice(0, 4) +
                    "..." +
                    order.orderId.slice(order.orderId.length - 4);
                  const status = order.status;
                  const show = status !== "OPEN";
                  return (
                    show && (
                      <OrderHistoryCard
                        key={i}
                        id={shortId}
                        isSell={isSell}
                        status={status}
                        orderType={order.type}
                        baseUnit={baseUnit}
                        quoteUnit={quoteUnit}
                        data={[
                          { value: date },
                          { value: order.type },
                          { value: order.status },
                          {
                            value: isMarket
                              ? "-"
                              : Decimal.format(order.price, priceFixed, ","),
                          },
                          {
                            value: Decimal.format(
                              order.quantity,
                              amountFixed,
                              ","
                            ),
                          },
                          {
                            value: Decimal.format(
                              order.filledQuantity,
                              filledQtyPrecision,
                              ","
                            ),
                          },
                          {
                            value: Decimal.format(
                              avgPrice,
                              Number(priceFixed),
                              ","
                            ),
                          },
                          {
                            value: String(order.fee),
                          },
                        ]}
                      />
                    )
                  );
                })}
              {!isLoading && error && (
                <S.ErrorWrapper>
                  <p>{error}</p>
                  <Button onClick={() => onFetchNextPage()}>
                    {t("tryAgain")}
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
