"use client";

import { Button, Icon, Typography } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { forwardRef, useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import { Icons } from "@/components/ui";

export type Data = (typeof fakeData)[0];

export const TableRewards = forwardRef<HTMLDivElement, { maxHeight: string }>(
  ({ maxHeight }, ref) => {
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
                Orderbook Testing
              </Typography.Text>
              <Typography.Text appearance="primary">
                5DCj6qBHPv..bUwsboXnZ
              </Typography.Text>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="grid place-items-center bg-level-2 w-10 h-10 rounded-md">
                <Icons.Transfer className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <Typography.Text
                  size="xs"
                  appearance="primary"
                  className="whitespace-nowrap"
                >
                  My score
                </Typography.Text>
                <Typography.Text bold className="whitespace-nowrap">
                  95500
                </Typography.Text>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid place-items-center bg-level-2 w-10 h-10 rounded-md">
                <Icons.Transfer className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <Typography.Text
                  size="xs"
                  appearance="primary"
                  className="whitespace-nowrap"
                >
                  Total rewards
                </Typography.Text>
                <Typography.Text bold className="whitespace-nowrap">
                  10.056 PDEX
                </Typography.Text>
              </div>
            </div>
          </div>
        </div>
        <div
          className="overflow-y-hidden hover:overflow-y-auto p-3"
          style={{ maxHeight, scrollbarGutter: "stable" }}
        >
          <div className="flex flex-col gap-4">
            {fakeData.map((value) => {
              // TestingPurposes
              const readyToClaim = value.status === "Completed";
              const inactive = value.status === "Claimed";
              const inProgress = !readyToClaim && !inactive;
              return (
                <div
                  className={classNames(
                    "flex items-center justify-between",
                    inactive && "opacity-50"
                  )}
                  key={value.id}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col items-center justify-center border border-primary rounded-md px-2 py-3">
                      <Typography.Text bold size="md">
                        94890
                      </Typography.Text>
                      <Typography.Text size="xs" appearance="primary">
                        Score
                      </Typography.Text>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Typography.Text bold size="md">
                        {value.rewards} PDEX
                      </Typography.Text>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <Typography.Text size="xs" appearance="primary">
                            {value.status}
                          </Typography.Text>
                          {inProgress && (
                            <Typography.Text size="xs" appearance="primary">
                              Epoch: {value.epoch}
                            </Typography.Text>
                          )}
                        </div>
                        {inProgress && (
                          <div className="w-full h-2 bg-level-2 rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                  {readyToClaim && (
                    <Button.Solid size="sm">Claim rewards</Button.Solid>
                  )}
                </div>
              );
            })}
          </div>
        </div>
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
