import TradeHistoryCard from "../TradeHistoryCard";

import * as S from "./styles";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { useOrderHistory } from "@polkadex/orderbook/v2/hooks";
import { EmptyData } from "@polkadex/orderbook/v2/ui/molecules";

const TradeHistory = () => {
  const { priceFixed, amountFixed, trades } = useOrderHistory();
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
            {trades &&
              trades.map((order, i) => {
                // console.log("orderhistoryTable rows rendered");
                const date = new Date(parseInt(order.timestamp)).toLocaleString();
                const isSell = order.order_side === "Sell";
                const baseUnit = getAsset(order.base_asset_type).symbol;
                const quoteUnit = getAsset(order.quote_asset_type).symbol;
                return (
                  <TradeHistoryCard
                    key={i}
                    isSell={isSell}
                    orderSide={order.order_side}
                    baseUnit={baseUnit}
                    quoteUnit={quoteUnit}
                    data={[
                      { value: date },
                      { value: Decimal.format(order.price, priceFixed, ",") },
                      { value: Decimal.format(order.qty, amountFixed, ",") },
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
