import { useEffect, useState } from "react";

import * as S from "./styles";

import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { OrderHistoryCard, EmptyData, Button } from "@polkadex/orderbook-ui/molecules";
import { OrderCommon } from "@polkadex/orderbook/providers/types";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";

export const OrderHistory = ({ orderHistory }) => {
  const { orders } = orderHistory;
  const { selectGetAsset } = useAssetsProvider();
  const { currentMarket } = useMarketsProvider();
  const priceFixed = currentMarket?.quote_precision;
  const amountFixed = currentMarket?.base_precision;

  const [orderHistoryItems, setOrderHistoryItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const endItem = currentPage * itemsPerPage;
  const startItem = endItem - itemsPerPage;

  useEffect(() => {
    setOrderHistoryItems(orders.slice(startItem, endItem));
  }, [orders, startItem, endItem]);

  return (
    <S.Wrapper>
      {orders?.length ? (
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Id</S.Th>
              <S.Th>Pair</S.Th>
              <S.Th>Date</S.Th>
              <S.Th>Type</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Total</S.Th>
              <S.Th>Filled</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {orderHistoryItems &&
              orderHistoryItems.map((order: OrderCommon, i) => {
                const [base, quote] = order.m.split("-");
                const date = new Date(order.time).toLocaleString();
                const isSell = order.side === "Ask";
                const isMarket = order.order_type === "MARKET";
                const baseUnit = selectGetAsset(base)?.symbol;
                const quoteUnit = selectGetAsset(quote)?.symbol;
                const avgPrice = order.avg_filled_price;
                const shortId =
                  order.id.slice(0, 4) + "..." + order.id.slice(order.id.length - 4);

                return (
                  <OrderHistoryCard
                    key={i}
                    id={shortId}
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
          <S.ButtonWrapper>
            <Button
              size="medium"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              <Icons.ArrowLeft />
              <span>Prev</span>
            </Button>
            <Button
              size="medium"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(orders.length / itemsPerPage))
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
