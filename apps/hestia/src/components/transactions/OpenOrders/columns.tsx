import { Order } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Button,
  Copy,
  PopConfirm,
  Tooltip,
  Typography,
  truncateString,
} from "@polkadex/ux";
import { OrderCancellation } from "@orderbook/core/providers/user/orders";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const openOrderColumnHelper = createColumnHelper<Order>();

export const columns = ({
  onCancelOrder,
}: {
  onCancelOrder: (value: OrderCancellation) => void;
}) => [
  openOrderColumnHelper.accessor((row) => row, {
    id: "id",
    cell: (e) => (
      <Copy value={e.getValue().orderId}>
        <div className="flex items-center gap-2">
          <DocumentDuplicateIcon className="w-4 h-4 text-actionInput" />
          <Typography.Text size="xs">
            {truncateString(e.getValue().orderId, 4)}
          </Typography.Text>
        </div>
      </Copy>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        ID
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      })
        .format(e.getValue().timestamp)
        .replace(",", "");

      return (
        <Tooltip>
          <Tooltip.Trigger>
            <Typography.Text size="xs">{formattedDate}</Typography.Text>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography.Text>
              <Typography.Text size="xs">
                {e.getValue().timestamp.toLocaleString()}
              </Typography.Text>
            </Typography.Text>
          </Tooltip.Content>
        </Tooltip>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Date
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "pair",
    cell: (e) => (
      <Typography.Text bold size="xs">
        {e.getValue().market.name}
      </Typography.Text>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Pair
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "type",
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";
      const title = `${e.getValue().type}/${isSell ? "Sell" : "Buy"}`;
      return (
        <Typography.Text
          size="xs"
          bold
          appearance={isSell ? "danger" : "success"}
          className="uppercase"
        >
          {title}
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Type
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return <Typography.Text size="xs">{e.getValue().price}</Typography.Text>;
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Price
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "total",
    cell: (e) => {
      return (
        <Typography.Text size="xs">{e.getValue().quantity}</Typography.Text>
      );
    },
    header: () => <Typography.Text size="xs">Total</Typography.Text>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "filled",
    cell: (e) => {
      return (
        <Typography.Text size="xs">
          {e.getValue().filledQuantity}
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Filled
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "actions",
    cell: (e) => {
      return (
        <PopConfirm>
          <PopConfirm.Trigger asChild>
            <Button.Solid className="py-0.5 h-auto" size="xs">
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
                  orderId: e.getValue().orderId,
                  base: e.getValue().market.baseAsset.id,
                  quote: e.getValue().market.quoteAsset.id,
                })
              }
            >
              Yes cancel
            </PopConfirm.Button>
          </PopConfirm.Content>
        </PopConfirm>
      );
    },
    header: () => null,
    footer: (e) => e.column.id,
  }),
];
