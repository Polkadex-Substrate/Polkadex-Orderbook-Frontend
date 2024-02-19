import { Copy, Drawer, Typography, truncateString } from "@polkadex/ux";
import { Dispatch, SetStateAction } from "react";
import { intlFormat } from "date-fns";
import { Trade } from "@orderbook/core/utils/orderbookService/types";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import { ResponsiveCard } from "@/components/ui/ReadyToUse";

export const ResponsiveTable = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: Trade | null;
}) => {
  if (!data) return null;
  const { price, timestamp, tradeId, market, qty, side } = data;
  const isSell = side === "Ask";
  const title = isSell ? "Sell" : "Buy";
  return (
    <Drawer closeOnClickOutside open={open} onOpenChange={onOpenChange}>
      <Drawer.Title className="px-4">
        <Typography.Heading size="base">
          Trade ID # {truncateString(tradeId, 6)}
        </Typography.Heading>
      </Drawer.Title>
      <Drawer.Content className="flex flex-col gap-4 p-4">
        <ResponsiveCard label="Trade ID">
          <Copy value={tradeId}>
            <div className="flex items-center gap-1">
              <DocumentDuplicateIcon className="w-4 h-4 text-actionInput" />
              <Typography.Text size="sm">
                {truncateString(tradeId, 6)}
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
        <ResponsiveCard label="Pair">
          <Typography.Text size="sm">{market.name}</Typography.Text>
        </ResponsiveCard>
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
          <Typography.Text size="sm">{qty}</Typography.Text>
        </ResponsiveCard>
      </Drawer.Content>
    </Drawer>
  );
};
