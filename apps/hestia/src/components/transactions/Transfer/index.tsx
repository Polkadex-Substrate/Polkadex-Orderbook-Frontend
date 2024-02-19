import { useAssets, useTransferHistory } from "@orderbook/core/hooks";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { PALLET_ADDRESS } from "@orderbook/core/constants";
import { useExtensionAccounts } from "@polkadex/react-providers";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GenericMessage, Loading, Table } from "@polkadex/ux";
import classNames from "classnames";
import { useWindowSize } from "usehooks-ts";

import { TransferHistoryData, columns } from "./columns";
import ResponsiveTable from "./responsiveTable";

import { defaultConfig } from "@/config";
import { SkeletonCollection } from "@/components/ui/ReadyToUse";
import { TablePagination } from "@/components/ui";

type Props = { maxHeight: string };

const responsiveKeys = ["fees", "wallets"];

export const TransferHistory = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight }, ref) => {
    const { width } = useWindowSize();

    const [responsiveState, setResponsiveState] = useState(false);
    const [responsiveData, setResponsiveData] =
      useState<TransferHistoryData | null>(null);
    const responsiveView = useMemo(() => width <= 850, [width]);

    const {
      selectedAddresses: { mainAddress },
    } = useProfile();
    const { selectGetAsset, assets } = useAssets();
    const { extensionAccounts } = useExtensionAccounts();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const { data, isLoading, isFetchingNextPage, fetchNextPage } =
      useTransferHistory(
        defaultConfig.subscanApi,
        mainAddress,
        mainAddress?.length > 0 && assets?.length > 0,
        rowsPerPage
      );
    const transactions = useMemo(
      () => data?.pages?.at(page - 1)?.transfers || [],
      [data?.pages, page]
    );
    const totalResultsCount = useMemo(
      () => data?.pages?.at(0)?.count || 0,
      [data?.pages]
    );

    const transactionsPerPage = useMemo(
      () =>
        transactions.map((e) => {
          const tokenId = e.asset_unique_id.split("standard_assets/").join("");
          const token = selectGetAsset(tokenId);
          const fromData = extensionAccounts?.find(
            (from) => from.address === e.from
          );
          const toData = extensionAccounts?.find(
            (wallet) => wallet.address === e.to
          );

          let fromWalletType;
          let toWalletType;
          if (e.from !== PALLET_ADDRESS && e.to !== PALLET_ADDRESS) {
            fromWalletType = fromData?.name ?? "Custom Wallet";
            toWalletType = toData?.name ?? "Custom Wallet";
          } else {
            fromWalletType =
              e.from === PALLET_ADDRESS ? "Trading Account" : "Funding Account";
            toWalletType =
              e.to === PALLET_ADDRESS ? "Trading Account" : "Funding Account";
          }

          return {
            hash: e.hash,
            amount: e.amount,
            fee: (+e.fee / Math.pow(10, 12)).toFixed(3),
            time: new Date(e.block_timestamp * 1000),
            token: {
              ticker: token?.ticker,
              name: token?.name,
            },
            wallets: {
              fromType: fromWalletType,
              fromAddress: e.from,
              fromName: fromData?.name || "Custom Wallet",
              toType: toWalletType,
              toAddress: e.to,
              toName: toData?.name || "Custom Wallet",
            },
          } as TransferHistoryData;
        }),
      [extensionAccounts, selectGetAsset, transactions]
    );

    const prevButtonDisabled = useMemo(() => page === 1, [page]);
    const nextButtonDisabled = useMemo(() => {
      const totalResultsForPreviousPages = rowsPerPage * (page - 1);
      const totalResultsForCurrentPage = transactionsPerPage?.length;
      return (
        totalResultsCount <=
        totalResultsForPreviousPages + totalResultsForCurrentPage
      );
    }, [page, rowsPerPage, totalResultsCount, transactionsPerPage?.length]);

    const onSetRowsPerPage = (row: number) => {
      setPage(1);
      setRowsPerPage(row);
    };

    const onPrevPage = () => {
      if (prevButtonDisabled) return;
      setPage(page - 1);
    };

    const onNextPage = async () => {
      if (nextButtonDisabled) return;
      await fetchNextPage();
      setPage(page + 1);
    };

    const table = useReactTable({
      data: transactionsPerPage,
      columns: columns(),
      getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
      if (!responsiveView && !!responsiveState) {
        setResponsiveState(false);
        setResponsiveData(null);
      }
    }, [responsiveState, responsiveView]);

    if (isLoading) return <SkeletonCollection rows={8} />;

    if (transactionsPerPage?.length === 0)
      return (
        <GenericMessage
          title="No results found"
          illustration="NoResultFound"
          className="bg-level-1 border-b border-b-primary"
        />
      );

    return (
      <>
        <ResponsiveTable
          data={responsiveData}
          onOpenChange={setResponsiveState}
          open={responsiveState}
        />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col justify-between border-b border-secondary-base [&_svg]:scale-150">
            <Loading.Spinner active={isFetchingNextPage}>
              <div
                className="overflow-y-hidden hover:overflow-y-auto px-3"
                style={{ maxHeight, scrollbarGutter: "stable" }}
              >
                <Table
                  className={classNames(
                    "w-full",
                    isFetchingNextPage && "opacity-50"
                  )}
                  even
                >
                  <Table.Header className="sticky top-0 bg-backgroundBase">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <Table.Row key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          if (
                            responsiveView &&
                            responsiveKeys.includes(header.id)
                          )
                            return null;

                          return (
                            <Table.Head
                              className={classNames(
                                "px-2 text-primary font-semibold text-xs"
                              )}
                              key={header.id}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </Table.Head>
                          );
                        })}
                      </Table.Row>
                    ))}
                  </Table.Header>
                  <Table.Body>
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <Table.Row
                          key={row.id}
                          className={classNames(
                            "hover:bg-level-1 cursor-pointer"
                          )}
                        >
                          {row.getVisibleCells().map((cell) => {
                            if (
                              responsiveView &&
                              responsiveKeys.includes(cell.column.id)
                            )
                              return null;

                            const responsiveProps = responsiveView
                              ? {
                                  className: "cursor-pointer py-4",
                                  onClick: () => {
                                    setResponsiveState(true);
                                    setResponsiveData(row.original);
                                  },
                                }
                              : {};

                            return (
                              <Table.Cell
                                key={cell.id}
                                className={classNames("px-2 py-4 text-xs")}
                                {...responsiveProps}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </Table.Cell>
                            );
                          })}
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </Loading.Spinner>
            <TablePagination
              totalResultCount={totalResultsCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onSetRowsPerPage={onSetRowsPerPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              prevButtonDisabled={prevButtonDisabled}
              nextButtonDisabled={nextButtonDisabled}
              ref={ref}
            />
          </div>
        </div>
      </>
    );
  }
);

TransferHistory.displayName = "TransferHistory";
