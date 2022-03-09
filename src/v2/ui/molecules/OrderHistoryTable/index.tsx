import * as T from "./types";

import { TableRow, TableCard } from "@orderbook/v2/ui/molecules";
import { localeDate } from "@polkadex/web-helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

export const OrderHistoryTable = ({ orders, priceFixed, amountFixed }: T.Props) => (
  <TableRow
    isOpenOrder={!!orders?.find((order) => order.status === "Open")}
    header={["Pair", "Date", "Type", "Price", "Amount", "Filled", "Total"]}>
    {orders.map((order, i) => {
      const date = localeDate(new Date(Number(order.timestamp)), "fullDate");
      const isSell = order.order_side === "Sell";
      const baseUnit = getSymbolFromAssetId(order.base_asset);
      const quoteUnit = getSymbolFromAssetId(order.quote_asset);
      return (
        <TableCard
          key={i}
          isOpenOrder={order.status === "Open"}
          isSell={isSell}
          orderSide={order.order_side}
          baseUnit={baseUnit}
          quoteUnit={quoteUnit}
          filledQuantity={Number(order.filled_qty)}
          data={[
            { value: date },
            { value: order.order_type },
            { value: Decimal.format(order.price, priceFixed, ",") },
            { value: Decimal.format(order.amount, amountFixed, ",") },
            { value: Decimal.format(order.filled_qty, amountFixed, ",") },
            {
              value: amountFixed.toFixed(5),
            },
          ]}
        />
      );
    })}
  </TableRow>
);
