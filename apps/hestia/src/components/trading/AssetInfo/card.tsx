import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Typography, Dropdown, Skeleton } from "@polkadex/ux";

const Single = ({
  label,
  color,
  loading = false,
  children,
}: PropsWithChildren<{
  label: string;
  color?: "red" | "green";
  loading?: boolean;
}>) => {
  const selectedColor = {
    initial: "text-current",
    red: "text-danger-base",
    green: "text-success-base",
  };
  return (
    <div className="flex flex-col gap-1 place-content-center flex-1">
      <Skeleton loading={!!loading} className="min-h-[1rem]">
        <Typography.Text
          size="sm"
          bold
          className={classNames(
            color && selectedColor[color],
            "leading-none whitespace-nowrap"
          )}
        >
          {children}
        </Typography.Text>
      </Skeleton>

      <Typography.Text
        size="xs"
        appearance="primary"
        className="leading-none whitespace-nowrap"
      >
        {label}
      </Typography.Text>
    </div>
  );
};

const WithDropdown = ({
  label,
  items,
  onChange,
  selected,
  children,
  loading,
}: PropsWithChildren<{
  label: string;
  selected: string;
  items: string[];
  onChange: (e: string) => void;
  loading?: boolean;
}>) => {
  return (
    <div className="flex flex-1 flex-col gap-0.5 place-content-center">
      <Skeleton loading={!!loading} className="min-h-[1rem]">
        <Typography.Text bold className="whitespace-nowrap">
          {children}
        </Typography.Text>
      </Skeleton>
      <div className="flex gap-1 items-center leading-none whitespace-nowrap">
        <Typography.Text appearance="primary" size="xs">
          {label}
        </Typography.Text>
        <Skeleton loading={!!loading}>
          <Dropdown>
            <Dropdown.Trigger className="bg-level-4 px-1 py-0.5 rounded gap-1">
              <Typography.Text size="xs">{selected}</Typography.Text>
              <Dropdown.Icon />
            </Dropdown.Trigger>
            <Dropdown.Content>
              {items.map((value, i) => (
                <Dropdown.Item onClick={() => onChange(value)} key={i}>
                  <Typography.Text>{value}</Typography.Text>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </Skeleton>
      </div>
    </div>
  );
};

export const Card = {
  Single,
  WithDropdown,
};
