import { Transaction } from "@orderbook/core/providers/user/transactionsProvider";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import * as S from "./styles";
import { pendingColumns } from "./columns";
import { WithdrawHistorySkeleton } from "./skeleton";

import { EmptyData } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";

export const PendingTable = ({
  data,
  loading,
  hasData,
}: {
  data: Transaction[];
  loading: boolean;
  hasData: boolean;
}) => {
  const table = useReactTable({
    data,
    columns: [],
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
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <div>
                      <Icons.IncreaseFilter />
                    </div>
                  </th>
                ))}
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
                        cell.getContext(),
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
          <EmptyData />
        </S.EmptyData>
      )}
    </>
  );
};
