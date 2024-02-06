"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { GenericMessage } from "@polkadex/ux";

import { columns } from "./columns";

export const Table = ({ hasHeader = true }: { hasHeader?: boolean }) => {
  const data: any = [];
  const table = useReactTable({
    data,
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data.length)
    return <GenericMessage title="No open orders" illustration="NoData" />;

  return (
    <div
      className="flex-1 overflow-y-hidden hover:overflow-y-auto"
      style={{ scrollbarGutter: "stable" }}
    >
      <table className="w-full">
        {hasHeader && (
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={classNames(
                        header.id === "price" ? "text-left" : "text-right",
                        "px-2 text-primary font-medium text-xs"
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
        )}
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
                        lastCol && "opacity-50",
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
    </div>
  );
};
