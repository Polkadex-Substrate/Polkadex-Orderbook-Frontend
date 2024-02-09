import { Table, Skeleton, GenericMessage } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { forwardRef, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useTransactions } from "@orderbook/core/hooks";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  getChainFromTicker,
  getFundingAccountDetail,
} from "@orderbook/core/helpers";
import { useExtensionAccounts } from "@polkadex/react-providers";
import { intlFormat } from "date-fns";

import { DepositData, columns } from "./columns";
import { Filters } from "./filters";

import { FilteredAssetProps } from "@/hooks";
import { BatchCard } from "@/components/ui/ReadyToUse";

const responsiveKeys = ["wallets", "fees", "date"];
const actionKeys = ["token", "amount", "date"];

export const History = forwardRef<
  HTMLDivElement,
  { maxHeight: string; selectedAsset: FilteredAssetProps }
>(({ maxHeight, selectedAsset }) => {
  const { width } = useWindowSize();
  const responsiveView = useMemo(() => width <= 800, [width]);

  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  const { selectedAddresses } = useProfile();
  const { extensionAccounts } = useExtensionAccounts();
  const { deposits, loading, allWithdrawals, readyWithdrawals } =
    useTransactions();

  const { mainAddress } = selectedAddresses;
  const fundingWallet = useMemo(
    () => getFundingAccountDetail(mainAddress, extensionAccounts),
    [extensionAccounts, mainAddress]
  );

  const depositsTransactions = useMemo(
    () =>
      deposits
        ?.filter((e) => {
          const isMatch =
            e.asset.name.toLowerCase().includes(search) ||
            e.asset.ticker.toLowerCase().includes(search);
          if (isMatch) {
            if (showSelectedCoins) {
              const assetName = e.asset.name;
              return assetName === selectedAsset?.name;
            }
            return e;
          }
          return null;
        })
        ?.map((e) => {
          return {
            ...e,
            main_account: mainAddress,
            timestamp: intlFormat(
              new Date(e.timestamp),
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
              ticker: e.asset?.ticker,
              name:
                getChainFromTicker(e.asset?.ticker as string) ?? e?.asset.name,
            },
            wallets: {
              fromWalletType: "Funding Account",
              fromWalletName: fundingWallet?.name ?? "",
              fromWalletAddress: fundingWallet?.address ?? "",
              toWalletType: "Trading Account",
            },
          } as DepositData;
        }),
    [
      deposits,
      fundingWallet?.name,
      fundingWallet?.address,
      selectedAsset?.name,
      showSelectedCoins,
      mainAddress,
      search,
    ]
  );

  const withdrawalsTransactions = useMemo(
    () =>
      allWithdrawals
        ?.filter(
          (txn) =>
            txn.asset.name.toLowerCase().includes(search) ||
            txn.asset.ticker.toLowerCase().includes(search)
        )
        ?.map((e) => {
          const token = e.asset;
          return {
            ...e,
            timestamp: intlFormat(
              new Date(e.timestamp),
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
              ticker: token?.ticker,
              name: getChainFromTicker(token?.name as string) ?? token?.name,
            },
            wallets: {
              fromWalletType: "Trading Account",
              fromWalletName: fundingWallet?.name ?? "",
              fromWalletAddress: fundingWallet?.address ?? "",
              toWalletType: "Funding Account",
            },
          };
        })
        ?.flatMap((withdrawal) => {
          if (showSelectedCoins) {
            const assetName = withdrawal.token?.name;
            return assetName === selectedAsset?.name ? [withdrawal] : [];
          }
          return [withdrawal];
        }),
    [
      allWithdrawals,
      showSelectedCoins,
      selectedAsset?.name,
      fundingWallet?.address,
      fundingWallet?.name,
      search,
    ]
  );

  const data = useMemo(
    () => [...depositsTransactions, ...withdrawalsTransactions],
    [depositsTransactions, withdrawalsTransactions]
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

  if (loading)
    return (
      <div className="flex-1 flex flex-col gap-3 p-3">
        {new Array(8).fill("").map((_, i) => (
          <Skeleton key={i} loading className="h-5" />
        ))}
      </div>
    );
  return (
    <div className="flex-1 flex flex-col">
      <Filters />
      {data.length ? (
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base min-h-40">
          <div
            className="overflow-y-hidden hover:overflow-y-auto px-3"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <Table>
              <Table.Header className="[&_th]:border-none">
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.Row
                    key={headerGroup.id}
                    className="border-none sticky top-0 bg-backgroundBase"
                  >
                    {headerGroup.headers.map((header) => {
                      const getSorted = header.column.getIsSorted();
                      const isActionTab = actionKeys.includes(header.id);
                      const handleSort = (): void => {
                        const isDesc = getSorted === "desc";
                        header.column.toggleSorting(!isDesc);
                      };
                      if (responsiveView && responsiveKeys.includes(header.id))
                        return null;

                      return (
                        <Table.Head
                          key={header.id}
                          className={classNames(
                            !isActionTab && "cursor-pointer"
                          )}
                          {...(isActionTab && { onClick: handleSort })}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {isActionTab && <Table.Icon />}
                        </Table.Head>
                      );
                    })}
                  </Table.Row>
                ))}
              </Table.Header>
              <Table.Body className="[&_tr]:border-none border-none">
                {table.getRowModel().rows.map((row) => (
                  <Table.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      if (
                        responsiveView &&
                        responsiveKeys.includes(cell.column.id)
                      )
                        return null;
                      return (
                        <Table.Cell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Caption>Transfer history table</Table.Caption>
            </Table>
          </div>
        </div>
      ) : (
        <GenericMessage
          title="No result found"
          illustration="NoResultFound"
          className="bg-level-1"
        />
      )}
    </div>
  );
});
History.displayName = "History";
