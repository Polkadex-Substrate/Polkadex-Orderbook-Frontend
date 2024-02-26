import { Drawer, Typography } from "@polkadex/ux";
import { Dispatch, SetStateAction } from "react";
import { Order } from "@orderbook/core/utils/orderbookService/types";
import { CancelOrderArgs } from "@orderbook/core/hooks";

import { CancelOrderAction } from "./cancelOrderAction";

import { FilledCard, ResponsiveCard } from "@/components/ui/ReadyToUse";
import { formatedDate } from "@/helpers";
export const ResponsiveTable = ({
  open,
  onOpenChange,
  data,
  onCancelOrder,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: Order | null;
  onCancelOrder: (value: CancelOrderArgs) => void;
}) => {
  if (!data) return null;
  const {
    type,
    side,
    market,
    price,
    quantity,
    filledQuantity,
    timestamp,
    orderId,
  } = data;
  const date = formatedDate(timestamp);
  const percent = (Number(filledQuantity) / Number(quantity)) * 100;
  const isSell = side === "Ask";
  const roundedPercent = Math.min(100, percent).toFixed(2);
  const width = `${roundedPercent}%`;

  return (
    <Drawer closeOnClickOutside open={open} onOpenChange={onOpenChange}>
      <Drawer.Content className="flex flex-col gap-4 p-4">
        <ResponsiveCard label="Market">{market.name}</ResponsiveCard>
        <ResponsiveCard label="Date">{date}</ResponsiveCard>
        <ResponsiveCard label="Type">
          <Typography.Text size="xs" className="first-letter:uppercase" bold>
            {type.toLowerCase()}
          </Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Side">
          <Typography.Text
            size="xs"
            className="first-letter:uppercase"
            bold
            appearance={isSell ? "danger" : "success"}
          >
            {isSell ? "Sell" : "Buy"}
          </Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Price">{price}</ResponsiveCard>
        <ResponsiveCard label="Amount">{quantity}</ResponsiveCard>
        <ResponsiveCard label="Filled">
          <FilledCard width={width}>{filledQuantity}</FilledCard>
        </ResponsiveCard>
      </Drawer.Content>
      <Drawer.Footer className="p-4">
        <CancelOrderAction
          responsive
          onCancel={() =>
            onCancelOrder({
              orderId: orderId,
              base: market.baseAsset.id,
              quote: market.quoteAsset.id,
            })
          }
        />
      </Drawer.Footer>
    </Drawer>
  );
};
