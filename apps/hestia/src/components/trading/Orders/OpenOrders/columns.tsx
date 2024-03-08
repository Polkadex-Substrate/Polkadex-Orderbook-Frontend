import { Order } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import { Tooltip, Typography } from "@polkadex/ux";
import { CancelOrderArgs } from "@orderbook/core/hooks";

import { CancelOrderAction } from "./cancelOrderAction";
import { CancelAllOrdersAction } from "./cancelAllOrdersAction";

import { formatedDate } from "@/helpers";
import { FilledCard } from "@/components/ui/ReadyToUse";

const openOrderColumnHelper = createColumnHelper<Order>();

export const columns = ({
  onCancelOrder,
  onCancelAllOrders,
}: {
  onCancelOrder: (value: CancelOrderArgs) => void;
  onCancelAllOrders: (props: { market: string }) => void;
}) => [
  openOrderColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      const date = formatedDate(e.getValue().timestamp);
      return (
        <Tooltip>
          <Tooltip.Trigger>
            <Typography.Text size="xs">{date}</Typography.Text>
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
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";

      return (
        <div className="flex flex-col">
          <Typography.Text bold size="xs">
            {e.getValue().market.name}
          </Typography.Text>
          <div className="flex items-center">
            <Typography.Text
              size="xs"
              className="first-letter:uppercase"
              bold
              appearance={isSell ? "danger" : "success"}
            >
              {e.getValue().type.toLowerCase()} / {isSell ? "Sell" : "Buy"}
            </Typography.Text>
          </div>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Pair/Type
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),

  openOrderColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return (
        <Typography.Text size="xs">
          {e.getValue().price} {e.getValue().market.quoteAsset.ticker}
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
  openOrderColumnHelper.accessor((row) => row, {
    id: "amount",
    cell: (e) => {
      return (
        <Typography.Text size="xs">
          {e.getValue().quantity} {e.getValue().market.baseAsset.ticker}
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Amount
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "filled",
    cell: (e) => {
      const percent =
        (Number(e.getValue().filledQuantity) / Number(e.getValue().quantity)) *
        100;

      const roundedPercent = Math.min(100, percent).toFixed(2);
      const width = `${roundedPercent}%`;
      return (
        <FilledCard width={width}>
          {e.getValue().filledQuantity} {e.getValue().market.baseAsset.ticker}
        </FilledCard>
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
        <CancelOrderAction
          onCancel={() =>
            onCancelOrder({
              orderId: e.getValue().orderId,
              base: e.getValue().market.baseAsset.id,
              quote: e.getValue().market.quoteAsset.id,
            })
          }
        />
      );
    },
    header: (e) => {
      const marketMap = e.table
        .getRowModel()
        .rows.map((e) => e.original.market);
      const markets = new Set(marketMap);
      return (
        <CancelAllOrdersAction
          markets={Array.from(markets)}
          orders={marketMap.length}
          onCancel={(market) => onCancelAllOrders({ market })}
        />
      );
    },
    footer: (e) => e.column.id,
  }),
];
