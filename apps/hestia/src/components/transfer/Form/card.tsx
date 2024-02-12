"use client";

import { Typography } from "@polkadex/ux";
import classNames from "classnames";
import { PropsWithChildren } from "react";
export const Card = ({
  label,
  title,
  active,
  children,
}: PropsWithChildren<{ label: string; title: string; active?: boolean }>) => {
  return (
    <div
      className={classNames(
        "flex-1 flex flex-col border border-x-primary border-y-transparent rounded-sm w-full transition-colors duration-300",
        active && "bg-level-1 border-secondary"
      )}
    >
      <div className="flex flex-col gap-1 p-5">
        <Typography.Text size="xs" appearance="primary">
          {label}
        </Typography.Text>
        <Typography.Text size="xl">{title}</Typography.Text>
      </div>
      {children}
    </div>
  );
};
