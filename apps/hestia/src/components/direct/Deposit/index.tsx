"use client";

import {
  HoverInformation,
  ResponsiveCard,
  Typography,
  Button,
  Input,
  Token,
  Tooltip,
  AccountCombobox,
  Popover,
  Searchable,
  ScrollArea,
  TokenCard,
} from "@polkadex/ux";
import { RiArrowDownSLine, RiInformationFill } from "@remixicon/react";
import classNames from "classnames";
import { useState } from "react";
import { useMeasure } from "react-use";

import { SelectNetwork } from "../selectNetwork";
export const Deposit = () => {
  const [open, setOpen] = useState(false);
  const [ref, bounds] = useMeasure<HTMLButtonElement>();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10 max-w-[500px]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Typography.Text size="lg" bold>
              Withdraw to
            </Typography.Text>
            <SelectNetwork name="Polkadot" icon="Polkadot">
              {[]?.map((e: any) => {
                return (
                  <SelectNetwork.Card
                    key={e.genesis}
                    icon={e.logo}
                    value={e.name}
                    onSelect={() => {}}
                  />
                );
              })}
            </SelectNetwork>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Typography.Heading>Asset</Typography.Heading>
            <HoverInformation>
              <HoverInformation.Trigger className="min-w-20">
                <RiInformationFill className="w-3 h-3 text-actionInput" />
                <Typography.Text size="xs" appearance="primary">
                  Available: 0
                </Typography.Text>
              </HoverInformation.Trigger>
              <HoverInformation.Content>
                <ResponsiveCard label="Source fee" loading={false}>
                  0
                </ResponsiveCard>
                <ResponsiveCard label="Destination fee" loading={false}>
                  0
                </ResponsiveCard>
                <ResponsiveCard label="Available" loading={false}>
                  0
                </ResponsiveCard>
              </HoverInformation.Content>
            </HoverInformation>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex item-center border border-primary rounded-sm">
              <Popover open={open} onOpenChange={setOpen}>
                <Popover.Trigger
                  ref={ref}
                  superpositionTrigger
                  className="w-full"
                >
                  <Button.Outline
                    type="button"
                    appearance="secondary"
                    className="gap-1 px-2 justify-between h-full"
                    onClick={() => {}}
                  >
                    <div className="flex items-center gap-2">
                      <Token
                        name="DOT"
                        size="md"
                        appearance="DOT"
                        className="rounded-full border border-primary"
                      />

                      <Typography.Text size="md">DOT</Typography.Text>
                    </div>
                    <RiArrowDownSLine className="w-4 h-4" />
                  </Button.Outline>
                </Popover.Trigger>
                <Popover.Content style={{ minWidth: bounds.width }}>
                  <Searchable className="bg-level-0">
                    <Searchable.Input placeholder="Search account" />
                    <Searchable.List className="overflow-hidden">
                      <div className="flex gap-2">
                        <div className="flex flex-col flex-1">
                          <Searchable.Empty className="flex-1 flex items-center justify-center">
                            No result found
                          </Searchable.Empty>
                          <ScrollArea className="max-h-[280px]">
                            <Searchable.Group heading="Available assets">
                              {[].map((e: any) => {
                                return (
                                  <Searchable.Item
                                    key={e.name}
                                    value={e.name}
                                    className="mb-1 mr-1"
                                    onSelect={() => {}}
                                  >
                                    <div className="flex-1 [&_span]:!normal-case">
                                      <TokenCard
                                        key={e.id}
                                        icon={e.ticker}
                                        ticker={e.ticker}
                                        tokenName={e?.name}
                                        balance={0}
                                      />
                                    </div>
                                  </Searchable.Item>
                                );
                              })}
                            </Searchable.Group>
                            <ScrollArea.Bar orientation="vertical" />
                          </ScrollArea>
                        </div>
                      </div>
                    </Searchable.List>
                  </Searchable>
                </Popover.Content>
                <Popover.Overlay />
              </Popover>

              <Tooltip open={false}>
                <Tooltip.Trigger asChild>
                  <div
                    className={classNames(
                      "w-full pr-4",
                      false && "border-danger-base border"
                    )}
                  >
                    <Input.Vertical
                      type="text"
                      autoComplete="off"
                      placeholder="Enter an amount"
                      // {...getFieldProps("amount")}
                      className="max-sm:focus:text-[16px] w-full pl-4 py-4"
                    >
                      <Input.Action
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        MAX
                      </Input.Action>
                    </Input.Vertical>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content className="bg-level-5 z-[2] p-1">
                  Error message
                </Tooltip.Content>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text size="lg" bold>
              Address
            </Typography.Text>
            <div className="border border-primary rounded-sm px-2 py-4">
              <AccountCombobox account={null} setAccount={(e) => {}} />
            </div>
          </div>
          <Button.Light appearance="secondary">Withdraw</Button.Light>
        </div>
      </div>
    </div>
  );
};
