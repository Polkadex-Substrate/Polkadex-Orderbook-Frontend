import { Typography } from "@polkadex/ux";
import { PropsWithChildren } from "react";

export const FilledCard = ({
  width,
  children,
}: PropsWithChildren<{ width?: string }>) => (
  <div className="flex relative bg-level-1 rounded-sm min-w-20 z-0 border border-primary">
    <div
      className="absolute h-full bg-level-2"
      style={{
        width,
      }}
    />
    <div className="flex-1 flex items-center gap-3 justify-between px-1 py-0.5 relative">
      <Typography.Text size="xs">{children}</Typography.Text>
      <Typography.Text size="2xs" appearance="primary">
        {width}
      </Typography.Text>
    </div>
  </div>
);
