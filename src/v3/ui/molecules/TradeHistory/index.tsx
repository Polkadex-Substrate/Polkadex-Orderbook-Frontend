import TradeHistoryCard from "../TradeHistoryCard";

import * as S from "./styles";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { EmptyData } from "@polkadex/orderbook/v2/ui/molecules";
import { useTradeHistory } from "@polkadex/orderbook/v2/hooks/useTradeHistory";

const TradeHistory = () => {
  const { priceFixed, amountFixed, trades } = useTradeHistory();
  const getAsset = useReduxSelector(selectGetAsset);

  return (
    <S.Wrapper>
      {trades.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Pair</S.Th>
              <S.Th>Date</S.Th>
              <S.Th>Type</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Quantity</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {trades.map((trade, i) => {
              const date = new Date(trade.timestamp).toLocaleString();
              const baseUnit = getAsset(trade.baseAsset).symbol;
              const quoteUnit = getAsset(trade.quoteAsset).symbol;
              return (
                <TradeHistoryCard
                  key={i}
                  isSell={trade.side === "Ask"}
                  orderSide={trade.side}
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

export default TradeHistory;
