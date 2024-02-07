"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { GenericMessage, Skeleton, Table as PolkadexTable } from "@polkadex/ux";
import { useOpenOrders } from "@orderbook/core/hooks";

import { openOrderColumns } from "./columns";

export const OpenOrdersTable = ({
  market,
  hasHeader = true,
}: {
  market: string;
  hasHeader?: boolean;
}) => {
  const { isLoading, openOrders } = useOpenOrders(market);
  const table = useReactTable({
    data: openOrders,
    columns: openOrderColumns(),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <div className="flex-1 flex flex-col gap-3 p-3 bg-level-3">
        {new Array(8).fill("").map((_, i) => (
          <Skeleton key={i} loading className="flex-1 w-full h-5" />
        ))}
      </div>
    );

  if (!openOrders.length)
    return (
      <GenericMessage
        title={"No open orders"}
        illustration="NoData"
        className="h-64"
      />
    );

  return (
    <div
      className="flex-1 overflow-y-hidden hover:overflow-y-auto"
      style={{ scrollbarGutter: "stable" }}
    >
      <PolkadexTable className="w-full">
        {hasHeader && (
          <PolkadexTable.Header>
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
        )}
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
                      className={classNames("px-2 py-3 text-xs")}
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
