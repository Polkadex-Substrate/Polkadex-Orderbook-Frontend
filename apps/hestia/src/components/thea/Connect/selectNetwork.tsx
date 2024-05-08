"use client";

import { Typography } from "@polkadex/ux";
import { PropsWithChildren } from "react";

import * as Icons from "@/components/ui/ChainIcons";

export const SelectNetwork = ({
  icon,
  children,
}: PropsWithChildren<{
  icon: string;
  active?: boolean;
}>) => {
  const IconComponent = Icons[icon as keyof typeof Icons];
  return (
    <div className="flex items-center gap-2 px-2 py-3 rounded-md w-full">
      <div className="flex items-center justify-center w-9 h-9 p-1.5 rounded-full border border-primary">
        <IconComponent />
      </div>
      <Typography.Text>{children}</Typography.Text>
    </div>
  );
};
