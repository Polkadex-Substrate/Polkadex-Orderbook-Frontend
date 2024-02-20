import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Order } from "@orderbook/core/utils/orderbookService/types";
import { Button, Icon, Popover, Typography } from "@polkadex/ux";
import { Table } from "@tanstack/react-table";
import classNames from "classnames";
import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import CSVLink from "react-csv-downloader";

import { FacetedFilter } from "../facetedFilters";

export const filters = {
  type: ["LIMIT/BUY", "LIMIT/SELL", "MARKET/BUY", "MARKET/SELL"],
};

interface FiltersProps<TData> {
  table: Table<TData>;
  availablePairs: string[];
  allOpenOrders: Order[];
}

const csvColumns = [
  "orderId",
  "date",
  "pair",
  "type",
  "price",
  "amount",
  "filled",
].map((c) => ({ id: c }));

export const Filters = <TData,>({
  availablePairs,
  table,
  allOpenOrders,
}: FiltersProps<TData>) => {
  const { width } = useWindowSize();
  const responsiveFilter = useMemo(() => width <= 600, [width]);
  const hasFilters = table.getState().columnFilters.length > 0;
  const exportedFileName = `Open_Orders_${new Date().getTime()}_Polkadex_Orderbook`;

  const computeData = () => {
    const data = allOpenOrders.map((order) => {
      const isSell = order.side === "Ask";
      const type = `${order.type}/${isSell ? "SELL" : "BUY"}`;
      return {
        orderId: order.orderId,
        date: order.timestamp.toLocaleString().replaceAll(",", ""),
        pair: order.market.name,
        type,
        price: String(order.price),
        amount: order.quantity,
        filled: order.filledQuantity,
      };
    });
    return data;
  };

  return (
    <div className="flex items-center gap-5 justify-between px-4 py-1.5">
      <div
        className={classNames(
          "flex items-center gap-4 flex-1",
          responsiveFilter && "justify-"
        )}
      >
        {responsiveFilter ? (
          <>
            <Typography.Text appearance="secondary">Filters</Typography.Text>
            <Popover>
              <Popover.Trigger className="group">
                <EllipsisVerticalIcon className="w-6 h-6 text-primary group-hover:text-current transition-colors duration-300" />
              </Popover.Trigger>
              <Popover.Content className="flex flex-col gap-3 p-2">
                {table.getColumn("pair") && (
                  <FacetedFilter
                    column={table.getColumn("pair")}
                    title="Pair"
                    values={availablePairs}
                    withoutBorder
                  />
                )}
                {table.getColumn("type") && (
                  <FacetedFilter
                    column={table.getColumn("type")}
                    title="Type"
                    values={filters.type}
                    withoutBorder
                  />
                )}
              </Popover.Content>
            </Popover>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {table.getColumn("pair") && (
              <FacetedFilter
                column={table.getColumn("pair")}
                title="Pair"
                values={availablePairs}
              />
            )}
            {table.getColumn("type") && (
              <FacetedFilter
                column={table.getColumn("type")}
                title="Type"
                values={filters.type}
              />
            )}
          </div>
        )}
        {!!hasFilters && (
          <Button.Outline
            size="sm"
            appearance="secondary"
            className="gap-2"
            onClick={() => table.resetColumnFilters()}
          >
            <Icon className="w-3 h-3">
              <XMarkIcon />
            </Icon>
            <Typography.Text size="sm">Reset</Typography.Text>
          </Button.Outline>
        )}
      </div>
      <div className="flex-auto flex items-center justify-end">
        <CSVLink
          columns={csvColumns}
          datas={computeData}
          filename={exportedFileName}
        >
          <Button.Outline appearance="secondary" size="sm">
            <ArrowDownTrayIcon className="w-4 h-4 inline-block mr-1" />
            Export
          </Button.Outline>
        </CSVLink>
      </div>
    </div>
  );
};
