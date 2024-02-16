import {
  Button,
  Copy,
  Drawer,
  PopConfirm,
  Typography,
  truncateString,
} from "@polkadex/ux";
import { Dispatch, SetStateAction } from "react";
import { intlFormat } from "date-fns";
import { Order } from "@orderbook/core/utils/orderbookService/types";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { OrderCancellation } from "@orderbook/core/providers/user/orders";

import { ResponsiveCard } from "@/components/ui/ReadyToUse";

export const ResponsiveTable = ({
  open,
  onOpenChange,
  data,
  onCancelOrder,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: Order | null;
  onCancelOrder: (payload: OrderCancellation) => void;
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
  } = data;
  const isSell = side === "Ask";
  const title = `${type}/${isSell ? "Sell" : "Buy"}`;
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
          )}
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
          <Typography.Text size="xs">{price}</Typography.Text>
        </ResponsiveCard>
        <ResponsiveCard label="Total">{quantity}</ResponsiveCard>
        <ResponsiveCard label="Filled">{filledQuantity}</ResponsiveCard>
        <ResponsiveCard label="Action">
          <PopConfirm>
            <PopConfirm.Trigger asChild>
              <Button.Solid className="py-0.5 h-auto" size="sm">
                Cancel Order
              </Button.Solid>
            </PopConfirm.Trigger>
            <PopConfirm.Content>
              <PopConfirm.Title>Cancel order</PopConfirm.Title>
              <PopConfirm.Description>
                Are you sure you want to cancel this order?
              </PopConfirm.Description>
              <PopConfirm.Close>No</PopConfirm.Close>
              <PopConfirm.Button
                onClick={() =>
                  onCancelOrder({
                    orderId: orderId,
                    base: market.baseAsset.id,
                    quote: market.quoteAsset.id,
                  })
                }
              >
                Yes cancel
              </PopConfirm.Button>
            </PopConfirm.Content>
          </PopConfirm>
        </ResponsiveCard>
      </Drawer.Content>
    </Drawer>
  );
};
