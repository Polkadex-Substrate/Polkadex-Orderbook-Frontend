import OrderHistoryCard from "../OrderHistoryCard";

import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { calcAveragePrice } from "@polkadex/orderbook/v2/helpers/calcAverageTradePrice";
import { calcStatusOfOrder } from "@polkadex/orderbook/v2/helpers/calcOrderStatus";
import { EmptyData } from "@polkadex/orderbook/v2/ui/molecules";
import { useOrderHistory } from "@polkadex/orderbook/v2/hooks";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

const OrderHistory = () => {
  const { priceFixed, amountFixed, orders } = useOrderHistory();
  const getAsset = useReduxSelector(selectGetAsset);

  return (
    <S.Wrapper>
      {orders?.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Pair</S.Th>
              <S.Th>Date</S.Th>
              <S.Th>Type</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Total</S.Th>
              <S.Th>Filled</S.Th>
              <S.Th>Actions</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {orders.map((order, i) => {
              // console.log("orderhistoryTable rows rendered");
              const date = new Date(Number(order.timestamp)).toLocaleString();
              const isSell = order.order_side === "Ask";
              const isMarket = order.order_type === "MARKET";
              const baseUnit = getAsset(order.base_asset_type).symbol;
              const quoteUnit = getAsset(order.quote_asset_type).symbol;
              const avgPrice = calcAveragePrice(order.filled_qty, order.filled_price);
              const status = order.status.toUpperCase();
              return (
                <OrderHistoryCard
                  key={i}
                  isSell={isSell}
                  orderSide={order.order_side}
                  baseUnit={baseUnit}
                  quoteUnit={quoteUnit}
                  data={[
                    { value: date },
                    { value: order.order_type },
                    { value: isMarket ? "CLOSED" : calcStatusOfOrder(status) },
                    { value: isMarket ? "-" : Decimal.format(order.price, priceFixed, ",") },
                    { value: Decimal.format(order.qty, amountFixed, ",") },
                    { value: Decimal.format(order.filled_qty, amountFixed, ",") },
                    {
                      value: Decimal.format(avgPrice, priceFixed, ","),
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

export default OrderHistory;
