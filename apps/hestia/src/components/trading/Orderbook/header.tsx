"use client";

import { Dropdown, Typography } from "@polkadex/ux";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { FilterCard } from "./filterCard";

type DecimalSize = { size: number; length: number };
type Props = {
  selectedDecimal: number;
  decimalSizes: DecimalSize[];
  onChangeDecimal: (v: DecimalSize) => void;
  filterBy: string;
  onChangeFilterBy: (v: string) => void;
};
export const Header = ({
  selectedDecimal,
  decimalSizes,
  onChangeDecimal,
  filterBy,
  onChangeFilterBy,
}: Props) => {
  return (
    <div className="flex items-center justify-between p-2">
      <Typography.Heading
        type="h3"
        className="text-sm font-semibold text-primary"
      >
        Orderbook
      </Typography.Heading>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <FilterCard
            icon="Ask"
            active={filterBy === "OrderAsc"}
            action={() => onChangeFilterBy("OrderAsc")}
          />
          <FilterCard
            icon="AskAndBid"
            active={filterBy === "Order"}
            action={() => onChangeFilterBy("Order")}
          />
          <FilterCard
            icon="Bid"
            active={filterBy === "OrderDesc"}
            action={() => onChangeFilterBy("OrderDesc")}
          />
        </div>
        <Dropdown>
          <Dropdown.Trigger className="items-center inline-flex opacity-50 transition-opacity ease-out duration-300 hover:opacity-100 w-full">
            <Typography.Text>{selectedDecimal}</Typography.Text>
            <ChevronDownIcon
              className="ml-1 h-3 w-3 text-gray-500"
              aria-hidden="true"
            />
          </Dropdown.Trigger>
          <Dropdown.Content>
            {decimalSizes
              .map((v) => v.size.toString())
              .map((value, i) => (
                <Dropdown.Item
                  key={i}
                  onClick={() =>
                    onChangeDecimal(
                      decimalSizes.find(
                        (v) => v.size.toString() === value
                      ) as DecimalSize
                    )
                  }
                >
                  {value}
                </Dropdown.Item>
              ))}
          </Dropdown.Content>
        </Dropdown>
      </div>
    </div>
  );
};
