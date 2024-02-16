"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import {
  AccountCard,
  Button,
  Icons,
  Popover,
  Searchable,
  Typography,
  truncateString,
} from "@polkadex/ux";
import { Fragment, useMemo, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
const accounts = [
  {
    address: "5HdqyCBVWsCWgffSNDrQ5zuBbwUQwWDLMWZCDGDsHz8vnQNM",
    name: "Polkadex account",
  },
  {
    address: "esNG3pJhD2YHXXQNmtvHEyFVovqjzD3BVuyiFqNqJmzabjo7G",
    name: "Thea account",
  },
  {
    address: "C6vwNE8FdToic5iVf3fG5h6vwNE8FdToic5iVKnqrMbDs1LJC",
    name: "Orderbook account",
  },
];
export const SelectFundingDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const ref = useRef<HTMLButtonElement>(null);
  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  const selectedValue = useMemo(
    () =>
      accounts.find((v) => v.name.toLowerCase().includes(value.toLowerCase())),
    [value]
  );

  const shortAddress = truncateString(selectedValue?.address ?? "");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger ref={ref} className="px-5 py-3 border-t border-primary">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center justify-center bg-level-2 w-6 h-6 rounded-md">
              <Icons.Wallet className="w-3 h-3 text-primary" />
            </div>
            <Typography.Text appearance={value ? "base" : "primary"}>
              {value ? (
                <Fragment>
                  <strong>{selectedValue?.name}</strong>
                  {shortAddress}
                </Fragment>
              ) : (
                "Select or enter a Polkadex address"
              )}
            </Typography.Text>
          </div>
          <Button.Solid
            appearance="secondary"
            size="xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.alert("....");
            }}
          >
            Paste
          </Button.Solid>
        </div>

        <Popover.Icon />
      </Popover.Trigger>
      <Popover.Content style={{ width }}>
        <Searchable>
          <Searchable.Input placeholder="Search item" />
          <Searchable.List>
            <Searchable.Empty>No result found</Searchable.Empty>
            <Searchable.Group heading="Suggestions">
              {accounts.map((curr) => (
                <Searchable.Item
                  key={curr.name}
                  value={curr.name}
                  onSelect={(currentValue) => {
                    setValue(() => {
                      if (!value) return curr.name;
                      return currentValue
                        .toLowerCase()
                        .includes(curr.name.toLowerCase())
                        ? ""
                        : currentValue;
                    });
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between gap-4 w-full flex-1">
                    <AccountCard
                      address={curr.address}
                      name={curr.name}
                      hoverable={false}
                    />
                    <CheckIcon
                      className={`ml-auto h-4 w-4 ${
                        value !== curr.name && "opacity-0"
                      }`}
                    />
                  </div>
                </Searchable.Item>
              ))}
            </Searchable.Group>
          </Searchable.List>
        </Searchable>
      </Popover.Content>
    </Popover>
  );
};
