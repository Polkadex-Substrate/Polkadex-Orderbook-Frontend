import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";

export interface OrderbookProps {
  price: string;
  amount: string;
  date: Date;
  type: "sell" | "buy";
}
const columnHelper = createColumnHelper<OrderbookProps>();

export const columns = () => [
  columnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return (
        <span
          className={classNames(
            e.getValue().type === "sell"
              ? "text-primary-base"
              : "text-success-base"
          )}
        >
          {e.getValue().price}
        </span>
      );
    },
    header: () => <span>Price(PDEX)</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => {
      return <span>{e.getValue()}</span>;
    },
    header: () => <span>Amount(DOT)</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.date, {
    id: "date",
    cell: () => {
      const date = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })
        .format(new Date())
        .replace(/ [APap][Mm]/, "");
      return <span>{date}</span>;
    },
    header: () => <span>Total(DOT)</span>,
    footer: (e) => e.column.id,
  }),
];
