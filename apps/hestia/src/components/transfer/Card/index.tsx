"use client";

import { Icons, Typography } from "@polkadex/ux";
export const Card = ({ label, title }: { label: string; title: string }) => {
  return (
    <div className="flex-1 flex flex-col border-x border-primary rounded-sm w-full ">
      <div className="flex flex-col gap-1 p-5">
        <Typography.Text size="xs" appearance="primary">
          {label}
        </Typography.Text>
        <Typography.Text size="xl">{title}</Typography.Text>
      </div>
      <div className="flex items-center justify-between gap-2 px-5 py-3 border-t border-primary">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-level-2 w-6 h-6 rounded-md">
            <Icons.Wallet className="w-3 h-3 text-primary" />
          </div>
          <Typography.Text>Orderbook • esqjzD3B...vHEyFVov</Typography.Text>
        </div>
        <div>
          <Typography.Text appearance="primary" size="xs">
            0 ASTR
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};
