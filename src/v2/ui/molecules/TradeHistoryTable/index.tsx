import { TableRow, TableCard } from "@orderbook/v2/ui/molecules";
import { localeDate } from "@polkadex/web-helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";
import * as T from "@orderbook/v2/ui/molecules/OrderHistoryTable/types";

export const TradeHistoryTable = ({ orders, priceFixed, amountFixed }: T.Props) => {
  return (
    <>
      <TableRow header={["Pair", "Date", "Price", "Amount"]}>
        {orders.map((order, i) => {
          const date = localeDate(new Date(Number(order.timestamp)), "fullDate");
          const isSell = order.order_side === "Sell";
          const baseUnit = getSymbolFromAssetId(order.base_asset);
          const quoteUnit = getSymbolFromAssetId(order.quote_asset);

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
                { value: Decimal.format(order.amount, amountFixed, ",") },
              ]}
            />
          );
        })}
      </TableRow>
    </>
  );
};
