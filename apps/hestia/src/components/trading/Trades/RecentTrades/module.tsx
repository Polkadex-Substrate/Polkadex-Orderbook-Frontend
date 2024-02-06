"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { PublicTrade } from "@orderbook/core/utils/orderbookService";
import { GenericMessage } from "@polkadex/ux";

import { columns } from "./columns";

export const RecentTradesModule = ({
  quoteTicker,
  baseTicker,
  precision,
  isDecreasing,
  data,
}: {
  quoteTicker: string;
  baseTicker: string;
  precision: number;
  isDecreasing: [boolean];
  data: PublicTrade[];
}) => {
  const table = useReactTable({
    data,
    columns: columns({
      isDecreasing,
      quoteTicker,
      baseTicker,
      precision,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="flex-1 h-full overflow-hidden hover:overflow-auto"
      style={{ scrollbarGutter: "stable" }}
    >
      {data?.length ? (
        <table className="w-full">
          <thead className="sticky top-[-1px] bg-level-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={classNames(
                        header.id === "price" ? "text-left" : "text-right",
                        "px-2 text-primary font-medium text-xs py-1"
                      )}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="hover:bg-level-1 cursor-pointer">
                  {row.getVisibleCells().map((cell, i) => {
                    const firstCol = i === 0;
                    const lastCol = i === 2;
                    return (
                      <td
                        className={classNames(
                          firstCol ? "text-left" : "text-right",
                          firstCol && "font-semibold",
                          lastCol && "text-primary",
                          "px-2 py-1 hover:bg-level-1 text-xs"
                        )}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <GenericMessage title="No data" illustration="NoData" />
      )}
    </div>
  );
};
