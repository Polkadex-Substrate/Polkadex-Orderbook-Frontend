import OrderHistoryCard from "../OrderHistoryCard";

import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { OrderCommon } from "@polkadex/orderbook/modules/types";
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
            {orders &&
              orders.map((order: OrderCommon, i) => {
                // console.log("orderhistoryTable rows rendered");
                const [base, quote] = order.m.split("-");
                const date = new Date(order.time).toLocaleString();
                const isSell = order.side === "Ask";
                const isMarket = order.order_type === "MARKET";
                const baseUnit = getAsset(base).symbol;
                const quoteUnit = getAsset(quote).symbol;
                const avgPrice = order.avg_filled_price;
                return (
                  <OrderHistoryCard
                    key={i}
                    isSell={isSell}
                    orderSide={order.side}
                    orderType={order.order_type}
                    baseUnit={baseUnit}
                    quoteUnit={quoteUnit}
                    data={[
                      { value: date },
                      { value: order.order_type },
                      { value: order.status },
                      { value: isMarket ? "-" : Decimal.format(order.price, priceFixed, ",") },
                      { value: Decimal.format(order.qty, amountFixed, ",") },
                      { value: Decimal.format(order.filled_quantity, amountFixed, ",") },
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
