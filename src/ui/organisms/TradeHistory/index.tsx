import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useTradeHistory } from "@polkadex/orderbook/hooks/useTradeHistory";
import { EmptyData, TradeHistoryCard } from "@polkadex/orderbook-ui/molecules";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";

export const TradeHistory = ({ filters }) => {
  const { priceFixed, amountFixed, trades } = useTradeHistory(filters);
  const { selectGetAsset } = useAssetsProvider();

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
            {trades.map((trade, i) => {
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
