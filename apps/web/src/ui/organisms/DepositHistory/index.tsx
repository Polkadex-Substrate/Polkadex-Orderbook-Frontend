import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import classNames from "classnames";
import { useTransactionsProvider } from "@orderbook/core/providers/user/transactionsProvider";
import { intlFormat } from "date-fns";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import { useTranslation } from "react-i18next";

import { columns as getColumns } from "./columns";
import * as S from "./styles";
import * as T from "./types";
import { DepositHistorySkeleton } from "./skeleton";

import { CheckboxCustom, ResultFound, Search } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const DepositHistory = ({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) => {
  const { t } = useTranslation("transfer");

  const columns = useMemo(
    () =>
      getColumns([
        t("tableHeader.date"),
        t("tableHeader.name"),
        t("tableHeader.amount"),
        t("tableHeader.fees"),
        t("tableHeader.transfer"),
      ]),
    [t]
  );

  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { deposits, loading: isTransactionsFetching } =
    useTransactionsProvider();

  const { selectedAccount } = useProfile();
  const { allAccounts } = useExtensionWallet();

  const { mainAddress } = selectedAccount;
  const { selectGetAsset } = useAssetsProvider();

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const data = useMemo(
    () =>
      deposits
        ?.filter((e) => {
          if (showSelectedCoins) {
            const assetName = selectGetAsset(e.asset)?.name;
            return assetName === selectedAsset?.name;
          }
          return e;
        })
        ?.map((e) => {
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
              { locale: "EN" }
            ),
            status: e.status,
            txn_type: e.txn_type,
            token: {
              ticker: token?.symbol,
              name: token?.name,
            },
            wallets: {
              fromWalletName: fundingWallet?.account?.meta?.name ?? "",
              fromWalletAddress: fundingWallet?.account?.address ?? "",
              toWalletType: t("trading.type"),
            },
          } as T.Props;
        }),
    [
      deposits,
      selectGetAsset,
      fundingWallet?.account?.meta?.name,
      fundingWallet?.account?.address,
      selectedAsset?.name,
      showSelectedCoins,
      t,
    ]
  );
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
            onChange={() => setShowSelectedCoins(!showSelectedCoins)}
          >
            {t("historyFilterByToken")}
          </CheckboxCustom>
        </S.TitleWrapper>
      </S.Title>
      <S.Table>
        {isTransactionsFetching ? (
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
