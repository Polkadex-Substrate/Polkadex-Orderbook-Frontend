"use client";

import { Table, GenericMessage } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import classNames from "classnames";
import {
  useAssets,
  useTransactions,
  useTransferHistory,
} from "@orderbook/core/hooks";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  TransferHistory,
  getChainFromTicker,
  getFundingAccountDetail,
} from "@orderbook/core/helpers";
import { useExtensionAccounts } from "@polkadex/react-providers";

import { useSizeProvider } from "../provider";

import { DepositData, columns } from "./columns";
import { Filters } from "./Filters";
import { ResponsiveTable } from "./responsiveTable";

import { SkeletonCollection } from "@/components/ui/ReadyToUse";
import { defaultConfig } from "@/config";

const responsiveKeys = ["wallets", "fees", "date"];
const actionKeys = ["token", "amount", "date"];

export const filters = {
  status: ["Confirmed", "Pending", "Failed", "Ready"],
  from: ["Trading/Funding ", "Funding/Trading"],
};

export const History = () => {
  const { tableMaxHeight } = useSizeProvider();

  const { width } = useWindowSize();

  const responsiveView = useMemo(() => width <= 1040, [width]);

  const [responsiveState, setResponsiveState] = useState(false);
  const [responsiveData, setResponsiveData] = useState<DepositData | null>(
    null
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { selectedAddresses } = useProfile();
  const { extensionAccounts } = useExtensionAccounts();
  const { deposits, loading, allWithdrawals } = useTransactions();
  // const { selectGetAsset } = useAssets();

  const { mainAddress } = selectedAddresses;

  // const {
  //   data: transferSubscanData,
  //   isLoading,
  //   refetch,
  // } = useTransferHistory(
  //   defaultConfig.subscanApi,
  //   mainAddress,
  //   mainAddress?.length > 0
  // );

  const fundingWallet = useMemo(
    () => getFundingAccountDetail(mainAddress, extensionAccounts),
    [extensionAccounts, mainAddress]
  );

  // const transferSubscanTransactions = useMemo(
  //   () =>
  //     transferSubscanData?.pages?.[0]?.transfers?.map((e) => {
  //       const tokenId = e.asset_unique_id.split("standard_assets/").join("");
  //       const token = selectGetAsset(tokenId);
  //       const fromData = extensionAccounts?.find(
  //         (from) => from.address === e.from
  //       );
  //       const toData = extensionAccounts?.find(
  //         (wallet) => wallet.address === e.to
  //       );

  //       return {
  //         hash: e.hash,
  //         amount: e.amount,
  //         time: e.block_timestamp * 1000,
  //         token: {
  //           ticker: token?.ticker,
  //           name: token?.name,
  //         },
  //         wallets: {
  //           fromWalletName: fromData?.name ?? "Custom wallet",
  //           fromWalletAddress: e.from,
  //           toWalletName: toData?.name ?? "Custom wallet",
  //           toWalletAddress: e.to,
  //         },
  //       };
  //     }),
  //   [transferSubscanData?.pages, selectGetAsset, extensionAccounts]
  // );

  const depositsTransactions = useMemo(
    () =>
      deposits?.map((e) => {
        return {
          ...e,
          main_account: mainAddress,
          timestamp: e.timestamp,
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
    [deposits, fundingWallet?.name, fundingWallet?.address, mainAddress]
  );

  const withdrawalsTransactions = useMemo(
    () =>
      allWithdrawals
        ?.map((e) => {
          const token = e.asset;
          return {
            ...e,
            timestamp: e.timestamp,
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
        ?.flatMap((withdrawal) => [withdrawal]),
    [allWithdrawals, fundingWallet?.address, fundingWallet?.name]
  );

  const data = useMemo(
    () =>
      [...depositsTransactions, ...withdrawalsTransactions]?.sort((a, b) =>
        a.timestamp > b.timestamp ? -1 : 1
      ),
    [depositsTransactions, withdrawalsTransactions]
  );

  const table = useReactTable({
    data,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const availableTokens = useMemo(() => {
    const tickersSet = new Set(
      [...withdrawalsTransactions, ...depositsTransactions].map(
        (v) => v.token.ticker
      )
    );
    return Array.from(tickersSet);
  }, [withdrawalsTransactions, depositsTransactions]);

  useEffect(() => {
    if (!responsiveView && !!responsiveState) {
      setResponsiveState(false);
      setResponsiveData(null);
    }
  }, [responsiveState, responsiveView]);

  if (loading) return <SkeletonCollection />;
  return (
    <Fragment>
      <ResponsiveTable
        data={responsiveData}
        onOpenChange={setResponsiveState}
        open={responsiveState}
      />
      <div className="flex-1 flex flex-col">
        <Filters availableTokens={availableTokens} table={table} />
        {data.length ? (
          <div className="flex-1 flex flex-col justify-between border-b border-secondary-base min-h-40">
            <div
              className="overflow-y-hidden hover:overflow-y-auto px-3"
              style={{
                maxHeight: tableMaxHeight,
                scrollbarGutter: "stable",
                minHeight: "200px",
              }}
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
                        if (
                          responsiveView &&
                          responsiveKeys.includes(header.id)
                        )
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

                        const responsiveProps = responsiveView
                          ? {
                              className: "cursor-pointer",
                              onClick: () => {
                                setResponsiveState(true);
                                setResponsiveData(row.original);
                              },
                            }
                          : {};
                        return (
                          <Table.Cell key={cell.id} {...responsiveProps}>
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
            className="bg-level-1 border-y border-y-primary"
          />
        )}
      </div>
    </Fragment>
  );
};
