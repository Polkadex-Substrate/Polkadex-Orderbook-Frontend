import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Tooltip, Typography } from "@polkadex/ux";
import React from "react";

export const TransactionDirection = ({
  tooltipable,
  fromType,
  fromName,
  fromAddress,
  toType,
}: {
  tooltipable?: boolean;
  fromType: string;
  fromName: string;
  fromAddress: string;
  toType: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      {tooltipable ? (
        <Typography.Text>{fromType}</Typography.Text>
      ) : (
        <Tooltip>
          <Tooltip.Trigger className="flex items-center gap-1">
            <Typography.Text>{fromType}</Typography.Text>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <div className="flex items-center gap-2">
              <Typography.Text>{fromName}</Typography.Text>
              <Typography.Text appearance="primary">
                {fromAddress}
              </Typography.Text>
            </div>
          </Tooltip.Content>
        </Tooltip>
      )}
      <div className="flex items-center justify-center bg-level-1 w-6 h-6 rounded-md">
        <ArrowRightIcon className="w-4 h-4 text-primary" />
      </div>
      <Tooltip>
        <Tooltip.Trigger>
          <Typography.Text appearance="primary">{toType}</Typography.Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          {tooltipable ? (
            <Typography.Text>
              Balance available across all trading accounts.
            </Typography.Text>
          ) : (
            <div className="flex items-center gap-2">
              <Typography.Text>{fromName}</Typography.Text>
              <Typography.Text appearance="primary">
                {fromAddress}
              </Typography.Text>
            </div>
          )}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
};
