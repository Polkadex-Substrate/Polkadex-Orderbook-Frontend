import { forwardRef, useEffect, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import classNames from "classnames";
import { Order } from "@orderbook/core/utils/orderbookService/types";
import { useOpenOrders } from "@orderbook/core/hooks";
import { GenericMessage, Loading, Modal, Table } from "@polkadex/ux";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  OrderCancellation,
  useOrders,
} from "@orderbook/core/providers/user/orders";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { tryUnlockTradeAccount } from "@orderbook/core/helpers";

import { columns } from "./columns";
import { ResponsiveTable } from "./responsiveTable";

import { SkeletonCollection } from "@/components/ui/ReadyToUse";
import { TablePagination } from "@/components/ui";
import { UnlockAccount } from "@/components/ui/ReadyToUse/unlockAccount";

type Props = {
  maxHeight: string;
};

const responsiveKeys = ["id", "filled", "date", "actions"];

export const OpenOrders = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight }, ref) => {
    const { width } = useWindowSize();
    const { selectedAccount } = useConnectWalletProvider();
    const { onCancelOrder: cancelOrder } = useOrders();
    const { isLoading, openOrders: allOpenOrders } = useOpenOrders();
    const [showPassword, setShowPassword] = useState(false);
    const [orderPayload, setOrderPayload] = useState<OrderCancellation | null>(
      null
    );
    const [responsiveState, setResponsiveState] = useState(false);
    const [responsiveData, setResponsiveData] = useState<Order | null>(null);

    const [isFetchingNextPage, setIsfetchingNext] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const onCancelOrder = async (payload: OrderCancellation | null) => {
      if (!payload) return;
      if (selectedAccount?.isLocked) {
        setShowPassword(true);
        setOrderPayload(payload);
      } else {
        await cancelOrder(payload);
        setOrderPayload(null);
      }
    };

    const responsiveView = useMemo(() => width <= 850, [width]);

    const openOrdersPerPage = useMemo(
      () => allOpenOrders.slice(rowsPerPage * (page - 1), rowsPerPage * page),
      [allOpenOrders, page, rowsPerPage]
    );

    const table = useReactTable({
      data: openOrdersPerPage,
      columns: columns({ onCancelOrder }),
      getCoreRowModel: getCoreRowModel(),
    });

    const onSetRowsPerPage = async (row: number) => {
      setIsfetchingNext(true);
      setRowsPerPage(row);
      setPage(1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsfetchingNext(false);
    };

    const onPrevPage = async () => {
      setIsfetchingNext(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (page > 1) setPage(page - 1);
      setIsfetchingNext(false);
    };

    const onNextPage = async () => {
      setIsfetchingNext(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (allOpenOrders.length > rowsPerPage * page) setPage(page + 1);
      setIsfetchingNext(false);
    };

    useEffect(() => {
      if (selectedAccount) tryUnlockTradeAccount(selectedAccount);
    }, [selectedAccount]);

    if (isLoading) return <SkeletonCollection rows={7} />;

    if (openOrdersPerPage?.length === 0)
      return (
        <GenericMessage
          title="No result found"
          illustration="NoResultFound"
          className="bg-level-1 border-b border-b-primary"
        />
      );

    return (
      <>
        <Modal open={showPassword} onOpenChange={setShowPassword}>
          <Modal.Content>
            <UnlockAccount
              onClose={() => setShowPassword(false)}
              onAction={async () => await onCancelOrder(orderPayload)}
              tempBrowserAccount={selectedAccount}
            />
          </Modal.Content>
        </Modal>
        <ResponsiveTable
          data={responsiveData}
          onOpenChange={setResponsiveState}
          open={responsiveState}
          onCancelOrder={onCancelOrder}
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
                                  className: "cursor-pointer",
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
              rowsPerPage={rowsPerPage}
              page={page}
              onSetRowsPerPage={onSetRowsPerPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              ref={ref}
            />
          </div>
        </div>
      </>
    );
  }
);
OpenOrders.displayName = "OpenOrders";
