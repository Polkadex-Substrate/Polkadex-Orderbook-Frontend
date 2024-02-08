import { Table as PolkadexTable, Skeleton, GenericMessage } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, forwardRef, useMemo, useState } from "react";
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
import { getFundingAccountDetail } from "@orderbook/core/helpers";
import { useExtensionAccounts } from "@polkadex/react-providers";
import { intlFormat } from "date-fns";

import { DepositData, columns } from "./columns";

import { FilteredAssetProps } from "@/hooks";

export const TableDeposit = forwardRef<
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
  const { deposits, loading } = useTransactions();

  const { mainAddress } = selectedAddresses;
  const fundingWallet = useMemo(
    () => getFundingAccountDetail(mainAddress, extensionAccounts),
    [extensionAccounts, mainAddress]
  );

  const data = useMemo(
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
              name: e.asset?.name,
            },
            wallets: {
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
  const responsiveKeys = ["inOrders", "fundingAccount"];

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

  console.log(".......");

  return (
    <Fragment>
      {data.length ? (
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base min-h-40">
          <div
            className="overflow-y-hidden hover:overflow-y-auto px-3"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <PolkadexTable>
              <PolkadexTable.Header className="[&_th]:border-none">
                {table.getHeaderGroups().map((headerGroup) => (
                  <PolkadexTable.Row
                    key={headerGroup.id}
                    className="border-none"
                  >
                    {headerGroup.headers.map((header) => {
                      const getSorted = header.column.getIsSorted();
                      const isActionTab = header.id === "actions";
                      const handleSort = (): void => {
                        const isDesc = getSorted === "desc";
                        header.column.toggleSorting(!isDesc);
                      };
                      if (responsiveView && responsiveKeys.includes(header.id))
                        return null;

                      return (
                        <PolkadexTable.Head
                          key={header.id}
                          className={classNames(
                            !isActionTab && "cursor-pointer"
                          )}
                          {...(!isActionTab && { onClick: handleSort })}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {!isActionTab && <PolkadexTable.Icon />}
                        </PolkadexTable.Head>
                      );
                    })}
                  </PolkadexTable.Row>
                ))}
              </PolkadexTable.Header>
              <PolkadexTable.Body className="[&_tr]:border-none border-none">
                {table.getRowModel().rows.map((row) => (
                  <PolkadexTable.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      if (
                        responsiveView &&
                        responsiveKeys.includes(cell.column.id)
                      )
                        return null;
                      return (
                        <PolkadexTable.Cell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </PolkadexTable.Cell>
                      );
                    })}
                  </PolkadexTable.Row>
                ))}
              </PolkadexTable.Body>
              <PolkadexTable.Caption>
                Transfer history table
              </PolkadexTable.Caption>
            </PolkadexTable>
          </div>
        </div>
      ) : (
        <GenericMessage
          title="No result found"
          illustration="NoResultFound"
          className="bg-level-1"
        />
      )}
    </Fragment>
  );
});
TableDeposit.displayName = "TableDeposit";
