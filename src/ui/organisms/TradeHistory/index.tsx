import InfiniteScroll from "react-infinite-scroll-component";

import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useTradeHistory } from "@polkadex/orderbook/hooks/useTradeHistory";
import { EmptyData, LoadingSpinner, TradeHistoryCard } from "@polkadex/orderbook-ui/molecules";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useSessionProvider } from "@polkadex/orderbook/providers/user/sessionProvider/useSessionProvider";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export const TradeHistory = ({ filters }) => {
  const { priceFixed, amountFixed, trades, tradeHistoryNextToken, onFetchTrades } =
    useTradeHistory(filters);
  const { selectGetAsset } = useAssetsProvider();
  const { dateFrom, dateTo } = useSessionProvider();
  const { selectedAccount } = useProfile();

  console.log(trades);

  return (
    <S.Wrapper>
      {trades.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Pair</S.Th>
              <S.Th>Date</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Quantity</S.Th>
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
