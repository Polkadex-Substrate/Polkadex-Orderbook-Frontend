"use client";

import { RiFileCopyLine } from "@remixicon/react";
import {
  Button,
  Copy,
  Icon,
  Skeleton,
  Spinner,
  Typography,
  truncateString,
} from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import classNames from "classnames";
import {
  useClaimReward,
  useRewards,
  useTraderMetrics,
} from "@orderbook/core/hooks";

import { RewardsSkeleton } from "./loading";

import { Icons } from "@/components/ui";

export type Data = (typeof fakeData)[0];

type Props = { maxHeight: string; market: string };

export const TableRewards = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight, market }) => {
    const { selectedWallet } = useConnectWalletProvider();
    const {
      selectedAddresses: { mainAddress },
    } = useProfile();

    const { tradeMetrics, isLoading: isTradeMetricsLoading } =
      useTraderMetrics(market);
    const { claimableRewards, isLoading: isRewardsLoading } =
      useRewards(market);
    const {
      mutateAsync: onClaimReward,
      status: claimRewardStatus,
      loadingEpochs,
    } = useClaimReward();

    const accumulatedRewards = useMemo(() => {
      const rewards = claimableRewards?.map((r) => r.totalReward) || [];
      if (rewards.length === 0) return 0;
      return rewards?.reduce((a, b) => a + b).toFixed(4);
    }, [claimableRewards]);

    const [state, setState] = useState<Data | null>(null);
    const { width } = useWindowSize();
    const responsiveView = useMemo(() => width <= 1000, [width]);

    useEffect(() => {
      if (!responsiveView && !!state) setState(null);
    }, [responsiveView, state]);

    return (
      <div className="flex-1 flex flex-col border-b border-secondary-base">
        <div className="flex items-center justify-between gap-4 bg-level-1 border-b border-primary px-4 py-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Icon name="Avatar" className="w-10 h-10" />
            <div className="flex flex-col">
              <Typography.Text bold size="md">
                {selectedWallet?.name || "Unknown account"}
              </Typography.Text>
              <Copy value={mainAddress}>
                <div className="flex items-center gap-1">
                  <RiFileCopyLine className="w-4 h-4 text-actionInput" />
                  <Typography.Text appearance="primary">
                    {truncateString(mainAddress || "0xxxxxxxxxxxxx", 6)}
                  </Typography.Text>
                </div>
              </Copy>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="grid place-items-center bg-level-2 w-10 h-10 rounded-md">
                <Icons.Transfer className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text
                  size="xs"
                  appearance="primary"
                  className="whitespace-nowrap"
                >
                  My MM score
                </Typography.Text>
                <Skeleton
                  loading={isTradeMetricsLoading}
                  className="h-4 w-28 flex-none"
                >
                  <Typography.Text bold className="whitespace-nowrap">
                    {tradeMetrics?.mmScore || 0}
                  </Typography.Text>
                </Skeleton>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid place-items-center bg-level-2 w-10 h-10 rounded-md">
                <Icons.Transfer className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text
                  size="xs"
                  appearance="primary"
                  className="whitespace-nowrap"
                >
                  My Trading score
                </Typography.Text>
                <Skeleton
                  loading={isTradeMetricsLoading}
                  className="h-4 w-28 flex-none"
                >
                  <Typography.Text bold className="whitespace-nowrap">
                    {tradeMetrics?.tradingScore || 0}
                  </Typography.Text>
                </Skeleton>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid place-items-center bg-level-2 w-10 h-10 rounded-md">
                <Icons.Transfer className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text
                  size="xs"
                  appearance="primary"
                  className="whitespace-nowrap"
                >
                  Total rewards
                </Typography.Text>
                <Skeleton
                  loading={isRewardsLoading}
                  className="h-4 w-28 flex-none"
                >
                  <Typography.Text bold className="whitespace-nowrap">
                    {accumulatedRewards} PDEX
                  </Typography.Text>
                </Skeleton>
              </div>
            </div>
          </div>
        </div>

        {isRewardsLoading ? (
          <RewardsSkeleton />
        ) : (
          <div
            className="overflow-y-hidden hover:overflow-y-auto p-3"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <div className="flex flex-col gap-4">
              {claimableRewards?.map((value) => {
                const disabled =
                  claimRewardStatus === "loading" &&
                  loadingEpochs.includes(value.epoch);

                // // TODO: Calculate this time
                // const claimAfter =
                //   value.claimBlock < value.currentBlockNumber ? null : "1h 20m";
                const hasClaimed = value.isClaimed;
                const readyToClaim = !hasClaimed;
                // const inProgress = !readyToClaim && !hasClaimed;

                // const progressStatus = inProgress ? "" : "Completed";

                const status = hasClaimed ? "Claimed" : "Completed";

                return (
                  <div
                    className={classNames(
                      "flex items-center justify-between",
                      hasClaimed && "opacity-50"
                    )}
                    key={value.epoch}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex flex-col items-center justify-center border border-primary rounded-md px-2 py-3 min-w-16">
                        <Typography.Text bold size="md">
                          {value.epoch}
                        </Typography.Text>
                        <Typography.Text size="xs" appearance="primary">
                          Epoch
                        </Typography.Text>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Typography.Text bold size="md">
                          {value.totalReward.toFixed(4)} {value.token}
                        </Typography.Text>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <Typography.Text size="xs" appearance="primary">
                              {status}
                            </Typography.Text>
                            {/* {inProgress && (
                              <Typography.Text size="xs" appearance="primary">
                                Claim after: {claimAfter}
                              </Typography.Text>
                            )} */}
                          </div>
                          {/* {inProgress && (
                            <div className="w-full h-2 bg-level-2 rounded-full" />
                          )} */}
                        </div>
                      </div>
                    </div>
                    {readyToClaim && (
                      <Button.Solid
                        onClick={() =>
                          onClaimReward({
                            epoch: value.epoch,
                            market,
                            reward: value.totalReward,
                          })
                        }
                        size="sm"
                        disabled={disabled}
                      >
                        {disabled ? (
                          <div className="px-8">
                            <Spinner.Keyboard className="w-4 h-4" />
                          </div>
                        ) : (
                          "Claim rewards"
                        )}
                      </Button.Solid>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);
TableRewards.displayName = "TableRewards";
const fakeData = [
  {
    id: 1,
    epoch: "2 hrs 51 min",
    score: 92,
    rewards: 1.0404,
    token: "PDEX",
    status: "50%",
  },
  {
    id: 2,
    epoch: "3 hrs 12 min",
    score: 87,
    rewards: 1.0201,
    token: "PDEX",
    status: "Completed",
  },
  {
    id: 3,
    epoch: "1 hrs 43 min",
    score: 95,
    rewards: 1.0556,
    token: "PDEX",
    status: "Claimed",
  },
];
