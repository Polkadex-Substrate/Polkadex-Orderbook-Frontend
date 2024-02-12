"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useOrderbookTable } from "@orderbook/core/hooks";
import { MutableRefObject, useRef } from "react";
import { GenericMessage, Table as PolkadexTable } from "@polkadex/ux";

import { columns } from "./columns";

export const Table = ({
  isSell = false,
  precision,
  active,
  baseTicker,
  quoteTicker,
  orders,
  asks,
  bids,
}: {
  isSell?: boolean;
  precision: number;
  active?: boolean;
  baseTicker: string;
  quoteTicker: string;
  orders: string[][];
  bids: string[][];
  asks: string[][];
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    changeMarketAmount,
    changeMarketAmountSumClick,
    changeMarketPrice,
    total,
    volumeData,
  } = useOrderbookTable({
    orders,
    contentRef: contentRef as MutableRefObject<HTMLDivElement>,
    isSell,
    asks,
    bids,
  });

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: orders,
    columns: columns({
      total,
      precision,
      isPriceUp: isSell,
      baseTicker,
      quoteTicker,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  if (!orders.length)
    return <GenericMessage title="No data" illustration="NoData" />;

  return (
    <div
      ref={contentRef}
      className={classNames(
        !active && "hidden",
        "flex-1 overflow-y-hidden hover:overflow-y-auto"
      )}
      style={{ scrollbarGutter: "stable" }}
    >
      <PolkadexTable className="w-full">
        <PolkadexTable.Header className="sticky top-0 bg-level-0">
          {getHeaderGroups().map((headerGroup) => (
            <PolkadexTable.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <PolkadexTable.Head
                    align={header.id === "price" ? "left" : "right"}
                    className={"px-2 text-primary font-medium text-xs"}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
          {getRowModel().rows.map((row) => {
            return (
              <PolkadexTable.Row
                key={row.id}
                className={classNames("hover:bg-level-1 cursor-pointer ")}
              >
                {row.getVisibleCells().map((cell, i) => {
                  const firstCol = i === 0;
                  const value = cell.getValue();
                  const active = firstCol && (value as string[])[0] === "8.654";
                  return (
                    <PolkadexTable.Cell
                      className={classNames(
                        "px-2 py-1 hover:bg-level-1 text-xs",
                        firstCol ? "text-left" : "text-right",
                        firstCol && "font-semibold",
                        active &&
                          "before:absolute before:left-[-1%] before:content-[''] before:top-1/2 before:transform before:-translate-y-1/2 before:block before:h-0 before:w-0 before:border-x-4 before:border-x-transparent before:border-b-[6px] before:border-b-attention-base before:rotate-90"
                      )}
                      key={cell.id}
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
