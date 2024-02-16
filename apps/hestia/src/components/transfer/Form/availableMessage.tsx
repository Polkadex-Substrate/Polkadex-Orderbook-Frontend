"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Icon, Typography } from "@polkadex/ux";

export const AvailableMessage = () => {
  return (
    <div className="flex gap-2 flex-1">
      <Icon size="xs" className="bg-info-base rounded-md">
        <InformationCircleIcon />
      </Icon>
      <Typography.Text className="self-center whitespace-nowrap">
        All trading accounts
      </Typography.Text>
    </div>
  );
};
