// TODO: Improve loading system

"use client";

import {
  Typography,
  Input,
  Token,
  Button,
  Skeleton,
  tokenAppearance,
} from "@polkadex/ux";
import { useElementSize } from "usehooks-ts";
import { Fragment, useMemo } from "react";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { Table } from "./Table";
import { Help } from "./Help";
import { Card } from "./Card";
import { SelectAsset } from "./SelectAsset";

import { Footer, Header } from "@/components/ui";
import { useTransfer } from "@/hooks";

export function Template() {
  const [headerRef, { height: headerHeight }] = useElementSize();
  const [footerRef, { height: footerHeight }] = useElementSize();
  const [helpRef, { height: helpHeight }] = useElementSize();
  const [tableTitleRef, { height: tableTitleHeight }] = useElementSize();
  const [overviewRef, { height: overviewHeight }] = useElementSize();
  const maxHeight = useMemo(
    () =>
      `calc(100vh - ${
        overviewHeight +
        headerHeight +
        footerHeight +
        helpHeight +
        tableTitleHeight +
        1
      }px)`,
    [headerHeight, footerHeight, overviewHeight, helpHeight, tableTitleHeight]
  );
  const {
    onChangeAsset,
    selectedAsset,
    assetsInteraction,
    onAssetsInteraction,
  } = useTransfer();
  return (
    <Fragment>
      <SelectAsset
        open={assetsInteraction}
        onOpenChange={() => onAssetsInteraction()}
        selectedAssetId={selectedAsset?.id}
        onChangeAsset={onChangeAsset}
      />
      <div
        className="flex flex-1 flex-col bg-backgroundBase max-sm:pb-16"
        vaul-drawer-wrapper=""
      >
        <Header ref={headerRef} />
        <main className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-screen-2xl m-auto">
          <div className="flex flex-col flex-1">
            <div ref={overviewRef} className="flex-1 flex flex-col">
              <div className="flex items-center justify-between px-4 pt-6 pb-4 border-b border-secondary-base flex-wrap">
                <Typography.Text bold size="lg">
                  Transfer
                </Typography.Text>
                <InformationCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex w-full border-b border-primary py-8 bg-level-0">
                <div className="flex-1 flex flex-col gap-4 w-full max-w-[1000px] mx-auto">
                  <div className="flex-1 flex max-sm:flex-col items-center w-full border-y border-primary">
                    <Card label="From" title="Funding Account" />
                    <div className="h-full flex items-center justify-center p-2 max-sm:w-full max-sm:border-y border-primary">
                      <ArrowRightIcon className="w-6 h-6 max-sm:rotate-90" />
                    </div>
                    <Card label="To" title="Trading Account" />
                  </div>
                  <div className="flex items-center border border-primary">
                    <div
                      role="button"
                      onClick={() => onAssetsInteraction()}
                      className="flex items-center justify-between gap-4 pl-5 pr-7 py-4 border-r border-primary  hover:bg-level-1 duration-300 transition-colors min-w-52"
                    >
                      <div className="flex items-center gap-2">
                        <Skeleton
                          loading={!selectedAsset?.ticker}
                          className="w-10 h-10"
                        >
                          <Token
                            name={selectedAsset?.ticker}
                            appearance={
                              selectedAsset?.ticker as keyof typeof tokenAppearance
                            }
                            className="w-8 h-8 border border-primary rounded-full"
                          />
                        </Skeleton>

                        <div className="flex flex-col gap-1">
                          <Skeleton
                            loading={!selectedAsset?.ticker}
                            className="w-20 h-4"
                          >
                            <Typography.Text size="md" bold>
                              {selectedAsset?.ticker}
                            </Typography.Text>
                          </Skeleton>
                          <Skeleton
                            loading={!selectedAsset?.ticker}
                            className="w-10 h-4"
                          >
                            <Typography.Text appearance="primary" size="xs">
                              {selectedAsset?.name}
                            </Typography.Text>
                          </Skeleton>
                        </div>
                      </div>
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                    <div className="w-full flex items-center justify-between gap-2 p-4">
                      <input
                        type="text"
                        placeholder="0.000000000"
                        className="text-current flex-1 bg-transparent"
                      />
                      <Button.Solid appearance="secondary" size="xs">
                        MAX
                      </Button.Solid>
                    </div>
                  </div>
                  <Button.Solid
                    appearance="secondary"
                    size="md"
                    className="w-full py-5"
                  >
                    Transfer
                  </Button.Solid>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div
                ref={tableTitleRef}
                className="flex items-center justify-between gap-2 border-b border-primary px-4 w-full  p-2"
              >
                <Typography.Text appearance="primary" bold>
                  History (5)
                </Typography.Text>
                <div>
                  <Input.Search placeholder="Search transactions.." />
                </div>
              </div>
              <Table maxHeight={maxHeight} />
            </div>
            <Help ref={helpRef} />
          </div>
        </main>
        <Footer ref={footerRef} />
      </div>
    </Fragment>
  );
}
