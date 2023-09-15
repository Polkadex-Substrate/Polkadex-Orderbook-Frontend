import { Transaction } from "@orderbook/core/providers/user/transactionsProvider";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useMemo } from "react";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";

import * as S from "./styles";
import { pendingColumns } from "./columns";
import { WithdrawHistorySkeleton } from "./skeleton";

import { EmptyData } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";

export const ClaimedTable = ({
  data,
  loading,
  hasData,
}: {
  data: Transaction[];
  loading: boolean;
  hasData: boolean;
}) => {
  const { selectedAccount } = useProfile();
  const { allAccounts } = useExtensionWallet();

  const { mainAddress } = selectedAccount;
  const { selectGetAsset } = useAssetsProvider();

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress],
  );

  const allData = useMemo(
    () =>
      data.map((e) => {
        const token = selectGetAsset(e.asset);

        return {
          ...e,
          token: {
            ticker: token?.symbol,
            name: token?.name,
          },
          wallets: {
            fromWalletName: fundingWallet?.account?.meta?.name ?? "",
            fromWalletAddress: fundingWallet?.account?.address ?? "",
            toWalletType: "Trading Account",
          },
        };
      }),
    [
      data,
      fundingWallet?.account?.address,
      fundingWallet?.account?.meta?.name,
      selectGetAsset,
    ],
  );
  const table = useReactTable({
    data: allData,
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
