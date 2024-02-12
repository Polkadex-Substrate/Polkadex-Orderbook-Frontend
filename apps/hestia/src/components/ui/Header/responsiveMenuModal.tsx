import React, { Dispatch, SetStateAction } from "react";
import { Button, Modal, Typography } from "@polkadex/ux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  GlobeAltIcon,
  MoonIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useWindowSize } from "usehooks-ts";

import QrCode from "../../../../public/img/qrCode.png";

import { HeaderLink } from "./headerLink";
export const ResponsiveMenuModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { width } = useWindowSize();
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      placement="center right"
      closeOnClickOutside
      className="flex flex-col border-primary bg-level-0 border-x w-screen h-screen md:max-w-md overflow-x-hidden overflow-y-auto"
    >
      <Modal.Title className="flex justify-between items-center py-4 pl-4">
        <Typography.Text size="lg" bold>
          Menu
        </Typography.Text>
        <Button.Icon
          variant="ghost"
          size="lg"
          appearance="secondary"
          rounded
          onClick={() => onOpenChange(false)}
        >
          <XMarkIcon />
        </Button.Icon>
      </Modal.Title>
      <Modal.Content className="flex flex-col flex-1">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-10 p-4">
            {width <= 1024 && (
              <div className="flex flex-col gap-8">
                <Typography.Text appearance="secondary">
                  Quick links
                </Typography.Text>
                <div className="flex flex-col gap-5">
                  <HeaderLink.Single size="lg" href="/" className="text-lg">
                    Trade
                  </HeaderLink.Single>
                  <HeaderLink.Single size="lg" href="/" className="text-lg">
                    Markets
                  </HeaderLink.Single>
                  <HeaderLink.Accordion
                    items={[
                      { href: "/", label: "Community support" },
                      { href: "/", label: "Orderbook guide" },
                      { href: "/", label: "FAQ" },
                    ]}
                  >
                    Help
                  </HeaderLink.Accordion>
                  <HeaderLink.Accordion
                    items={[
                      { href: "/", label: "Listings" },
                      { href: "/", label: "Terms of use" },
                      { href: "/", label: "Privacy policy" },
                      { href: "/", label: "Disclaimer" },
                      { href: "/", label: "Excluded Jurisdictions" },
                      { href: "/", label: "Data Retention Policy" },
                    ]}
                  >
                    More
                  </HeaderLink.Accordion>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-8">
              <Typography.Text appearance="secondary">
                General settings
              </Typography.Text>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GlobeAltIcon className="w-4 h-4 text-primary" />
                    <Typography.Text size="lg">Language</Typography.Text>
                  </div>
                  <Typography.Text appearance="primary">
                    English
                  </Typography.Text>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MoonIcon className="w-4 h-4 text-primary" />
                    <Typography.Text size="lg">Appearance</Typography.Text>
                  </div>
                  <Typography.Text appearance="primary">
                    Dark Mode
                  </Typography.Text>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SwatchIcon className="w-4 h-4 text-primary" />
                    <Typography.Text size="lg">Color Prefence</Typography.Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-success-base" />
                    <div className="w-4 h-4 bg-danger-base" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-primary p-4">
            <Image
              src={QrCode}
              placeholder="blur"
              alt="padlock"
              style={{
                width: "100%",
                height: "auto",
              }}
              className="max-w-[80px]"
            />
            <div className="flex flex-col gap-2">
              <Typography.Heading>Download Polkadex App</Typography.Heading>
              <Typography.Paragraph size="sm" appearance="primary">
                Take Polkadex Orderbook with you and trade anywhere you want
                with the Polkadex App.
              </Typography.Paragraph>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
