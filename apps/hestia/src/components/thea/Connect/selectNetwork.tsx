"use client";

import { Chain, Typography } from "@polkadex/ux";
import { PropsWithChildren } from "react";

export const SelectNetwork = ({
  icon,
  children,
}: PropsWithChildren<{
  icon: string;
  active?: boolean;
}>) => {
  return (
    <div className="flex items-center gap-2 px-2 py-3 rounded-md w-full">
      <Chain name={icon} />
      <Typography.Text>{children}</Typography.Text>
    </div>
  );
};
