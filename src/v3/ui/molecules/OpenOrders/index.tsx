import OpenOrderCard from "../OpenOrderCard";

import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { EmptyData } from "@polkadex/orderbook/v2/ui/molecules";
import { useOrderHistory } from "@polkadex/orderbook/hooks";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { OrderCommon } from "@polkadex/orderbook/modules/types";

const OpenOrders = ({filters}) => {
  const { priceFixed, amountFixed, openOrders } = useOrderHistory(filters);
  const getAsset = useReduxSelector(selectGetAsset);

  return (
    <S.Wrapper>
      {openOrders?.length ? (
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
            {openOrders &&
              openOrders.map((order: OrderCommon, i) => {
                const [base, quote] = order.m.split("-");
                const date = new Date(order.time).toLocaleString();
                const isSell = order.side === "Ask";
                const isMarket = order.order_type === "MARKET";
                const baseUnit = getAsset(base)?.symbol;
                const quoteUnit = getAsset(quote)?.symbol;
                const avgPrice = order.avg_filled_price;
                return (
                  <OpenOrderCard
                    key={i}
                    isSell={isSell}
                    orderId={order.id}
                    base={base}
                    quote={quote}
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

export default OpenOrders;
