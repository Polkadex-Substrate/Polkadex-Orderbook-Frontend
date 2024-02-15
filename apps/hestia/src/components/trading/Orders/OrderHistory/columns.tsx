import { Order } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { Copy, Tooltip, Typography, truncateString } from "@polkadex/ux";

const orderHistoryColumnHelper = createColumnHelper<Order>();

export const columns = [
  orderHistoryColumnHelper.accessor((row) => row, {
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

  orderHistoryColumnHelper.accessor((row) => row, {
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

  orderHistoryColumnHelper.accessor((row) => row, {
    id: "type",
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";

      const title = `${e.getValue().type.toLowerCase()}/${
        isSell ? "Sell" : "Buy"
      }`;
      return (
        <Typography.Text
          size="xs"
          bold
          appearance={isSell ? "danger" : "success"}
          className="capitalize"
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

  orderHistoryColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      const isMarket = e.getValue().type === "MARKET";
      return (
        <Typography.Text size="xs">
          {isMarket ? "---" : e.getValue().price}
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Price
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "amount",
    cell: (e) => (
      <Typography.Text size="xs">{e.getValue().quantity}</Typography.Text>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Amount
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "filled",
    cell: (e) => (
      <Typography.Text size="xs">{e.getValue().filledQuantity}</Typography.Text>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Filled
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "status",
    cell: (e) => (
      <Typography.Text size="xs" className="capitalize">
        {e.getValue().status.toLowerCase()}
      </Typography.Text>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Status
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "fee",
    cell: (e) => {
      const ticker =
        e.getValue().side === "Bid"
          ? e.getValue().market.baseAsset.ticker
          : e.getValue().market.quoteAsset.ticker;
      return (
        <Typography.Text size="xs">
          {e.getValue().fee} {ticker}
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Fee
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "id",
    cell: (e) => (
      <Copy value={e.getValue().orderId}>
        <div className="flex items-center gap-1">
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
];
