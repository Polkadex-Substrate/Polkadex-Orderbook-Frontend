import TransactionOrder from "../TransactionOrder";

import * as S from "./styles";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { calcAveragePrice } from "@polkadex/orderbook/v2/helpers/calcAverageTradePrice";
import { calcStatusOfOrder } from "@polkadex/orderbook/v2/helpers/calcOrderStatus";

const TradeHistory = ({ orders, priceFixed, amountFixed, getAsset }) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.Thead>
          <S.Tr>
            <S.Th>Pair</S.Th>
            <S.Th>Date</S.Th>
            <S.Th>Price</S.Th>
            <S.Th>Amount</S.Th>
          </S.Tr>
        </S.Thead>
        <S.Tbody>
          {orders &&
            orders.map((order, i) => {
              // console.log("orderhistoryTable rows rendered");
              const date = new Date(parseInt(order.timestamp)).toLocaleString();
              const isSell = order.order_side === "Sell";
              const baseUnit = getAsset(order.base_asset_type).symbol;
              const quoteUnit = getAsset(order.quote_asset_type).symbol;
              return (
                <div key={i} />
                // <TransactionOrder
                //   key={i}
                //   isOpenOrder={order.status === "Accepted" && !isMarket}
                //   isSell={isSell}
                //   orderSide={order.order_side}
                //   baseUnit={baseUnit}
                //   quoteUnit={quoteUnit}
                //   filledQuantity={Number("0")}
                //   data={[
                //     { value: date },
                //     { value: order.order_type },
                //     { value: isMarket ? "CLOSED" : calcStatusOfOrder(status) },
                //     { value: isMarket ? "-" : Decimal.format(order.price, priceFixed, ",") },
                //     { value: Decimal.format(order.qty, amountFixed, ",") },
                //     { value: Decimal.format(order.filled_qty, amountFixed, ",") },
                //     {
                //       value: Decimal.format(avgPrice, priceFixed, ","),
                //     },
                //   ]}
                // />
              );
            })}
        </S.Tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default TradeHistory;
