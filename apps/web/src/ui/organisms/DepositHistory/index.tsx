import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import * as S from "./styles";
import { DepositHistorySkeleton } from "./skeleton";
import { useDepositHistory } from "./useDepositHistory";

import { CheckboxCustom, ResultFound, Search } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const DepositHistory = ({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) => {
  const { t } = useTranslation("transfer");
  const {
    showSelectedCoins,
    onShowSelectedCoins,
    sorting,
    setSorting,
    data,
    columns,
    loading,
  } = useDepositHistory({ selectedAsset });

  const table = useReactTable({
    data,
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
      <S.Title>
        <h3>{t("historyTitle")}</h3>
        <S.TitleWrapper>
          <Search isFull placeholder="Search" />
          <CheckboxCustom
            labelProps={{ style: { whiteSpace: "nowrap" } }}
            checked={showSelectedCoins}
            onChange={onShowSelectedCoins}
          >
            {t("historyFilterByToken")}
          </CheckboxCustom>
        </S.TitleWrapper>
      </S.Title>
      <S.Table>
        {loading ? (
          <DepositHistorySkeleton />
        ) : data?.length ? (
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
              {table.getRowModel().rows.map((row, ti) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const isReverted =
                        cell.getContext().row.original.isReverted;
                      const lastCell =
                        table.getRowModel().rows.length === ti + 1;
                      const tdClassName = classNames({
                        last: lastCell,
                        isReverted,
                      });
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
            <ResultFound>{t("resultEmpty")}</ResultFound>
          </S.EmptyData>
        )}
      </S.Table>
    </S.Wrapper>
  );
};
