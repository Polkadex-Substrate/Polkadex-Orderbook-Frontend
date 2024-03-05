import { Table as PolkadexTable, GenericMessage } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, forwardRef, useEffect, useMemo, useState } from "react";
import { LmpMarketConfig, useLmpMarkets } from "@orderbook/core/hooks";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import { columns } from "./columns";
import { ResponsiveData } from "./responsiveData";

import { TablePagination } from "@/components/ui";
import { SkeletonCollection } from "@/components/ui/ReadyToUse";

const responsiveKeys = ["volume24h"];

export const Table = forwardRef<HTMLDivElement, { maxHeight: string }>(
  ({ maxHeight }, ref) => {
    const [responsiveState, setResponsiveState] = useState(false);
    const [responsiveData, setResponsiveData] =
      useState<LmpMarketConfig | null>(null);
    const { width } = useWindowSize();
    const responsiveView = useMemo(() => width <= 500, [width]);

    const { markets, isLoading } = useLmpMarkets();

    const table = useReactTable({
      data: markets as LmpMarketConfig[],
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

    if (markets?.length === 0)
      return (
        <GenericMessage
          title="No results found"
          illustration="NoResultFound"
          className="bg-level-1 border-b border-b-primary"
        />
      );

    return (
      <Fragment>
        <ResponsiveData
          data={responsiveData}
          onOpenChange={setResponsiveState}
          open={responsiveState}
        />
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base">
          <div
            className="overflow-y-hidden hover:overflow-y-auto mt-1"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <PolkadexTable>
              <PolkadexTable.Header className="sticky top-0 bg-backgroundBase">
                {table.getHeaderGroups().map((headerGroup) => (
                  <PolkadexTable.Row key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      if (responsiveView && responsiveKeys.includes(header.id))
                        return null;

                      return (
                        <PolkadexTable.Head
                          className={classNames("px-2 text-primary text-xs")}
                          key={header.id}
                          align={`${header.index ? "right" : "left"}`}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </PolkadexTable.Head>
                      );
                    })}
                  </PolkadexTable.Row>
                ))}
              </PolkadexTable.Header>
              <PolkadexTable.Body>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <PolkadexTable.Row
                      key={row.id}
                      className={classNames("hover:bg-level-0 cursor-pointer")}
                    >
                      {row.getVisibleCells().map((cell) => {
                        if (
                          responsiveView &&
                          responsiveKeys.includes(cell.column.id)
                        )
                          return null;

                        const responsiveProps = responsiveView
                          ? {
                              onClick: () => {
                                setResponsiveState(true);
                                setResponsiveData(row.original);
                              },
                            }
                          : {};

                        return (
                          <PolkadexTable.Cell
                            key={cell.id}
                            align="right"
                            className={classNames("!py-2")}
                            {...responsiveProps}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </PolkadexTable.Cell>
                        );
                      })}
                    </PolkadexTable.Row>
                  );
                })}
              </PolkadexTable.Body>
            </PolkadexTable>
          </div>
          <TablePagination
            ref={ref}
            page={1}
            nextButtonDisabled
            prevButtonDisabled
          />
        </div>
      </Fragment>
    );
  }
);

Table.displayName = "Table";
