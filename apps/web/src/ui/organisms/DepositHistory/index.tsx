import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import classNames from "classnames";
import { useTransactionsProvider } from "@orderbook/core/providers/user/transactionsProvider";
import { intlFormat } from "date-fns";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";

import { columns } from "./columns";
import * as S from "./styles";
import { DepositHistorySkeleton } from "./skeleton";

import { Checkbox, EmptyData, Search } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";

export const DepositHistory = () => {
  const { deposits, loading: isTransactionsFetching } =
    useTransactionsProvider();

  const { selectGetAsset } = useAssetsProvider();

  const data = useMemo(
    () =>
      deposits.map((e) => {
        const token = selectGetAsset(e.asset);
        return {
          stid: e.stid,
          snapshot_id: e.snapshot_id,
          amount: e.amount,
          fee: e.fee,
          main_account: e.main_account,
          time: intlFormat(
            new Date(e.time),
            {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
            { locale: "EN" },
          ),
          status: e.status,
          txn_type: e.txn_type,
          token: {
            ticker: token.symbol,
            name: token.name,
          },
        };
      }),
    [deposits, selectGetAsset],
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <S.Wrapper>
      <S.Title>
        <h3>History</h3>
        <S.TitleWrapper>
          <Search isFull placeholder="Search" />
          <Checkbox labelProps={{ style: { whiteSpace: "nowrap" } }}>
            Show only selected token
          </Checkbox>
        </S.TitleWrapper>
      </S.Title>
      <S.Table>
        {isTransactionsFetching ? (
          <DepositHistorySkeleton />
        ) : deposits?.length ? (
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
      </S.Table>
    </S.Wrapper>
  );
};
