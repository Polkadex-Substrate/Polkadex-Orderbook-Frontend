import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useTradeHistory } from "@orderbook/core/hooks";
import {
  Button,
  EmptyData,
  LoadingSpinner,
  TradeHistoryCard,
} from "@polkadex/orderbook-ui/molecules";
import { Ifilters } from "@orderbook/core/providers/types";
import { DEFAULT_BATCH_LIMIT } from "@orderbook/core/constants";

import { TransactionsSkeleton } from "../Transactions";

import * as S from "./styles";

import { normalizeValue } from "@/utils/normalize";

type Props = {
  filters: Ifilters;
  onHideTransactionDropdown: (v: boolean) => void;
};

export const TradeHistory = ({ filters, onHideTransactionDropdown }: Props) => {
  const { trades, hasNextPage, error, isLoading, onFetchNextPage } =
    useTradeHistory(DEFAULT_BATCH_LIMIT, filters);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`tradeHistory.${key}`);

  useEffect(() => {
    onHideTransactionDropdown(false);
    return () => onHideTransactionDropdown(true);
  }, [onHideTransactionDropdown]);

  if (isLoading) return <TransactionsSkeleton />;

  return (
    <S.Wrapper>
      {trades.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>{t("pair")}</S.Th>
              <S.Th>{t("date")}</S.Th>
              <S.Th>{t("price")}</S.Th>
              <S.Th>{t("quantity")}</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            <InfiniteScroll
              dataLength={trades.length}
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
              {trades?.map((trade, i) => {
                const date = new Date(trade.timestamp).toLocaleString();
                const baseUnit = trade.market?.baseAsset?.ticker;
                const quoteUnit = trade.market?.quoteAsset?.ticker;
                return (
                  <TradeHistoryCard
                    key={i}
                    baseUnit={baseUnit}
                    quoteUnit={quoteUnit}
                    data={[
                      { value: date },
                      {
                        value: String(trade.price),
                      },
                      {
                        value: String(trade.qty),
                      },
                    ]}
                  />
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
