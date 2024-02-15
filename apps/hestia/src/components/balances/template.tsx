"use client";

import { HoverCard, Popover, Typography, Checkbox, Input } from "@polkadex/ux";
import { useElementSize, useWindowSize } from "usehooks-ts";
import { useMemo } from "react";
import Link from "next/link";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useAssets } from "@orderbook/core/hooks";

import { Overview } from "./Overview";
import { Table } from "./Table";
import { Help } from "./Help";

import { Footer, Header } from "@/components/ui";

// useElementSize Deprecated -> useResizeObserver
export function Template() {
  const { width } = useWindowSize();

  const [headerRef, { height: headerHeight = 0 }] = useElementSize();
  const [footerRef, { height: footerHeight = 0 }] = useElementSize();
  const [helpRef, { height: helpeight = 0 }] = useElementSize();
  const [overviewRef, { height: overviewHeight = 0 }] = useElementSize();

  const { assets, filters, loading, onHideZeroBalance, onSearchToken } =
    useAssets();

  const maxHeight = useMemo(
    () =>
      `calc(100vh - ${
        overviewHeight + headerHeight + footerHeight + helpeight
      }px)`,
    [headerHeight, footerHeight, overviewHeight, helpeight]
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
            <div className="flex items-center justify-between px-4 pt-6 pb-4 border-b border-secondary-base">
              <Typography.Text bold size="lg">
                Balances
              </Typography.Text>
              <InformationCircleIcon className="w-6 h-6 text-primary" />
            </div>
            <Overview />
            <div className="py-2 flex items-center justify-between gap-2 border-b border-primary px-4">
              <Input.Search
                placeholder="Search.."
                value={filters.search}
                onChange={onSearchToken}
              />
              {width >= 680 ? (
                <div className="flex items-center gap-4">
                  <HoverCard>
                    <HoverCard.Trigger>
                      <Link href="/" className="text-primary-base text-sm">
                        Convert small balance to PDEX
                      </Link>
                    </HoverCard.Trigger>
                    <HoverCard.Content className="max-w-[15rem]">
                      After each trade, you might have a bit of residual balance
                      in your account wallet. Polkadex allows you to convert
                      dust valued under 0.000012 BTC into PDEX.
                    </HoverCard.Content>
                  </HoverCard>
                  <Checkbox.Solid
                    id="hideZeroBalances"
                    checked={filters.hideZero}
                    onCheckedChange={onHideZeroBalance}
                  >
                    <Checkbox.Label htmlFor="hideZeroBalances">
                      Hide 0 balances
                    </Checkbox.Label>
                  </Checkbox.Solid>
                </div>
              ) : (
                <Popover>
                  <Popover.Trigger className="group">
                    <EllipsisVerticalIcon className="w-6 h-6 text-primary group-hover:text-current transition-colors duration-300" />
                  </Popover.Trigger>
                  <Popover.Content className="flex flex-col gap-5 p-4">
                    <Typography.Text appearance="secondary" size="xs">
                      Filters
                    </Typography.Text>
                    <div className="flex flex-col gap-2">
                      <Checkbox.Solid
                        id="hideZeroBalances"
                        checked={filters.hideZero}
                        onCheckedChange={onHideZeroBalance}
                      >
                        <Checkbox.Label htmlFor="hideZeroBalances">
                          Hide 0 balances
                        </Checkbox.Label>
                      </Checkbox.Solid>{" "}
                      <HoverCard>
                        <HoverCard.Trigger>
                          <Link href="/" className="text-primary-base">
                            Convert small balance to PDEX
                          </Link>
                        </HoverCard.Trigger>
                        <HoverCard.Content className="max-w-[15rem]">
                          After each trade, you might have a bit of residual
                          balance in your account wallet. Polkadex allows you to
                          convert dust valued under 0.000012 BTC into PDEX.
                        </HoverCard.Content>
                      </HoverCard>
                    </div>
                  </Popover.Content>
                </Popover>
              )}
            </div>
          </div>
          <Table maxHeight={maxHeight} data={assets} loading={loading} />
          <Help ref={helpRef} />
        </div>
      </main>
      <Footer ref={footerRef} />
    </div>
  );
}
