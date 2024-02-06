"use client";

import { Button, Typography } from "@polkadex/ux";
import { useElementSize } from "usehooks-ts";
import { useMemo } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import { Rewards } from "../ui/Icons/rewards";

import { TableLeaderboard } from "./TableLeaderboard";
import { Overview } from "./Overview";
import { TableRewards } from "./TableRewards";

import { Footer, Header } from "@/components/ui";

export function Template() {
  const [headerRef, { height: headerHeight }] = useElementSize();
  const [footerRef, { height: footerHeight }] = useElementSize();
  const [tableTitlesRef, { height: tableTitleHeight }] = useElementSize();
  const [tableRowsRef, { height: tableRowsHeight }] = useElementSize();
  const [overviewRef, { height: overviewHeight }] = useElementSize();

  const maxHeight = useMemo(
    () =>
      `calc(100vh - ${
        overviewHeight +
        headerHeight +
        footerHeight +
        tableTitleHeight +
        tableRowsHeight +
        1
      }px)`,
    [
      headerHeight,
      footerHeight,
      overviewHeight,
      tableTitleHeight,
      tableRowsHeight,
    ]
  );
  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase max-sm:pb-16"
      vaul-drawer-wrapper=""
    >
      <Header ref={headerRef} />
      <main className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-screen-2xl m-auto">
        <div className="flex-1 flex flex-col">
          <Overview ref={overviewRef} />
          <div className="flex flex-1 max-lg:flex-col flex-wrap">
            <div className="flex-1 flex flex-col border-b border-secondary-base">
              <div
                ref={tableTitlesRef}
                className="flex items-center justify-between gap-2 border-b border-primary py-2 px-4 w-full"
              >
                <Typography.Heading size="md">
                  My trading rewards
                </Typography.Heading>
                <Button.Underline size="sm" appearance="secondary">
                  Export to CSV
                </Button.Underline>
              </div>
              <TableRewards ref={tableRowsRef} maxHeight={maxHeight} />
            </div>
            <div className="max-lg:w-full flex flex-col border-l border-primary">
              <div
                ref={tableTitlesRef}
                className="border-b border-primary py-3 px-4 w-full"
              >
                <Typography.Heading size="md">Leaderboard</Typography.Heading>
              </div>
              <div className="h-full flex flex-col">
                <TableLeaderboard ref={tableRowsRef} maxHeight={maxHeight} />
                <div className="flex items-center justify-between px-5 py-8 min-w-[20rem] h-fit gap-10 first:border-r border-secondary-base">
                  <div className="flex items-center gap-2">
                    <Rewards className="w-[5rem]" />
                    <div className="flex flex-col gap-2 max-w-[25rem]">
                      <div className="flex flex-col">
                        <Typography.Paragraph
                          size="md"
                          className="font-medium leading-normal"
                        >
                          Rewards program
                        </Typography.Paragraph>
                        <Typography.Paragraph appearance="primary" size="sm">
                          Explore Rewards Program rules
                        </Typography.Paragraph>
                      </div>
                    </div>
                  </div>
                  <Button.Icon variant="outline">
                    <ArrowTopRightOnSquareIcon />
                  </Button.Icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer ref={footerRef} />
    </div>
  );
}
