import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import classNames from "classnames";
import { intlFormat } from "date-fns";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useExtensionWallet } from "@orderbook/core/providers/user/extensionWallet";
import { useTranslation } from "react-i18next";
import { TransferHistory as TransferHistoryProps } from "@orderbook/core/helpers";

import { columns as getColumns } from "./columns";
import * as S from "./styles";
import { DepositHistorySkeleton } from "./skeleton";
import * as T from "./types";

import { CheckboxCustom, ResultFound, Search } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const TransferHistory = ({
  selectedAsset,
  transactions,
  isLoading,
}: {
  selectedAsset?: FilteredAssetProps;
  isLoading: boolean;
  transactions: TransferHistoryProps[];
}) => {
  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { t } = useTranslation("transfer");

  const { selectGetAsset } = useAssetsProvider();
  const { allAccounts } = useExtensionWallet();
  const columns = useMemo(
    () => getColumns(["Date", "Token", "Amount", "From/To", "Hash"]),
    []
  );

  const allData = useMemo(
    () =>
      transactions
        ?.filter((e) => {
          if (showSelectedCoins) {
            const tokenId = e.asset_unique_id
              .split("standard_assets/")
              .join("");

            return tokenId === selectedAsset?.assetId;
          }
          return e;
        })
        ?.map((e) => {
          const tokenId = e.asset_unique_id.split("standard_assets/").join("");
          const token = selectGetAsset(tokenId);
          const fromData = allAccounts?.find(
            (from) => from.account.address === e.from
          );
          const toData = allAccounts?.find(
            (wallet) => wallet.account.address === e.to
          );

          return {
            hash: e.hash,
            amount: e.amount,
            time: intlFormat(
              new Date(e.block_timestamp * 1000),
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
              { locale: "EN" }
            ),
            token: {
              ticker: token?.symbol,
              name: token?.name,
            },
            wallets: {
              fromWalletName: fromData?.account?.meta?.name ?? "Custom wallet",
              fromWalletAddress: e.from,
              toWalletName: toData?.account.meta?.name ?? "Custom wallet",
              toWalletAddress: e.to,
            },
          } as T.TransferHistoryProps;
        }),
    [
      selectGetAsset,
      selectedAsset?.assetId,
      showSelectedCoins,
      allAccounts,
      transactions,
    ]
  );
  const table = useReactTable({
    data: allData ?? [],
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
            onChange={() => setShowSelectedCoins(!showSelectedCoins)}
          >
            {t("historyFilterByToken")}
          </CheckboxCustom>
        </S.TitleWrapper>
      </S.Title>
      <S.Table>
        {isLoading ? (
          <DepositHistorySkeleton />
        ) : allData?.length ? (
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
                    const handleSort = () => {
                      const isDesc = getSorted === "desc";
                      header.column.toggleSorting(!isDesc);
                    };
                    const isActionTab = header.id === "date";
                    const theadProps = isActionTab
                      ? { onClick: handleSort }
                      : {};
                    return (
                      <S.Thead
                        key={header.id}
                        className={trClassName}
                        {...theadProps}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {isActionTab && (
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
            <ResultFound>{t("resultEmpty")}</ResultFound>
          </S.EmptyData>
        )}
      </S.Table>
    </S.Wrapper>
  );
};
