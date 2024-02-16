"use client";

import { Dropdown, Typography } from "@polkadex/ux";
import classNames from "classnames";
import { Dispatch, PropsWithChildren, SetStateAction, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
export const Card = ({
  label,
  title,
  active,
  children,
  dropdown,
  onChangeDirection,
}: PropsWithChildren<{
  label: string;
  title: string;
  active?: boolean;
  dropdown?: boolean;
  onChangeDirection?: Dispatch<SetStateAction<boolean>>;
}>) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });
  return (
    <div
      className={classNames(
        "flex-1 flex flex-col border border-x-primary border-y-transparent rounded-sm w-full transition-colors duration-300",
        active && "bg-level-1 border-secondary"
      )}
    >
      <div ref={ref} className="flex flex-col gap-1 p-5">
        <Typography.Text size="xs" appearance="primary">
          {label}
        </Typography.Text>
        {dropdown ? (
          <Dropdown>
            <Dropdown.Trigger>
              <Typography.Text size="xl">{title}</Typography.Text>
              <Dropdown.Icon />
            </Dropdown.Trigger>
            <Dropdown.Content style={{ width }}>
              <Dropdown.Item onClick={() => onChangeDirection?.(false)}>
                Trading Account
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onChangeDirection?.(true)}>
                Another Funding Account
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        ) : (
          <Typography.Text size="xl">{title}</Typography.Text>
        )}
      </div>
      {children}
    </div>
  );
};
