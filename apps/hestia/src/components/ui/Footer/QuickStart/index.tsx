import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Button, Modal, Separator, Typography } from "@polkadex/ux";
import { RiCheckLine, RiCloseLine } from "@remixicon/react";
import Image from "next/image";
import { useWindowSize } from "react-use";

import IntroImage from "../../../../../public/img/introHero.webp";

export const QuickStart = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { width } = useWindowSize();
  const responsiveView = useMemo(() => width <= 640, [width]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      placement={responsiveView ? "top center" : "center"}
      closeOnClickOutside
      className="flex flex-col border-primary bg-level-0 border w-full max-md:w-screen md:max-w-[800px] overflow-auto scrollbar-hide"
    >
      <Modal.Title className="flex justify-between items-center pl-5 border-b border-primary">
        <Typography.Text size="lg" bold>
          Quick Start
        </Typography.Text>
        <Button.Icon
          variant="ghost"
          size="lg"
          appearance="secondary"
          rounded
          onClick={() => onOpenChange(false)}
        >
          <RiCloseLine className="h-full w-full" />
        </Button.Icon>
      </Modal.Title>
      <Modal.Content className="flex max-sm:flex-col gap-5">
        <div className="border-r border-primary p-2 bg-level-1">
          <ul className="flex flex-col">
            <li className="whitespace-nowrap">
              <Button.Ghost appearance="secondary">Intro</Button.Ghost>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 px-3 py-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <Typography.Heading size="lg">
                🚀 The Hestia update is live
              </Typography.Heading>
              <Typography.Heading
                appearance="primary"
                size="md"
                className="font-normal"
              >
                Welcome to the new Polkadex Orderbook trading platform!
              </Typography.Heading>
            </div>

            <Image
              src={IntroImage}
              placeholder="blur"
              alt="Orderbook presentation"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <Separator.Horizontal />
          <div className="flex flex-col gap-3">
            <Typography.Text size="md">
              A few changes you’ll notice:
            </Typography.Text>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-1">
                <RiCheckLine className="w-3 h-3 text-success-base" />
                <Typography.Text appearance="primary">
                  A cleaner, sleeker user interface
                </Typography.Text>
              </li>
              <li className="flex items-center gap-1">
                <RiCheckLine className="w-3 h-3 text-success-base" />
                <Typography.Text appearance="primary">
                  A completely redesigned order placement component
                </Typography.Text>
              </li>
              <li className="flex items-center gap-1">
                <RiCheckLine className="w-3 h-3 text-success-base" />
                <Typography.Text appearance="primary">
                  Adjustable panels
                </Typography.Text>
              </li>
              <li className="flex items-center gap-1">
                <RiCheckLine className="w-3 h-3 text-success-base" />
                <Typography.Text appearance="primary">
                  A new rewards page for the soon-to-be-announced liquidity
                  mining program
                </Typography.Text>
              </li>
              <li className="flex items-center gap-1">
                <RiCheckLine className="w-3 h-3 text-success-base" />
                <Typography.Text appearance="primary">
                  The introduction of trading fees
                </Typography.Text>
              </li>
            </ul>
            <Typography.Text>
              The new update has everything you need to focus on trading, all in
              one place.
            </Typography.Text>
          </div>
          <Separator.Horizontal />
          <div className="flex flex-col gap-1">
            <Typography.Heading size="sm">⚠️ Heads up</Typography.Heading>
            <Typography.Paragraph size="sm" appearance="primary">
              Given the magnitude of the update and the amount of new changes,
              there is an increased possibility of running into bugs. Please
              observe caution when trading, especially when placing large
              trades.
            </Typography.Paragraph>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
