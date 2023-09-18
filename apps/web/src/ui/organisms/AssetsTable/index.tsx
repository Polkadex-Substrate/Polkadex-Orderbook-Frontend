import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { AssetsProps } from "../AssetsInteraction/types";

import * as S from "./styles";
import { columns as getColumns } from "./columns";

import { Icons } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const AssetsTable = ({
  assets,
  onChangeAsset,
  selectedAssetId,
}: {
  assets: AssetsProps[];
  selectedAssetId?: string;
  onChangeAsset: (e: FilteredAssetProps) => void;
}) => {
  const { t } = useTranslation("transfer");

  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo(
    () =>
      getColumns([
        t("assetsInteraction.tableHeaderToken"),
        t("funding.type"),
        t("trading.type"),
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
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row, ti) => {
              const tdClassName = classNames({
                active: row.original.assetId === selectedAssetId,
              });

              return (
                <tr
                  className={tdClassName}
                  key={row.id}
                  onClick={() =>
                    onChangeAsset({
                      onChainBalance: row.original.onChainBalance,
                      free_balance: row.original.free_balance,
                      assetId: row.original.assetId,
                      name: row.original.name,
                      symbol: row.original.symbol,
                    })
                  }
                >
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
              );
            })}
        </tbody>
      </table>
    </S.Wrapper>
  );
};
