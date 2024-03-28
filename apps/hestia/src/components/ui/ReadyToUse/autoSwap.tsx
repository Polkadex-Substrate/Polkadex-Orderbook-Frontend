import { Skeleton, Tooltip, Typography } from "@polkadex/ux";
import { RiArrowRightLine, RiInformationLine } from "@remixicon/react";

import { MINIMUM_PDEX_REQUIRED } from "@/hooks";

export function AutoSwap({
  loading,
  payValue,
  receiveValue,
  balance,
}: {
  loading: boolean;
  payValue: string;
  receiveValue: string;
  balance: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="flex flex-col gap-2">
        <Tooltip>
          <Tooltip.Trigger>
            <div className="flex items-center gap-2">
              <RiInformationLine className="w-4 h-4 text-primary" />
              <Typography.Text appearance="primary">
                Auto-Swap Required
              </Typography.Text>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content side="left">Swap messsage</Tooltip.Content>
        </Tooltip>
        <Typography.Text>
          In order to bridge your funds and sign transactions on Polkadex, you
          must have at least {MINIMUM_PDEX_REQUIRED} PDEX in your wallet. Your
          current PDEX balance is {balance}.
        </Typography.Text>
      </div>
      <div className="flex items-center justify-around gap-3">
        <div className="flex flex-col flex-1 bg-level-1 border border-primary px-3 py-2">
          <Typography.Text size="xs" appearance="primary">
            You pay
          </Typography.Text>
          <Skeleton loading={!loading} className="min-h-4">
            <Typography.Text>{payValue}</Typography.Text>
          </Skeleton>
        </div>
        <RiArrowRightLine className="w-4 h-4" />
        <div className="flex flex-col flex-1 bg-level-1 border border-primary px-3 py-2">
          <Typography.Text size="xs" appearance="primary">
            You receive
          </Typography.Text>
          <Skeleton loading={!loading} className="min-h-4">
            <Typography.Text>{receiveValue}</Typography.Text>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
