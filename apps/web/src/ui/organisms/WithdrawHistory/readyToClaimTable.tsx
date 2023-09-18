import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./styles";
import { readyToClaimColumns } from "./columns";
import { WithdrawHistorySkeleton } from "./skeleton";
import { ReadyToClaimDataProps, ReadyToClaimProps } from "./types";

import { ResultFound } from "@/ui/molecules";

export const ReadyToClaimTable = ({
  data,
  loading,
  hasData,
}: {
  data: ReadyToClaimDataProps[];
  loading: boolean;
  hasData: boolean;
}) => {
  const { t } = useTranslation("transfer");

  return (
    <>
      {loading ? (
        <WithdrawHistorySkeleton />
      ) : hasData ? (
        <Fragment>
          {data.map((e) => {
            return <BatchTable batch={e.sid} key={e.sid} data={e.items} />;
          })}
        </Fragment>
      ) : (
        <S.EmptyData>
          <ResultFound>{t("resultEmpty")}</ResultFound>
        </S.EmptyData>
      )}
    </>
  );
};

const BatchTable = ({
  batch,
  data,
}: {
  batch: number;
  data: ReadyToClaimProps[];
}) => {
  const { t } = useTranslation("transfer");

  const columns = useMemo(
    () =>
      readyToClaimColumns([
        t("tableHeader.date"),
        t("tableHeader.name"),
        t("tableHeader.amount"),
        t("tableHeader.transfer"),
      ]),
    [t]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <S.TableWrapper>
      <S.TableAside>
        <h4>
          {t("batch")} {batch}
        </h4>
        <button type="button" onClick={() => window.alert("Claim")}>
          {t("claimButton")}
        </button>
      </S.TableAside>

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
                        header.getContext()
                      )}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </S.TableWrapper>
  );
};
