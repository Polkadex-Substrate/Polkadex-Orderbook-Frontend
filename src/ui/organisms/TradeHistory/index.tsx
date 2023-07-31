import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useTradeHistory } from "@polkadex/orderbook/hooks/useTradeHistory";
import {
  Button,
  EmptyData,
  LoadingSpinner,
  TradeHistoryCard,
} from "@polkadex/orderbook-ui/molecules";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useSessionProvider } from "@polkadex/orderbook/providers/user/sessionProvider/useSessionProvider";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export type Ifilters = {
  hiddenPairs: boolean;
  onlyBuy: boolean;
  onlySell: boolean;
  status: string;
};

type Props = {
  filters: Ifilters;
  onHideTransactionDropdown: (v: boolean) => void;
};

export const TradeHistory = ({ filters, onHideTransactionDropdown }: Props) => {
  const {
    priceFixed,
    amountFixed,
    trades,
    tradeHistoryNextToken,
    onFetchTrades,
    error,
    isLoading,
  } = useTradeHistory(filters);
  const { selectGetAsset } = useAssetsProvider();
  const { dateFrom, dateTo } = useSessionProvider();
  const { selectedAccount } = useProfile();

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`tradeHistory.${key}`);

  useEffect(() => {
    onHideTransactionDropdown(false);
    return () => onHideTransactionDropdown(true);
  }, [onHideTransactionDropdown]);

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
                onFetchTrades({
                  dateFrom,
                  dateTo,
                  tradeAddress: selectedAccount.tradeAddress,
                  tradeHistoryFetchToken: tradeHistoryNextToken,
                });
              }}
              hasMore={tradeHistoryNextToken !== null}
              height={300}
              loader={
                <S.Loader>
                  <LoadingSpinner size="2rem" />
                </S.Loader>
              }>
              {trades?.map((trade, i) => {
                const date = new Date(trade.timestamp).toLocaleString();
                const baseUnit = selectGetAsset(trade.baseAsset).symbol;
                const quoteUnit = selectGetAsset(trade.quoteAsset).symbol;
                return (
                  <TradeHistoryCard
                    key={i}
                    isSell={trade.side === "Ask"}
                    baseUnit={baseUnit}
                    quoteUnit={quoteUnit}
                    data={[
                      { value: date },
                      { value: Decimal.format(trade.price, priceFixed, ",") },
                      { value: Decimal.format(trade.qty, amountFixed, ",") },
                    ]}
                  />
                );
              })}
              {!isLoading && error && (
                <S.ErrorWrapper>
                  <p>{error.message}</p>
                  <Button
                    onClick={() => {
                      onFetchTrades({
                        dateFrom,
                        dateTo,
                        tradeAddress: selectedAccount.tradeAddress,
                        tradeHistoryFetchToken: tradeHistoryNextToken,
                      });
                    }}>
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
