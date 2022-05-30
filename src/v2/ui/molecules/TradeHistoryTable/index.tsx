import { TableRow, TableCard } from "@orderbook/v2/ui/molecules";
import { localeDate } from "@polkadex/web-helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import * as T from "@orderbook/v2/ui/molecules/OrderHistoryTable/types";

export const TradeHistoryTable = ({ orders, priceFixed, amountFixed, getAsset }: T.Props) => {
  return (
    <>
      <TableRow header={["Pair", "Date", "Price", "Amount"]}>
        {orders.map((order, i) => {
          const date = new Date(Number(order.timestamp)).toLocaleDateString();
          const isSell = order.order_side === "Sell";
          const baseUnit = getAsset(order.base_asset_type).symbol;
          const quoteUnit = getAsset(order.quote_asset_type).symbol;
          console.log("TradeHistoryTable rendered");
          return (
            <TableCard
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
      </TableRow>
    </>
  );
};
