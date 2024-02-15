"use client";

import { Typography, Input } from "@polkadex/ux";
import { useElementSize } from "usehooks-ts";
import { useMemo } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { Table } from "./Table";
import { Help } from "./Help";

import { Footer, Header } from "@/components/ui";

// useElementSize Deprecated -> useResizeObserver
export function Template() {
  const [headerRef, { height: headerHeight = 0 }] = useElementSize();
  const [footerRef, { height: footerHeight = 0 }] = useElementSize();
  const [helpRef, { height: helpeight = 0 }] = useElementSize();
  const [tableRowsRef, { height: tableRowsHeight = 0 }] = useElementSize();
  const [overviewRef, { height: overviewHeight = 0 }] = useElementSize();

  const maxHeight = useMemo(
    () =>
      `calc(100vh - ${
        overviewHeight +
        headerHeight +
        footerHeight +
        helpeight +
        tableRowsHeight +
        1
      }px)`,
    [headerHeight, footerHeight, overviewHeight, helpeight, tableRowsHeight]
  );
  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase max-sm:pb-16"
      vaul-drawer-wrapper=""
    >
      <Header ref={headerRef} />
      <main className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-screen-2xl m-auto">
        <div className="flex-1 flex flex-col">
          <div ref={overviewRef} className="flex flex-col">
            <div className="flex items-end justify-between gap-4 px-4 pt-6 pb-4  border-b border-secondary-base flex-wrap">
              <Typography.Text bold size="lg">
                Analytics
              </Typography.Text>
              <InformationCircleIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center justify-between gap-2 border-b border-primary px-4 w-full p-2">
              <Typography.Text appearance="primary" bold>
                Markets (5)
              </Typography.Text>
              <div>
                <Input.Search placeholder="Search markets.." />
              </div>
            </div>
          </div>
          <Table ref={tableRowsRef} maxHeight={maxHeight} />
          <Help ref={helpRef} />
        </div>
      </main>
      <Footer ref={footerRef} />
    </div>
  );
}
