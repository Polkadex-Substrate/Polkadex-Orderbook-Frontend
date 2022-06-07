import React from "react";

import * as T from "./types";

import { TableRow, TableCard } from "@orderbook/v2/ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { calcAveragePrice } from "@polkadex/orderbook/v2/helpers/calcAverageTradePrice";
import { calcStatusOfOrder } from "@polkadex/orderbook/v2/helpers/calcOrderStatus";

export const OrderHistoryTable = ({ orders, priceFixed, amountFixed, getAsset }: T.Props) => {
  console.log("orders in component", orders);
  return (
    <TableRow
      isOpenOrder={
        !!orders?.find((order) => order.status === "Accepted" && order.order_type === "LIMIT")
      }
      header={[
        "Pair",
        "Date",
        "Type",
        "Status",
        "Price",
        "Amount",
        "Filled",
        "Average Price",
      ]}>
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
          <TableCard
            key={i}
            isOpenOrder={order.status === "Accepted" && !isMarket}
            isSell={isSell}
            orderSide={order.order_side}
            baseUnit={baseUnit}
            quoteUnit={quoteUnit}
            filledQuantity={Number("0")}
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
    </TableRow>
  );
};
