import { Copy, Drawer, Typography, truncateString } from "@polkadex/ux";
import { Dispatch, SetStateAction } from "react";
import { intlFormat } from "date-fns";
import { Order } from "@orderbook/core/utils/orderbookService/types";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import { ResponsiveCard } from "@/components/ui/ReadyToUse";

export const ResponsiveTable = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: Order | null;
}) => {
  if (!data) return null;
  const {
    price,
    timestamp,
    orderId,
    market,
    side,
    type,
    quantity,
    filledQuantity,
    status,
    fee,
  } = data;
  const isSell = side === "Ask";
  const title = `${type}/${isSell ? "Sell" : "Buy"}`;
  const ticker =
    side === "Bid" ? market.baseAsset.ticker : market.quoteAsset.ticker;
  return (
    <Drawer closeOnClickOutside open={open} onOpenChange={onOpenChange}>
      <Drawer.Title className="px-4">
        <Typography.Heading size="base">
          Order ID # {truncateString(orderId, 6)}
        </Typography.Heading>
      </Drawer.Title>
      <Drawer.Content className="flex flex-col gap-4 p-4">
        <ResponsiveCard label="Order ID">
          <Copy value={orderId}>
            <div className="flex items-center gap-1">
              <DocumentDuplicateIcon className="w-4 h-4 text-actionInput" />
              <Typography.Text size="sm">
                {truncateString(orderId, 6)}
              </Typography.Text>
            </div>
          </Copy>
        </ResponsiveCard>
        <ResponsiveCard label="Date">
          {intlFormat(
            new Date(timestamp),
            {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
            { locale: "EN" }
          ).replace(",", "")}
        </ResponsiveCard>
        <ResponsiveCard label="Pair">{market.name}</ResponsiveCard>
        <ResponsiveCard label="Type">
          <Typography.Text
            size="sm"
            bold
            appearance={isSell ? "danger" : "success"}
            className="uppercase"
          >
            {title}
          </Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Price">
          <Typography.Text size="sm">{price}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Amount">
          <Typography.Text size="sm">{quantity}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Filled">
          <Typography.Text size="sm">{filledQuantity}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Status">
          <Typography.Text size="sm">{status}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Fee">
          <Typography.Text size="sm">
            {fee} {ticker}
          </Typography.Text>
        </ResponsiveCard>
      </Drawer.Content>
    </Drawer>
  );
};
