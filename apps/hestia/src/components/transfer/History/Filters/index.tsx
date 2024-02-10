"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Icon, Input, Typography } from "@polkadex/ux";
import { Table } from "@tanstack/react-table";

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
  const hasFilters = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center gap-5 justify-between  px-4 pt-2">
      <div className="flex items-center gap-4">
        <Input.Search
          value={(table.getColumn("token")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("token")?.setFilterValue(e.target.value)
          }
          placeholder="Search by name or ticker"
        />

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
