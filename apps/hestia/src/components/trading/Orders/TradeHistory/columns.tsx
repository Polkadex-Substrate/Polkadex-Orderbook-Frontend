import { Trade } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { truncateString } from "@polkadex/ux";

const tradeHistoryColumnHelper = createColumnHelper<Trade>();

export const columns = [
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "id",
    cell: (e) => {
      return <span>{truncateString(e.getValue().tradeId, 4)}</span>;
    },
    header: () => <span>Id</span>,
    footer: (e) => e.column.id,
  }),
  tradeHistoryColumnHelper.accessor((row) => row, {
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
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      return <span>{e.getValue().timestamp.toLocaleString()}</span>;
    },
    header: () => <span>Date</span>,
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
];
