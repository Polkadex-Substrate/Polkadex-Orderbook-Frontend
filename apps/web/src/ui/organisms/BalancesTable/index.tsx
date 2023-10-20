import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { AssetsProps } from "@orderbook/core/hooks";
import { useTranslation } from "next-i18next";

import * as S from "./styles";
import { columns as getColumns } from "./columns";

import { Icons } from "@/ui/atoms";
import { ResultFound } from "@/ui/molecules";

export const BalancesTable = ({ assets }: { assets: AssetsProps[] }) => {
  const { t } = useTranslation("balances");

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      getColumns([
        t("tableHeaderName"),
        t("fundingAccount"),
        t("tradingAccount"),
        t("tableHeaderInOrders"),
        t("tableHeaderActions"),
      ]),
    [t]
  );

  const table = useReactTable({
    data: assets,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <S.Wrapper>
      {assets.length ? (
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
                  const isActionTab = header.id === "actions";
                  const handleSort = () => {
                    const isDesc = getSorted === "desc";
                    header.column.toggleSorting(!isDesc);
                  };
                  const theadProps = isActionTab ? {} : { onClick: handleSort };
                  return (
                    <S.Thead
                      key={header.id}
                      isActionTab={isActionTab}
                      className={trClassName}
                      {...theadProps}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {!isActionTab && (
                        <div>
                          <Icons.IncreaseFilter />
                        </div>
                      )}
                    </S.Thead>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row, ti) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const lastCell =
                        table.getRowModel().rows.length === ti + 1;
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
                );
              })}
          </tbody>
        </table>
      ) : (
        <S.EmptyData>
          <ResultFound />
        </S.EmptyData>
      )}
    </S.Wrapper>
  );
};
