import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { Ifilters } from "@orderbook/core/providers/types";
import { EmptyData, OpenOrderCard } from "@polkadex/orderbook-ui/molecules";
import { decimalPlaces, getCurrentMarket } from "@orderbook/core/helpers";
import { MIN_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import { Order } from "@orderbook/core/utils/orderbookService";
import { useMarkets, useOpenOrders } from "@orderbook/core/hooks";

import { TransactionsSkeleton } from "../Transactions";

import * as S from "./styles";

type Props = {
  filters: Ifilters;
  onHideTransactionDropdown: (v: boolean) => void;
  market: string;
};

export const OpenOrders = ({
  filters,
  onHideTransactionDropdown,
  market,
}: Props) => {
  const { isLoading, openOrders } = useOpenOrders(market, filters);
  const { list } = useMarkets();
  const currentMarket = getCurrentMarket(list, market);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`openOrders.${key}`);

  const priceFixed = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const amountFixed = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : MIN_DIGITS_AFTER_DECIMAL;

  const filledQtyPrecision = Math.max(priceFixed, amountFixed);

  useEffect(() => {
    onHideTransactionDropdown(false);
    return () => onHideTransactionDropdown(true);
  }, [onHideTransactionDropdown]);

  if (isLoading) return <TransactionsSkeleton />;

  return (
    <S.Wrapper>
      {openOrders?.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>{t("pair")}</S.Th>
              <S.Th>{t("date")}</S.Th>
              <S.Th>{t("type")}</S.Th>
              <S.Th>{t("price")}</S.Th>
              <S.Th>{t("total")}</S.Th>
              <S.Th>{t("filled")}</S.Th>
              <S.Th />
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {openOrders &&
              openOrders.map((order: Order, i) => {
                const [base, quote] = order.market.id.split("-");
                const date = new Date(order.timestamp).toLocaleString();
                const isSell = order.side === "Ask";
                const isMarket = order.type === "MARKET";
                const baseUnit = order.market?.baseAsset?.ticker;
                const quoteUnit = order.market?.quoteAsset?.ticker;
                const avgPrice = order.averagePrice;
                return (
                  <OpenOrderCard
                    key={i}
                    isSell={isSell}
                    orderId={order.orderId}
                    base={base}
                    quote={quote}
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
                        value: Decimal.format(order.quantity, amountFixed, ","),
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
                    ]}
                  />
                );
              })}
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
