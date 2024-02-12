import { Order } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { truncateString } from "@polkadex/ux";

const orderHistoryColumnHelper = createColumnHelper<Order>();

export const columns = [
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "id",
    cell: (e) => {
      return <span>{truncateString(e.getValue().orderId, 4)}</span>;
    },
    header: () => <span>Id</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
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
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      return <span>{e.getValue().timestamp.toLocaleString()}</span>;
    },
    header: () => <span>Date</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "type",
    cell: (e) => {
      return <span>{e.getValue().type}</span>;
    },
    header: () => <span>Type</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "status",
    cell: (e) => {
      return <span>{e.getValue().status}</span>;
    },
    header: () => <span>Status</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      const isMarket = e.getValue().type === "MARKET";
      return <span>{isMarket ? "----" : e.getValue().price}</span>;
    },
    header: () => <span>Price</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "amount",
    cell: (e) => {
      return <span>{e.getValue().quantity}</span>;
    },
    header: () => <span>Amount</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "filled",
    cell: (e) => {
      return <span>{e.getValue().filledQuantity}</span>;
    },
    header: () => <span>Filled</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "fee",
    cell: (e) => {
      return <span>{e.getValue().fee}</span>;
    },
    header: () => <span>Fee</span>,
    footer: (e) => e.column.id,
  }),
];
