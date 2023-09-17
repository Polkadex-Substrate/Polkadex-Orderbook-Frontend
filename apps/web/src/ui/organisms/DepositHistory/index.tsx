import {
  flexRender,
  getCoreRowModel,
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

import { columns } from "./columns";
import * as S from "./styles";
import * as T from "./types";
import { DepositHistorySkeleton } from "./skeleton";

import { CheckboxCustom, EmptyData, ResultFound, Search } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const DepositHistory = ({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) => {
  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(true);

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

            console.log(assetName, selectedAsset?.name);
            return assetName === selectedAsset?.name;
          }
          return e;
        })
        ?.map((e) => {
          console.log(e);
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
              toWalletType: "Trading Account",
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
    ]
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
          <CheckboxCustom
            labelProps={{ style: { whiteSpace: "nowrap" } }}
            checked={showSelectedCoins}
            onChange={() => setShowSelectedCoins(!showSelectedCoins)}
          >
            Show only selected token
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
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
      </S.Table>
    </S.Wrapper>
  );
};
