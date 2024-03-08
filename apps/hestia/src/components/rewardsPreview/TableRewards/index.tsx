"use client";

import { RiFileCopyLine, RiHandCoinLine, RiSortAsc } from "@remixicon/react";
import {
  Button,
  Copy,
  Icon,
  Skeleton,
  Spinner,
  Typography,
  truncateString,
} from "@polkadex/ux";
import { forwardRef, useMemo } from "react";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import classNames from "classnames";
import {
  useClaimReward,
  useClaimableRewards,
  useTraderMetrics,
} from "@orderbook/core/hooks";
import { secondsToHm } from "@orderbook/core/helpers";
import { TIME_INTERVAL } from "@orderbook/core/constants";
import { trimFloat } from "@polkadex/numericals";

import { RewardsSkeleton } from "./loading";

import { Icons } from "@/components/ui";

type Props = { maxHeight: string; market: string };

export const TableRewards = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight, market }) => {
    const { selectedWallet } = useConnectWalletProvider();
    const {
      selectedAddresses: { mainAddress },
    } = useProfile();

    const { userMetrics, isLoading: isUserMetricsLoading } =
      useTraderMetrics(market);

    const { claimableRewards, isLoading: isRewardsLoading } =
      useClaimableRewards(market);

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

    const filledPercentage = useMemo(() => {
      const timeToNextEpoch = (userMetrics?.blocksToNextEpoch || 0) * 12;
      const epochDuration = TIME_INTERVAL.epochDuration;

      const unfilledPercentage = (timeToNextEpoch / epochDuration) * 100;
      const filledPercentage = 100 - unfilledPercentage;

      return filledPercentage.toFixed(2);
    }, [userMetrics?.blocksToNextEpoch]);

    return (
      <div className="flex-1 flex flex-col border-b border-secondary-base">
        <div className="flex sm:!flex-row flex-col items-center justify-between gap-4 bg-level-1 border-b border-primary px-4 py-6 flex-wrap">
          <div className="flex items-center gap-3 self-start">
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
          <div className="flex items-center gap-8 self-start flex-wrap">
            <div className="flex items-center gap-2">
              <div className="grid place-items-center bg-level-2 w-10 h-10 rounded-md">
                <RiSortAsc className="w-4 h-4" />
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
                  loading={isUserMetricsLoading}
                  className="h-4 w-28 flex-none"
                >
                  <Typography.Text bold className="whitespace-nowrap">
                    {userMetrics?.mmScore || 0}
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
                  loading={isUserMetricsLoading}
                  className="h-4 w-28 flex-none"
                >
                  <Typography.Text bold className="whitespace-nowrap">
                    {trimFloat({
                      value: userMetrics?.tradingScore || 0,
                      digitsAfterDecimal: 6,
                    })}
                  </Typography.Text>
                </Skeleton>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid place-items-center bg-level-2 w-10 h-10 rounded-md">
                <RiHandCoinLine className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text
                  size="xs"
                  appearance="primary"
                  className="whitespace-nowrap"
                >
                  Total rewards (PDEX)
                </Typography.Text>
                <Skeleton
                  loading={isRewardsLoading}
                  className="h-4 w-28 flex-none"
                >
                  <Typography.Text bold className="whitespace-nowrap">
                    {accumulatedRewards}
                  </Typography.Text>
                </Skeleton>
              </div>
            </div>
          </div>
        </div>

        {isRewardsLoading || isUserMetricsLoading ? (
          <RewardsSkeleton />
        ) : (
          <div
            className="overflow-y-hidden hover:overflow-y-auto p-3"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <div className="flex flex-col gap-4">
              <div className={classNames("flex items-center justify-between")}>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center justify-center border border-primary rounded-md px-2 py-3 min-w-16">
                    <Typography.Text bold size="md">
                      {userMetrics?.currentEpoch}
                    </Typography.Text>
                    <Typography.Text size="xs" appearance="primary">
                      Epoch
                    </Typography.Text>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Typography.Text bold size="md">
                      ---------------
                    </Typography.Text>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <Typography.Text size="xs" appearance="primary">
                          {filledPercentage}%
                        </Typography.Text>
                        <Typography.Text size="xs" appearance="primary">
                          Claim after:{" "}
                          {secondsToHm(
                            (userMetrics?.blocksToNextEpoch || 0) * 12
                          )}
                        </Typography.Text>
                      </div>
                      <div className="w-full h-2 bg-level-2 rounded-full relative overflow-hidden">
                        <div
                          className="bg-primary-base absolute inset-0"
                          style={{ width: `${filledPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {claimableRewards?.map((value) => {
                const disabled =
                  claimRewardStatus === "loading" &&
                  !loadingEpochs.includes(value.epoch);
                const loading = loadingEpochs.includes(value.epoch);

                const hasClaimed = value.isClaimed;
                const readyToClaim = !hasClaimed;

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
                          </div>
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
                        disabled={disabled || loading}
                      >
                        {loading ? (
                          <div className="px-9">
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
