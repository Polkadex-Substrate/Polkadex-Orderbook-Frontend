import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "next-i18next";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import {
  OrderHistoryCard,
  EmptyData,
  LoadingSpinner,
  Button,
} from "@polkadex/orderbook-ui/molecules";
import { Ifilters, OrderCommon } from "@orderbook/core/providers/types";
import { decimalPlaces } from "@orderbook/core/helpers";
import { MIN_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import {
  useAssetsMetaData,
  useMarketsData,
  useOrderHistory,
} from "@orderbook/core/index";

import { TransactionsSkeleton } from "../Transactions";

import * as S from "./styles";

type Props = {
  filters: Ifilters;
  market: string;
};

export const OrderHistory = ({ filters, market }: Props) => {
  const { hasNextPage, isLoading, onFetchNextPage, orderHistory, error } =
    useOrderHistory(filters);

  const { selectGetAsset } = useAssetsMetaData();
  const { currentMarket } = useMarketsData(market);

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
                  <LoadingSpinner size="2rem" />
                </S.Loader>
              }
            >
              {orderHistory &&
                orderHistory.map((order: OrderCommon, i) => {
                  const [base, quote] = order.m.split("-");
                  const date = new Date(order.time).toLocaleString();
                  const isSell = order.side === "Ask";
                  const isMarket = order.order_type === "MARKET";
                  const baseUnit = selectGetAsset(base)?.ticker;
                  const quoteUnit = selectGetAsset(quote)?.ticker;
                  const avgPrice = order.avg_filled_price;
                  const shortId =
                    order.id.slice(0, 4) +
                    "..." +
                    order.id.slice(order.id.length - 4);
                  const status = order.status;
                  const show = status !== "OPEN";
                  return (
                    show && (
                      <OrderHistoryCard
                        key={i}
                        id={shortId}
                        isSell={isSell}
                        status={status}
                        orderType={order.order_type}
                        baseUnit={baseUnit}
                        quoteUnit={quoteUnit}
                        data={[
                          { value: date },
                          { value: order.order_type },
                          { value: order.status },
                          {
                            value: isMarket
                              ? "-"
                              : Decimal.format(order.price, priceFixed, ","),
                          },
                          {
                            value: Decimal.format(order.qty, amountFixed, ","),
                          },
                          {
                            value: Decimal.format(
                              order.filled_quantity,
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
                        ]}
                      />
                    )
                  );
                })}
              {!isLoading && error && (
                <S.ErrorWrapper>
                  <p>{error}</p>
                  <Button onClick={onFetchNextPage}>{t("tryAgain")}</Button>
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
