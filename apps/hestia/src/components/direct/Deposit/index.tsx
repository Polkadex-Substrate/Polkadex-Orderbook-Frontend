"use client";

import {
  HoverInformation,
  ResponsiveCard,
  Typography,
  Button,
  Input,
  Tooltip,
  AccountCombobox,
} from "@polkadex/ux";
import { RiInformationFill } from "@remixicon/react";
import classNames from "classnames";
import { useMeasure } from "react-use";
import { useState } from "react";

import { SelectNetwork, fakeNetworks } from "../selectNetwork";
import { SelectAsset } from "../selectAsset";

export const Deposit = () => {
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  const [network, setNetwork] = useState(fakeNetworks[0]);
  const isEVM = network.genesis === "0x006";

  return (
    <div className="flex flex-col max-w-[500px]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography.Text size="lg" bold>
            Deposit to
          </Typography.Text>
          <SelectNetwork network={network} setNetwork={(e) => setNetwork(e)} />
        </div>
        <div className="flex flex-col gap-2">
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
            <div
              ref={ref}
              className="flex item-center border border-primary rounded-sm"
            >
              <SelectAsset width={bounds.width} />
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
        </div>

        {isEVM && (
          <div className="flex flex-col gap-2">
            <Typography.Text size="lg" bold>
              Address
            </Typography.Text>
            <div className="border border-primary rounded-sm px-2 py-4">
              <AccountCombobox account={null} setAccount={(e) => {}} />
            </div>
          </div>
        )}

        <Button.Light appearance="secondary">Withdraw</Button.Light>
      </div>
    </div>
  );
};
