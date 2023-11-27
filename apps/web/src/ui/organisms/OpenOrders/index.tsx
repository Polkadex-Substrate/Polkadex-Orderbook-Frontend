import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { Ifilters, OrderCommon } from "@orderbook/core/providers/types";
import { EmptyData, OpenOrderCard } from "@polkadex/orderbook-ui/molecules";
import { decimalPlaces, getCurrentMarket } from "@orderbook/core/helpers";
import { MIN_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import {
  useAssetsMetaData,
  useMarketsData,
  useOpenOrders,
} from "@orderbook/core/hooks";

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
  const { isLoading, openOrders } = useOpenOrders(filters);
  const { list } = useMarketsData();
  const currentMarket = getCurrentMarket(list, market);
  const { selectGetAsset } = useAssetsMetaData();

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
              openOrders.map((order: OrderCommon, i) => {
                const [base, quote] = order.m.split("-");
                const date = new Date(order.time).toLocaleString();
                const isSell = order.side === "Ask";
                const isMarket = order.order_type === "MARKET";
                const baseUnit = selectGetAsset(base)?.ticker;
                const quoteUnit = selectGetAsset(quote)?.ticker;
                const avgPrice = order.avg_filled_price;
                return (
                  <OpenOrderCard
                    key={i}
                    isSell={isSell}
                    orderId={order.id}
                    base={base}
                    quote={quote}
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
