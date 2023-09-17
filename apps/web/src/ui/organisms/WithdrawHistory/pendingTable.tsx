import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useState } from "react";

import { Props } from "./types";
import * as S from "./styles";
import { pendingColumns } from "./columns";
import { WithdrawHistorySkeleton } from "./skeleton";

import { ResultFound } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";

export const PendingTable = ({
  data,
  loading,
  hasData,
}: {
  data: Props[];
  loading: boolean;
  hasData: boolean;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    columns: pendingColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {loading ? (
        <WithdrawHistorySkeleton />
      ) : hasData ? (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const getSorted = header.column.getIsSorted();
                  const trClassName = classNames({
                    asc: getSorted === "asc",
                    desc: getSorted === "desc",
                  });

                  return (
                    <S.Thead
                      key={header.id}
                      className={trClassName}
                      onClick={() => {
                        const isDesc = getSorted === "desc";
                        header.column.toggleSorting(!isDesc);
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div>
                        <Icons.IncreaseFilter />
                      </div>
                    </S.Thead>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, ti) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const lastCell = table.getRowModel().rows.length === ti + 1;
                  const tdClassName = classNames({ last: lastCell });
                  return (
                    <td className={tdClassName} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <S.EmptyData>
          <ResultFound />
        </S.EmptyData>
      )}
    </>
  );
};
