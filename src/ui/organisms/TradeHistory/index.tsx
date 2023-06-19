import { useEffect, useState } from "react";

import * as S from "./styles";

import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { useTradeHistory } from "@polkadex/orderbook/hooks/useTradeHistory";
import { Button, EmptyData, TradeHistoryCard } from "@polkadex/orderbook-ui/molecules";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";

export const TradeHistory = ({ filters }) => {
  const { priceFixed, amountFixed, trades } = useTradeHistory(filters);
  const { selectGetAsset } = useAssetsProvider();

  const [tradeHistoryItems, setTradeHistoryItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const endItem = currentPage * itemsPerPage;
  const startItem = endItem - itemsPerPage;

  useEffect(() => {
    setTradeHistoryItems(trades.slice(startItem, endItem));
  }, [trades, startItem, endItem]);

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
            {tradeHistoryItems?.map((trade, i) => {
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
          <S.ButtonWrapper>
            <Button
              disabled={startItem <= 0}
              size="medium"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              <Icons.ArrowLeft />
              <span>Prev</span>
            </Button>
            <Button
              disabled={endItem >= trades.length}
              size="medium"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(trades.length / itemsPerPage))
                )
              }>
              <span>Next</span>
              <Icons.ArrowRight />
            </Button>
          </S.ButtonWrapper>
        </S.Table>
      ) : (
        <S.EmptyWrapper>
          <EmptyData />
        </S.EmptyWrapper>
      )}
    </S.Wrapper>
  );
};
