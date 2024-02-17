import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useOrderHistory } from "@orderbook/core/hooks";
import { forwardRef, useMemo, useState } from "react";
import { GenericMessage, Loading, Table } from "@polkadex/ux";
import classNames from "classnames";
import { useWindowSize } from "usehooks-ts";

import { columns } from "./columns";

import { SkeletonCollection } from "@/components/ui/ReadyToUse";

type Props = {
  maxHeight: string;
};

const responsiveKeys = ["id", "filled", "date", "status", "fee"];

export const OrderHistory = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight }, ref) => {
    const { width } = useWindowSize();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const responsiveView = useMemo(() => width <= 850, [width]);

    const {
      orderHistory: allOrderHistory,
      isLoading,
      isFetchingNextPage,
    } = useOrderHistory();

    const orderHistoryPerPage = useMemo(
      () => allOrderHistory.slice(rowsPerPage * (page - 1), rowsPerPage * page),
      [allOrderHistory, page, rowsPerPage]
    );

    const table = useReactTable({
      data: orderHistoryPerPage,
      columns: columns(),
      getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <SkeletonCollection rows={8} />;

    if (orderHistoryPerPage?.length === 0)
      return (
        <GenericMessage
          title="No results found"
          illustration="NoResultFound"
          className="bg-level-1 border-b border-b-primary"
        />
      );

    return (
      <>
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
                                    // setResponsiveState(true);
                                    // setResponsiveData(row.original);
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
            {/* <TablePagination
              totalResultCount={allOpenOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onSetRowsPerPage={onSetRowsPerPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              prevButtonDisabled={prevButtonDisabled}
              nextButtonDisabled={nextButtonDisabled}
              ref={ref}
            /> */}
          </div>
        </div>
      </>
    );
  }
);

OrderHistory.displayName = "OrderHistory";
