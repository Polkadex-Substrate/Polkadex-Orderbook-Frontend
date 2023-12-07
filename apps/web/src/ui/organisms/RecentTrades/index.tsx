import { useTranslation } from "next-i18next";
import {
  ResultFound,
  Skeleton,
  Spinner,
} from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { MIN_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import { decimalPlaces, getCurrentMarket } from "@orderbook/core/helpers";
import { useMarkets, useRecentTrades } from "@orderbook/core/hooks";

import * as S from "./styles";

export const filters = ["all", "buy", "sell"];

type Props = {
  market: string;
};

export const RecentTrades = ({ market }: Props) => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string, args = {}) =>
    translation(`recentTrades.${key}`, args);

  const { list: allMarkets } = useMarkets();
  const currentMarket = getCurrentMarket(allMarkets, market);
  const { isDecreasing, list, loading } = useRecentTrades(
    currentMarket?.id as string
  );

  const pricePrecision = currentMarket
    ? decimalPlaces(currentMarket.price_tick_size)
    : undefined;
  const amountPrecision = currentMarket
    ? decimalPlaces(currentMarket.qty_step_size)
    : undefined;

  const priceDecimals = pricePrecision || MIN_DIGITS_AFTER_DECIMAL;
  const qtyDecimals = amountPrecision || MIN_DIGITS_AFTER_DECIMAL;

  return (
    <S.MainContainer>
      <S.Main>
        <S.Header>
          <h2>{t("title")}</h2>
        </S.Header>
        {loading ? (
          <S.SpinnerWrapper>
            <Spinner />
          </S.SpinnerWrapper>
        ) : list.length ? (
          <>
            <S.Head>
              <S.CellHead>
                {t("price", { price: currentMarket?.quoteAsset.ticker })}
              </S.CellHead>
              <S.CellHead>
                {t("amount", { amount: currentMarket?.baseAsset.ticker })}
              </S.CellHead>
              <S.CellHead>{t("time")}</S.CellHead>
            </S.Head>
            <S.Content>
              {list.map((order, i) => {
                const date = new Date(order.timestamp).toLocaleTimeString();
                return (
                  <Card
                    key={i}
                    price={Decimal.format(order.price, priceDecimals, ",")}
                    amount={Decimal.format(order.qty, qtyDecimals, ",")}
                    date={date}
                    isSell={isDecreasing[i]}
                  />
                );
              })}
            </S.Content>
          </>
        ) : (
          <ResultFound>{t("noRecentTrades")}</ResultFound>
        )}
      </S.Main>
    </S.MainContainer>
  );
};

const Card = ({ price, amount, date, isSell = false }) => (
  <S.Card isSell={isSell}>
    <S.CardCell>{price}</S.CardCell>
    <S.CardCell>{amount}</S.CardCell>
    <S.CardCell>{date}</S.CardCell>
  </S.Card>
);

export const RecentTradesSkeleton = () => (
  <Skeleton height="100%" width="100%" style={{ maxWidth: "350px" }} />
);
