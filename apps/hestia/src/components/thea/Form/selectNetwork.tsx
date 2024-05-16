"use client";
import { Typography, Chain, Button, Dropdown } from "@polkadex/ux";
import { RiArrowDownSLine } from "@remixicon/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { useMeasure } from "react-use";

import { createQueryString } from "@/helpers";

const SelectNetwork = ({
  name = "",
  icon = "",
  children,
}: PropsWithChildren<{
  name?: string;
  icon?: string;
}>) => {
  const [state, setState] = useState(false);
  const [ref, bounds] = useMeasure<HTMLButtonElement>();
  return (
    <Dropdown>
      <Dropdown.Trigger asChild ref={ref}>
        <Button.Outline
          asChild
          type="button"
          appearance="quaternary"
          className="gap-1 px-2 py-7 justify-between w-full cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setState(!state);
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <Chain name={icon} />
              <Typography.Text size="lg" bold>
                {name ?? "Select"}
              </Typography.Text>
            </div>
            <RiArrowDownSLine className="w-4 h-4" />
          </div>
        </Button.Outline>
      </Dropdown.Trigger>
      <Dropdown.Content
        className="max-h-[240px] hover:overflow-auto overflow-hidden"
        style={{ minWidth: bounds.width }}
      >
        {children}
      </Dropdown.Content>
    </Dropdown>
  );
};

export const Card = ({
  icon,
  value,
  onSelect,
  side,
}: {
  icon: string;
  value: string;
  side: "to" | "from";
  onSelect: () => void;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <Dropdown.Item
      onSelect={() => {
        onSelect();
        createQueryString({
          data: [{ name: side, value }],
          pathname,
          searchParams,
          push,
        });
      }}
    >
      <div className="flex items-center gap-2 py-1 rounded-md w-full">
        <Chain name={icon} />
        <Typography.Text>{value}</Typography.Text>
      </div>
    </Dropdown.Item>
  );
};

SelectNetwork.Card = Card;
export { SelectNetwork };
