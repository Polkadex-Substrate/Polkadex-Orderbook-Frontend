import * as T from "./types";

import { TableRow, TableCard } from "@orderbook/v2/ui/molecules";
import { localeDate } from "@polkadex/web-helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

export const OrderHistoryTable = ({ orders, priceFixed, amountFixed, getAsset }: T.Props) => (
  <TableRow
    isOpenOrder={!!orders?.find((order) => order.status === "Open")}
    header={["Pair", "Date", "Type", "Price", "Amount", "Filled", "Total"]}>
    {orders.map((order, i) => {
      const date = new Date(order.timestamp).toLocaleString();
      const isSell = order.order_side === "Ask";
      const baseUnit = getAsset(order.base_asset_type).symbol;
      const quoteUnit = getAsset(order.quote_asset_type).symbol;
      return (
        <TableCard
          key={i}
          isOpenOrder={order.status === "Open"}
          isSell={isSell}
          orderSide={order.order_side}
          baseUnit={baseUnit}
          quoteUnit={quoteUnit}
          filledQuantity={Number("0")}
          data={[
            { value: date },
            { value: order.order_type },
            { value: Decimal.format(order.price, priceFixed, ",") },
            { value: Decimal.format(order.qty, amountFixed, ",") },
            { value: Decimal.format("0", amountFixed, ",") },
            {
              value: amountFixed.toFixed(5),
            },
          ]}
        />
      );
    })}
  </TableRow>
);
