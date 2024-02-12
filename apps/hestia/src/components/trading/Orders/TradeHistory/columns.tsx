import { Trade } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { Copy, Tooltip, Typography, truncateString } from "@polkadex/ux";

const tradeHistoryColumnHelper = createColumnHelper<Trade>();

export const columns = [
  tradeHistoryColumnHelper.accessor((row) => row, {
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

  tradeHistoryColumnHelper.accessor((row) => row, {
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
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "type",
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";

      return (
        <Typography.Text
          size="xs"
          bold
          appearance={isSell ? "danger" : "success"}
          className="capitalize"
        >
          {isSell ? "Sell" : "Buy"}
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
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return <span>{e.getValue().price}</span>;
    },
    header: () => <span>Price</span>,
    footer: (e) => e.column.id,
  }),
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "quantity",
    cell: (e) => {
      return <span>{e.getValue().quantity}</span>;
    },
    header: () => <span>Quantity</span>,
    footer: (e) => e.column.id,
  }),
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "id",
    cell: (e) => {
      return (
        <Copy value={e.getValue().tradeId}>
          <div className="flex items-center gap-1">
            <DocumentDuplicateIcon className="w-4 h-4 text-actionInput" />
            <Typography.Text size="xs">
              {truncateString(e.getValue().tradeId, 4)}
            </Typography.Text>
          </div>
        </Copy>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        ID
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
];
