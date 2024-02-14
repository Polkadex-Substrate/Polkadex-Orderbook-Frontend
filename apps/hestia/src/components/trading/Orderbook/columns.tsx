import { Decimal } from "@orderbook/core/utils";
import { Typography } from "@polkadex/ux";
import { createColumnHelper } from "@tanstack/react-table";
import { MouseEvent } from "react";

const columnHelper = createColumnHelper<string[]>();

export type GenericAction = (
  e: MouseEvent<HTMLElement>,
  selectedIndex: number
) => void;

export const columns = ({
  total,
  precision,
  isPriceUp,
  baseTicker,
  quoteTicker,
  onChangePrice,
  onChangeAmount,
  onChangeTotal,
}: {
  total: number[];
  precision: number;
  isPriceUp: boolean;
  quoteTicker: string;
  baseTicker: string;
  onChangePrice: GenericAction;
  onChangeAmount: GenericAction;
  onChangeTotal: GenericAction;
}) => [
  columnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      const price = e.getValue()[0];
      return (
        <Typography.Text
          appearance={isPriceUp ? "danger" : "success"}
          size="xs"
          onClick={(event) => onChangePrice(event, e.row.index)}
        >
          <Decimal
            fixed={precision}
            thousSep=","
            // prevValue={orders[i + 1] ? orders[i + 1][0] : 0}
          >
            {price}
          </Decimal>
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs">Price({quoteTicker})</Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "amount",
    cell: (e) => {
      const amount = e.getValue()[1];
      return (
        <Typography.Text
          size="xs"
          onClick={(event) => onChangeAmount(event, e.row.index)}
        >
          <Decimal fixed={precision} thousSep=",">
            {amount}
          </Decimal>
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs">Amount({baseTicker})</Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "total",
    cell: (e) => {
      const i = e.row.index;
      return (
        <Typography.Text
          size="xs"
          onClick={(event) => onChangeTotal(event, e.row.index)}
        >
          <Decimal fixed={precision} thousSep=",">
            {total[i]}
          </Decimal>
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs">Total({quoteTicker})</Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
];
