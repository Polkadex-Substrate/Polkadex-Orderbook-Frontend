"use client";

import { Typography } from "@polkadex/ux";
import { PropsWithChildren } from "react";

export const Balance = ({
  baseTicker,
  children,
}: PropsWithChildren<{ baseTicker: string }>) => {
  return (
    <div className=" self-end flex items-center gap-1">
      <Typography.Text size="xs">
        {children} {baseTicker}
      </Typography.Text>
      <Typography.Text size="xs" appearance="primary">
        Available
      </Typography.Text>
    </div>
  );
};
