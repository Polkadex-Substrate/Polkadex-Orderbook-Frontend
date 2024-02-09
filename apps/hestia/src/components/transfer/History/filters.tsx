import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, FilterGroup, Icon, Typography } from "@polkadex/ux";
import { useState } from "react";

const filters = {
  tokens: ["DOT", "ASTR"],
  status: ["Confirmed", "Pending", "Failed", "Ready"],
  from: ["Trading/Funding ", "Funding/Trading"],
};

const initialValues = {
  tokens: [],
  status: [],
  from: [],
};

export const Filters = () => {
  const [filterValues, setFilterValues] = useState<{
    tokens: typeof filters.tokens;
    status: typeof filters.status;
    from: typeof filters.from;
  }>(initialValues);

  const hasFilters = Object.values(filterValues).some(
    (value) => value.length > 0
  );

  return (
    <div className="flex items-center gap-5 justify-between  px-4 pt-2">
      <div className="flex items-center gap-4">
        <FilterGroup>
          <FilterGroup.Root>
            <FilterGroup.Trigger>
              <FilterGroup.Title>
                <FilterGroup.Icon />
                Tokens
              </FilterGroup.Title>
              <FilterGroup.Filters maxItems={1}>
                {filterValues.tokens.map((v) => (
                  <Typography.Text
                    size="xs"
                    key={v}
                    className="bg-level-1 rounded-md py-1 px-2"
                  >
                    {v}
                  </Typography.Text>
                ))}
              </FilterGroup.Filters>
            </FilterGroup.Trigger>
          </FilterGroup.Root>
          <FilterGroup.Content>
            {filters.tokens.map((v) => (
              <FilterGroup.Item
                key={v}
                checked={filterValues.tokens.includes(v)}
                onClick={() => {
                  const data = filterValues.tokens.includes(v)
                    ? [...filterValues.tokens.filter((e) => e !== v)]
                    : [...filterValues.tokens, v];
                  setFilterValues((prev) => ({
                    ...prev,
                    tokens: data,
                  }));
                }}
              >
                {v}
              </FilterGroup.Item>
            ))}
            {!!filters.tokens.length && (
              <FilterGroup.Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFilterValues((prev) => ({
                    ...prev,
                    tokens: [],
                  }));
                }}
              >
                Clear filter
              </FilterGroup.Button>
            )}
          </FilterGroup.Content>
        </FilterGroup>
        <FilterGroup>
          <FilterGroup.Root>
            <FilterGroup.Trigger>
              <FilterGroup.Title>
                <FilterGroup.Icon />
                Status
              </FilterGroup.Title>
              <FilterGroup.Filters maxItems={1}>
                {filterValues.status.map((v) => (
                  <Typography.Text
                    size="xs"
                    key={v}
                    className="bg-level-1 rounded-md py-1 px-2"
                  >
                    {v}
                  </Typography.Text>
                ))}
              </FilterGroup.Filters>
            </FilterGroup.Trigger>
          </FilterGroup.Root>
          <FilterGroup.Content>
            {filters.status.map((v) => (
              <FilterGroup.Item
                checked={filterValues.status.includes(v)}
                key={v}
                onClick={() => {
                  const data = filterValues.status.includes(v)
                    ? [...filterValues.status.filter((e) => e !== v)]
                    : [...filterValues.status, v];
                  setFilterValues((prev) => ({
                    ...prev,
                    status: data,
                  }));
                }}
              >
                {v}
              </FilterGroup.Item>
            ))}
            {!!filters.status.length && (
              <FilterGroup.Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFilterValues((prev) => ({
                    ...prev,
                    status: [],
                  }));
                }}
              >
                Clear filter
              </FilterGroup.Button>
            )}
          </FilterGroup.Content>
        </FilterGroup>
        <FilterGroup>
          <FilterGroup.Root>
            <FilterGroup.Trigger>
              <FilterGroup.Title>
                <FilterGroup.Icon />
                From/To
              </FilterGroup.Title>
              <FilterGroup.Filters maxItems={1}>
                {filterValues.from.map((v) => (
                  <Typography.Text
                    size="xs"
                    key={v}
                    className="bg-level-1 rounded-md py-1 px-2"
                  >
                    {v}
                  </Typography.Text>
                ))}
              </FilterGroup.Filters>
            </FilterGroup.Trigger>
          </FilterGroup.Root>
          <FilterGroup.Content>
            {filters.from.map((v) => (
              <FilterGroup.Item
                checked={filterValues.from.includes(v)}
                key={v}
                onClick={() => {
                  const data = filterValues.from.includes(v)
                    ? [...filterValues.from.filter((e) => e !== v)]
                    : [...filterValues.from, v];
                  setFilterValues((prev) => ({
                    ...prev,
                    from: data,
                  }));
                }}
              >
                {v}
              </FilterGroup.Item>
            ))}
            {!!filters.status.length && (
              <FilterGroup.Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFilterValues((prev) => ({
                    ...prev,
                    from: [],
                  }));
                }}
              >
                Clear filter
              </FilterGroup.Button>
            )}
          </FilterGroup.Content>
        </FilterGroup>
      </div>
      {!!hasFilters && (
        <Button.Outline size="xs" appearance="secondary" className="gap-2">
          <Icon className="w-3 h-3">
            <XMarkIcon />
          </Icon>
          <Typography.Text
            size="sm"
            onClick={() => setFilterValues(initialValues)}
          >
            Reset
          </Typography.Text>
        </Button.Outline>
      )}
    </div>
  );
};
