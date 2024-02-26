import { Typography } from "@polkadex/ux";
import { PropsWithChildren } from "react";

export const ResponsiveCard = ({
  children,
  label,
}: PropsWithChildren<{ label: string }>) => {
  const isString = typeof children === "string";
  return (
    <div className="flex items-center justify-between gap-2">
      <Typography.Text appearance="primary">{label}</Typography.Text>
      {isString ? <Typography.Text>{children}</Typography.Text> : children}
    </div>
  );
};
