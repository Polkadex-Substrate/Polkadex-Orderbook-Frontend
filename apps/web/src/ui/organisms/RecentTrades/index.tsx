import { useTranslation } from "react-i18next";
import {
  ResultFound,
  Skeleton,
  Spinner,
} from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useRecentTradesProvider } from "@orderbook/core/providers/public/recentTradesProvider";

import * as S from "./styles";

export const filters = ["all", "buy", "sell"];

export const RecentTrades = () => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string, args = {}) =>
    translation(`recentTrades.${key}`, args);

  const {
    list,
    loading,
    isDecreasing,
    quoteUnit,
    baseUnit,
    pricePrecision,
    amountPrecision,
  } = useRecentTradesProvider();

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
              <S.CellHead>{t("price", { price: quoteUnit })}</S.CellHead>
              <S.CellHead>{t("amount", { amount: baseUnit })}</S.CellHead>
              <S.CellHead>{t("time")}</S.CellHead>
            </S.Head>
            <S.Content>
              {list.map((order, i) => {
                const date = new Date(order.timestamp).toLocaleTimeString();
                return (
                  <Card
                    key={i}
                    price={Decimal.format(
                      order.price,
                      pricePrecision || 7,
                      ",",
                    )}
                    amount={Decimal.format(
                      order.amount,
                      amountPrecision || 7,
                      ",",
                    )}
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
