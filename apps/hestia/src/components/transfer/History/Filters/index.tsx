"use client";

import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Icon, Popover, Typography } from "@polkadex/ux";
import { Table } from "@tanstack/react-table";
import { Fragment, useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import classNames from "classnames";

import { useSizeProvider } from "../../provider";

import { FacetedFilter } from "./facetedFilter";

const filters = {
  status: ["Confirmed", "Pending", "Failed", "Ready"],
  from: ["Trading/Funding", "Funding/Trading"],
};

interface FiltersProps<TData> {
  table: Table<TData>;
  availableTokens: string[];
}

export const Filters = <TData,>({
  availableTokens,
  table,
}: FiltersProps<TData>) => {
  const { filtersRef } = useSizeProvider();

  const { width } = useWindowSize();
  const responsiveFilter = useMemo(() => width <= 800, [width]);

  const hasFilters = table.getState().columnFilters.length > 0;

  return (
    <div
      ref={filtersRef}
      className="flex items-center gap-5 justify-between  px-4 pt-2"
    >
      <div
        className={classNames(
          "flex items-center gap-4 flex-1",
          responsiveFilter && "justify-between"
        )}
      >
        {responsiveFilter ? (
          <>
            <Typography.Text appearance="secondary">Filters</Typography.Text>
            <Popover>
              <Popover.Trigger className="group">
                <EllipsisVerticalIcon className="w-6 h-6 text-primary group-hover:text-current transition-colors duration-300" />
              </Popover.Trigger>
              <Popover.Content className="flex flex-col gap-3 p-2">
                {table.getColumn("token") && (
                  <FacetedFilter
                    column={table.getColumn("token")}
                    title="Token"
                    values={availableTokens}
                    withoutBorder
                  />
                )}
                {table.getColumn("status") && (
                  <FacetedFilter
                    column={table.getColumn("status")}
                    title="Status"
                    values={filters.status}
                    withoutBorder
                  />
                )}
                {table.getColumn("wallets") && (
                  <FacetedFilter
                    column={table.getColumn("wallets")}
                    title="From/To"
                    values={filters.from}
                    withoutBorder
                  />
                )}
              </Popover.Content>
            </Popover>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {table.getColumn("token") && (
              <FacetedFilter
                column={table.getColumn("token")}
                title="Token"
                values={availableTokens}
              />
            )}
            {table.getColumn("status") && (
              <FacetedFilter
                column={table.getColumn("status")}
                title="Status"
                values={filters.status}
              />
            )}
            {table.getColumn("wallets") && (
              <FacetedFilter
                column={table.getColumn("wallets")}
                title="From/To"
                values={filters.from}
              />
            )}
          </div>
        )}
      </div>
      {!!hasFilters && (
        <Button.Outline size="xs" appearance="secondary" className="gap-2">
          <Icon className="w-3 h-3">
            <XMarkIcon />
          </Icon>
          <Typography.Text size="sm" onClick={() => table.resetColumnFilters()}>
            Reset
          </Typography.Text>
        </Button.Outline>
      )}
    </div>
  );
};