"use client";

import { FilterGroup, Typography } from "@polkadex/ux";
import { Column } from "@tanstack/react-table";

interface FacetedFilterProps<TData, TValue> {
  column: Column<TData, TValue> | undefined;
  title?: string;
  values: string[];
}
export const FacetedFilter = <TData, TValue>({
  column,
  title,
  values,
}: FacetedFilterProps<TData, TValue>) => {
  // Missing feature FilterGroup
  // const facets = column?.getFacetedUniqueValues();
  // facets?.get(v)

  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <FilterGroup>
      <FilterGroup.Root>
        <FilterGroup.Trigger>
          <FilterGroup.Title>
            <FilterGroup.Icon />
            {title}
          </FilterGroup.Title>
          <FilterGroup.Filters maxItems={1}>
            {values
              ?.filter((value) => selectedValues.has(value))
              .map((v) => {
                return (
                  <Typography.Text
                    key={v}
                    size="xs"
                    className="bg-level-1 rounded-md py-1 px-2"
                  >
                    {v}
                  </Typography.Text>
                );
              })}
          </FilterGroup.Filters>
        </FilterGroup.Trigger>
      </FilterGroup.Root>
      <FilterGroup.Content>
        {values.map((v) => {
          const isSelected = selectedValues.has(v);
          return (
            <FilterGroup.Item
              key={v}
              checked={isSelected}
              onClick={() => {
                if (isSelected) selectedValues.delete(v);
                else selectedValues.add(v);
                column?.setFilterValue(
                  selectedValues.size ? Array.from(selectedValues) : undefined
                );
              }}
            >
              {v}
            </FilterGroup.Item>
          );
        })}
        {!!selectedValues.size && (
          <FilterGroup.Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              column?.setFilterValue(undefined);
            }}
          >
            Clear filter
          </FilterGroup.Button>
        )}
      </FilterGroup.Content>
    </FilterGroup>
  );
};
