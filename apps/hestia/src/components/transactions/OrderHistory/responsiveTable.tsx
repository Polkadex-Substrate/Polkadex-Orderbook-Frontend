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
  const isMarket = type === "MARKET";
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
              <Typography.Text size="xs">
                {truncateString(orderId, 6)}
              </Typography.Text>
            </div>
          </Copy>
        </ResponsiveCard>
        <ResponsiveCard label="Date">
          <Typography.Text size="xs">
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
          </Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Pair">
          <Typography.Text bold size="xs">
            {market.name}
          </Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Type">
          <Typography.Text
            size="xs"
            bold
            appearance={isSell ? "danger" : "success"}
            className="uppercase"
          >
            {title}
          </Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Price">
          <Typography.Text size="xs">
            {isMarket ? "---" : price}
          </Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Amount">
          <Typography.Text size="xs">{quantity}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Filled">
          <Typography.Text size="xs">{filledQuantity}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Status">
          <Typography.Text size="xs">{status}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Fee">
          <Typography.Text size="xs">
            {fee} {ticker}
          </Typography.Text>
        </ResponsiveCard>
      </Drawer.Content>
    </Drawer>
  );
};
