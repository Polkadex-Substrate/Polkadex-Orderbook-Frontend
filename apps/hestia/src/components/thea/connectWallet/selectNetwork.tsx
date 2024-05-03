"use client";

import { Typography } from "@polkadex/ux";
import { RiExpandUpDownFill } from "@remixicon/react";
import { PropsWithChildren } from "react";

import * as Icons from "@/components/ui/ChainIcons";

export const SelectNetwork = ({
  icon,
  active,
  children,
}: PropsWithChildren<{
  icon: string;
  active?: boolean;
}>) => {
  const IconComponent = Icons[icon as keyof typeof Icons];
  return (
    <div className="flex items-center justify-between gap-2 px-2 py-3 rounded-md w-full">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-9 h-9 p-1.5 rounded-full border border-primary">
          <IconComponent />
        </div>
        <Typography.Text>{children}</Typography.Text>
      </div>
      {active ? (
        <RiExpandUpDownFill className="w-4 h-4 text-secondary" />
      ) : (
        <div className="bg-secondary-base/70 rounded-sm px-2">
          <Typography.Text bold appearance="primary" size="xs">
            Select
          </Typography.Text>
        </div>
      )}
    </div>
  );
};
