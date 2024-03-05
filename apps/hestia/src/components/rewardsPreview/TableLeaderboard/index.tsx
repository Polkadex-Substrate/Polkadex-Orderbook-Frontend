"use client";

import { Skeleton, Table } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { LmpLeaderboard, useLeaderBoard } from "@orderbook/core/hooks";

import { AccountCard } from "./accountCard";
import { ResponsiveTable } from "./responsiveTable";

type Props = { market: string; maxHeight: string };

export const TableLeaderboard = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight, market }) => {
    const { width } = useWindowSize();
    const { accounts, isLoading } = useLeaderBoard(market);

    const [responsiveState, setResponsiveState] = useState(false);
    const [responsiveData, setResponsiveData] = useState<LmpLeaderboard | null>(
      null
    );
    const responsiveView = useMemo(() => width <= 400, [width]);

    useEffect(() => {
      if (!responsiveView && !!responsiveState) {
        setResponsiveState(false);
        setResponsiveData(null);
      }
    }, [responsiveState, responsiveView]);

    return (
      <>
        <ResponsiveTable
          data={responsiveData}
          onOpenChange={setResponsiveState}
          open={responsiveState}
        />
        <div className="flex h-full min-h-[440px] flex-col justify-between border-b border-secondary-base">
          {isLoading ? (
            <Skeleton loading />
          ) : (
            <div
              className="overflow-y-hidden hover:overflow-y-auto px-3"
              style={{ maxHeight, scrollbarGutter: "stable" }}
            >
              <Table>
                <Table.Header className="[&_th]:border-none">
                  <Table.Row className="border-none">
                    <Table.Head>#</Table.Head>
                    <Table.Head>Account</Table.Head>
                    {!responsiveView && (
                      <Table.Head align="right">Rewards (PDEX)</Table.Head>
                    )}
                    <Table.Head align="right">Score</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {accounts?.map((value) => {
                    const responsiveProps = responsiveView && {
                      role: "button",
                      onClick: () => {
                        setResponsiveState(true);
                        setResponsiveData(value);
                      },
                    };

                    return (
                      <Table.Row key={value.address} {...responsiveProps}>
                        <Table.Cell>{value.rank.toString()}</Table.Cell>
                        <Table.Cell align="right">
                          <AccountCard address={value.address} />
                        </Table.Cell>
                        {!responsiveView && (
                          <>
                            <Table.Cell align="right">
                              {value.rewards.toString()}
                            </Table.Cell>
                          </>
                        )}
                        <Table.Cell className="flex justify-end">
                          {value.score.toString()}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </>
    );
  }
);
TableLeaderboard.displayName = "TableLeaderboard";
