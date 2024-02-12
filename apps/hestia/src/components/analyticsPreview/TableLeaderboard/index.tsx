"use client";

import { Table } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, forwardRef, useEffect, useMemo, useState } from "react";

import { AccountCard } from "./accountCard";

export type FakeData = (typeof fakeData)[0];

export const TableLeaderboard = forwardRef<
  HTMLDivElement,
  { maxHeight: string }
>(({ maxHeight }, ref) => {
  const [state, setState] = useState<FakeData | null>(null);
  const { width } = useWindowSize();
  const responsiveView = useMemo(() => width <= 1000, [width]);

  useEffect(() => {
    if (!responsiveView && !!state) setState(null);
  }, [responsiveView, state]);

  return (
    <div className="flex h-full flex-col justify-between border-b border-secondary-base">
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
            {fakeData.map((value, i) => {
              const responsiveProps = responsiveView && {
                role: "button",
                onClick: () => setState(value),
              };
              const rank = i + 1;

              return (
                <Table.Row key={value.id} {...responsiveProps}>
                  <Table.Cell>{rank.toString()}</Table.Cell>
                  <Table.Cell align="right">
                    <AccountCard address={value.name} />
                  </Table.Cell>
                  {!responsiveView && (
                    <>
                      <Table.Cell align="right" className="w-[10rem]">
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
    </div>
  );
});
TableLeaderboard.displayName = "TableLeaderboard";
const fakeData = [
  {
    id: 2,
    name: "A5tDrP..QyD9vH",
    rewards: 0.42,
    token: "PDEX",
    score: 600,
  },
  {
    id: 4,
    name: "DfG8mV..LXwMh1",
    rewards: 0.15,
    token: "PDEX",
    score: 500,
  },
  {
    id: 7,
    name: "U3Tm8w..RsHdKm",
    rewards: 0.32,
    token: "PDEX",
    score: 550,
  },
  {
    id: 10,
    name: "Y4pR7t..FmG2CwQ",
    rewards: 0.28,
    token: "PDEX",
    score: 590,
  },
  {
    id: 11,
    name: "55ybbt..FmG2CwQ",
    rewards: 0.28,
    token: "PDEX",
    score: 590,
  },
  {
    id: 12,
    name: "g3pR7t..F1G2CwQ",
    rewards: 0.28,
    token: "PDEX",
    score: 590,
  },
  {
    id: 13,
    name: "45hg7t..FG2CwQ",
    rewards: 0.28,
    token: "PDEX",
    score: 590,
  },
  {
    id: 22,
    name: "55ybbt..F1G2CwQ",
    rewards: 0.28,
    token: "PDEX",
    score: 590,
  },
  {
    id: 23,
    name: "tr24fd..FmG2CwQ",
    rewards: 0.28,
    token: "PDEX",
    score: 590,
  },
  {
    id: 24,
    name: "glr37t..FmG2CwQ",
    rewards: 0.28,
    token: "PDEX",
    score: 590,
  },
];
