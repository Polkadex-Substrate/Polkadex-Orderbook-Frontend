import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useMarkets } from "@orderbook/core/index";
import {
  Skeleton,
  Illustrations,
  GenericMessage,
  Table as PolkadexTable,
} from "@polkadex/ux";
import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";

import { columns } from "./columns";
import { Tickers } from "./tickers";
import { Filters } from "./filters";

const responsiveKeys = ["volume24h"];
const actionKeys = ["volume24h", "price", "change"];

export const Markets = ({ market }: { market: string }) => {
  const { width } = useWindowSize();
  const {
    marketTokens,
    marketTickers,
    handleChangeMarket,
    handleFieldChange,
    handleMarketsTabsSelected,
    handleSelectedFavorite,
    fieldValue,
    handleShowFavourite,
    id,
    list,
    loading: loadingMarkets,
    tickerLoading,
  } = useMarkets(market);

  const hasMarkets = !!list?.length;
  const table = useReactTable({
    data: marketTokens,
    columns: columns({ onChangeFavourite: handleSelectedFavorite }),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const messageProps: {
    title: string;
    illustration: keyof typeof Illustrations;
  } = !hasMarkets
    ? { title: "No markets", illustration: "NoData" }
    : { title: "No result found", illustration: "NoResultFound" };

  const responsiveView = useMemo(() => width >= 1280 && width <= 1730, [width]);
  const loading = useMemo(
    () => loadingMarkets || tickerLoading || !hasMarkets,
    [loadingMarkets, hasMarkets, tickerLoading]
  );

  return (
    <div className="flex-1 h-full grid grid-rows-[auto,1fr,auto] overflow-hidden">
      <Filters
        onSearch={handleFieldChange}
        searchField={fieldValue.searchFieldValue}
        onChangeFavorite={handleShowFavourite}
        activeFavorite={fieldValue.showFavourite}
      />
      <Skeleton loading={loading} className="h-full">
        <div className="flex flex-col flex-1 border-t border-t-primary overflow-auto scrollbar-hide max-[955px]:max-h-max max-xl:max-h-[200px]">
          {!hasMarkets || !marketTokens.length ? (
            <GenericMessage {...messageProps} />
          ) : (
            <PolkadexTable className="w-full z-[2]">
              <PolkadexTable.Header className="sticky top-0 bg-level-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <PolkadexTable.Row key={headerGroup.id}>
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
                        <PolkadexTable.Head
                          className={classNames(
                            header.id === "coin" ? "text-left" : "text-right",
                            "px-2 text-primary font-medium text-xs py-2 whitespace-nowrap",
                            isActionTab && "cursor-pointer"
                          )}
                          key={header.id}
                          {...(isActionTab && { onClick: handleSort })}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {isActionTab && <PolkadexTable.Icon />}
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
                      className="hover:bg-level-1 cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell, i) => {
                        const firstCol = i === 0;
                        const lastCol = i === 2;
                        const active = row.original.id === id;

                        if (
                          responsiveView &&
                          responsiveKeys.includes(cell.column.id)
                        )
                          return null;

                        return (
                          <PolkadexTable.Cell
                            className={classNames(
                              firstCol ? "text-left" : "text-right",
                              firstCol && "font-semibold",
                              lastCol && "text-primary",
                              active && "bg-level-1",
                              "px-2 py-1  text-xs"
                            )}
                            key={cell.id}
                            role="button"
                            onClick={() =>
                              handleChangeMarket(row.original.name, () => {})
                            }
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
          )}
        </div>
      </Skeleton>

      <Tickers
        tickers={marketTickers}
        activeTicker={fieldValue.marketsTabsSelected}
        onChangeTicker={handleMarketsTabsSelected}
        loading={loading}
      />
    </div>
  );
};
