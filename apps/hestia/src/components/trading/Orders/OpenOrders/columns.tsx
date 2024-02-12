import { Order } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@polkadex/ux";
import { OrderCancellation } from "@orderbook/core/providers/user/orders";

const openOrderColumnHelper = createColumnHelper<Order>();

export const columns = ({
  onCancelOrder,
}: {
  onCancelOrder: (value: OrderCancellation) => void;
}) => [
  openOrderColumnHelper.accessor((row) => row, {
    id: "pair",
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";
      const Icon = isSell ? ArrowRightCircleIcon : ArrowLeftCircleIcon;
      return (
        <span className="flex items-center gap-1">
          <Icon
            className={classNames(
              "w-5 h-5",
              isSell ? "text-primary-base" : "text-success-base"
            )}
          />
          {e.getValue().market.name}
        </span>
      );
    },
    header: () => <span>Pair</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      return <span>{e.getValue().timestamp.toLocaleString()}</span>;
    },
    header: () => <span>Date</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "type",
    cell: (e) => {
      return <span>{e.getValue().type}</span>;
    },
    header: () => <span>Type</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return <span>{e.getValue().price}</span>;
    },
    header: () => <span>Price</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "total",
    cell: (e) => {
      return <span>{e.getValue().quantity}</span>;
    },
    header: () => <span>Total</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "filled",
    cell: (e) => {
      return <span>{e.getValue().filledQuantity}</span>;
    },
    header: () => <span>Filled</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "cancel order",
    cell: (e) => {
      return (
        <Button.Solid
          className="py-0.5 h-auto"
          size="xs"
          onClick={() =>
            onCancelOrder({
              orderId: e.getValue().orderId,
              base: e.getValue().market.baseAsset.id,
              quote: e.getValue().market.quoteAsset.id,
            })
          }
        >
          Cancel Order
        </Button.Solid>
      );
    },
    header: () => <></>,
    footer: (e) => e.column.id,
  }),
];
