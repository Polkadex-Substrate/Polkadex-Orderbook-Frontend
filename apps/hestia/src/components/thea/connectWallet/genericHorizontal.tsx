"use client";

import { ComponentProps } from "react";
import { Skeleton, Tooltip, Typography, typeofChildren } from "@polkadex/ux";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiInformationLine } from "@remixicon/react";

interface Props extends ComponentProps<"div"> {
  label: string;
  tooltip?: string;
  loading?: boolean;
}
export const GenericHorizontal = ({
  label,
  tooltip,
  children,
  className,
  loading,
  ...props
}: Props) => {
  const isString = typeofChildren(children);
  return (
    <div
      className={twMerge(
        classNames("flex items-center justify-between gap-2 py-1"),
        className
      )}
      {...props}
    >
      {tooltip ? (
        <Tooltip>
          <Tooltip.Trigger>
            <div className="flex items-center gap-1">
              <RiInformationLine className="w-3.5 h-3.5 text-primary" />
              <Typography.Text size="xs" appearance="primary">
                {label}
              </Typography.Text>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content side="left">{tooltip}</Tooltip.Content>
        </Tooltip>
      ) : (
        <Typography.Text size="xs" appearance="primary">
          {label}
        </Typography.Text>
      )}
      <Skeleton loading={!!loading} className="min-h-4 max-w-24">
        {isString ? (
          <Typography.Text size="xs">{children}</Typography.Text>
        ) : (
          children
        )}
      </Skeleton>
    </div>
  );
};
