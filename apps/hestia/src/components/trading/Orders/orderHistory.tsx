"use client";
import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { GenericMessage, Table as PolkadexTable } from "@polkadex/ux";
import { useOrderHistory } from "@orderbook/core/hooks";

import { orderHistoryColumns } from "./columns";
import { Loading } from "./loading";
import { OrderHistoryResponsiveCard } from "./responsiveCard";

export const OrderHistoryTable = ({
  market,
  maxHeight,
}: {
  market: string;
  maxHeight: string;
}) => {
  const { isLoading, orderHistory } = useOrderHistory(market);
  const { width } = useWindowSize();
  const table = useReactTable({
    data: orderHistory,
    columns: orderHistoryColumns(),
    getCoreRowModel: getCoreRowModel(),
  });

  const responsiveView = useMemo(
    () => width < 600 || (width >= 715 && width <= 1200),
    [width]
  );

  if (isLoading) return <Loading />;

  if (!orderHistory.length)
    return <GenericMessage title={"No items found"} illustration="NoData" />;

  if (responsiveView) {
    return (
      <div
        className="flex-1 overflow-y-hidden hover:overflow-y-auto"
        style={{ maxHeight, scrollbarGutter: "stable" }}
      >
        <OrderHistoryResponsiveCard orders={orderHistory} />
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-hidden hover:overflow-y-auto"
      style={{ maxHeight, scrollbarGutter: "stable" }}
    >
      <PolkadexTable className="w-full">
        <PolkadexTable.Header className="sticky top-0 bg-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <PolkadexTable.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <PolkadexTable.Head
                    className={classNames(
                      "px-2 text-primary font-semibold text-xs"
                    )}
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </PolkadexTable.Head>
                );
              })}
            </PolkadexTable.Row>
          ))}
        </PolkadexTable.Header>
        <PolkadexTable.Body>
          {table.getRowModel().rows.map((row, i) => {
            return (
              <PolkadexTable.Row
                key={row.id}
                className={classNames(
                  "hover:bg-level-1 cursor-pointer",
                  i % 2 && "bg-level-1"
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <PolkadexTable.Cell
                      key={cell.id}
                      className={classNames("px-2 py-4 text-xs")}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </PolkadexTable.Cell>
                  );
                })}
              </PolkadexTable.Row>
            );
          })}
        </PolkadexTable.Body>
      </PolkadexTable>
    </div>
  );
};
