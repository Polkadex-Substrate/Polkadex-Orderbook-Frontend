// TEMP Component

"use client";

import { Skeleton, Typography, typeofChildren } from "@polkadex/ux";
import classNames from "classnames";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ResponsiveCardProps extends ComponentProps<"div"> {
  label?: string;
  loading?: boolean;
}

const ResponsiveCard = ({
  className,
  label,
  loading = false,
  children,
  ...props
}: ResponsiveCardProps) => {
  const isString = typeofChildren(children);
  return (
    <div
      className={twMerge(
        classNames("flex items-center justify-between gap-12"),
        className
      )}
      {...props}
    >
      {label && <Item appearance="primary">{label}</Item>}
      {isString ? <Item loading={loading}>{children}</Item> : children}
    </div>
  );
};

interface ItemProps extends ComponentProps<typeof Typography.Text> {
  loading?: boolean;
}

const Item = ({ children, loading, ...props }: ItemProps) => {
  const isString = typeofChildren(children);

  if (!isString) return children;
  return (
    <Skeleton loading={loading} className="min-w-12 min-h-4">
      <Typography.Text {...props}>{children}</Typography.Text>
    </Skeleton>
  );
};

ResponsiveCard.Item = Item;

export { ResponsiveCard };
