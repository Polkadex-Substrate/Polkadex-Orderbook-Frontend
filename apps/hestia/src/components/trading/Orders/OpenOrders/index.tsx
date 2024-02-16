// TODO: Fix responsive interaction (reflect columns updates)

"use client";

import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { GenericMessage, Table as PolkadexTable } from "@polkadex/ux";
import { useOpenOrders } from "@orderbook/core/hooks";
import { useOrders } from "@orderbook/core/providers/user/orders";
import { useWindowSize } from "usehooks-ts";
import { Ifilters } from "@orderbook/core/providers/types";

import { Loading } from "../loading";
import { OpenOrderResponsiveCard } from "../responsiveCard";

import { columns } from "./columns";

export const OpenOrdersTable = ({
  filters,
  maxHeight,
}: {
  market: string;
  filters: Ifilters;
  maxHeight: string;
}) => {
  const { onCancelOrder } = useOrders();
  const { isLoading, openOrders } = useOpenOrders(filters);
  const { width } = useWindowSize();

  const responsiveView = useMemo(
    () => width < 500 || (width >= 715 && width <= 1115),
    [width]
  );

  const table = useReactTable({
    data: openOrders,
    columns: columns({ onCancelOrder }),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Loading />;

  if (!openOrders.length)
    return <GenericMessage title={"No open orders"} illustration="NoData" />;

  if (responsiveView) {
    return (
      <div
        className="flex-1 overflow-y-hidden hover:overflow-y-auto"
        style={{ maxHeight, scrollbarGutter: "stable" }}
      >
        <OpenOrderResponsiveCard
          orders={openOrders}
          onCancelOrder={onCancelOrder}
        />
      </div>
    );
  }

  return (
    <div
      className="flex-1 overflow-y-hidden hover:overflow-y-auto"
      style={{ maxHeight, scrollbarGutter: "stable" }}
    >
      <PolkadexTable className="w-full" even>
        <PolkadexTable.Header className="sticky top-0 bg-backgroundBase">
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
          {table.getRowModel().rows.map((row) => {
            return (
              <PolkadexTable.Row
                key={row.id}
                className={classNames("hover:bg-level-1 cursor-pointer")}
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
