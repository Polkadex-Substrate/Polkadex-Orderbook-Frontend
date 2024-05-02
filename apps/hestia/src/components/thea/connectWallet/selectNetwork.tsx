"use client";

import { Typography, Token, tokenAppearance } from "@polkadex/ux";
import { RiExpandUpDownFill } from "@remixicon/react";
import { PropsWithChildren } from "react";

export const SelectNetwork = ({
  icon,
  active,
  children,
}: PropsWithChildren<{
  icon: string;
  active?: boolean;
}>) => {
  return (
    <div className="flex items-center justify-between gap-2 px-2 py-3 rounded-md w-full">
      <div className="flex items-center gap-2">
        <Token
          appearance={icon as keyof typeof tokenAppearance}
          name={icon}
          size="md"
          className="rounded-full border border-secondary"
        />
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
