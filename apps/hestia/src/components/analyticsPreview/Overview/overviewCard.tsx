import { Typography } from "@polkadex/ux";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";

export const OverviewCard = ({
  label,
  side = "vertical",
  children,
}: PropsWithChildren<{ label: string; side?: "horizontal" | "vertical" }>) => {
  const isString = typeof children === "string";
  return (
    <div
      className={classNames(
        "flex",
        side === "horizontal"
          ? "justify-between items-center gap-6 flex-row-reverse"
          : "flex-col gap-1"
      )}
    >
      {isString ? <Typography.Text>{children}</Typography.Text> : children}
      <Typography.Text appearance="primary" size="xs">
        {label}
      </Typography.Text>
    </div>
  );
};
