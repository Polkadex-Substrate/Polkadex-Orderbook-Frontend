import React, { Dispatch, SetStateAction } from "react";
import { Button, Dropdown, Modal, Typography } from "@polkadex/ux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Card } from "./card";

export const FundWalletModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
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
          Fund Wallet
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
      <Modal.Content className="flex flex-col flex-1 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-4">
            <Typography.Text appearance="secondary">
              I have crypto asset in another chain
            </Typography.Text>
            <span className="bg-primary-base px-1 py-0.5 rounded-sm text-xs font-medium">
              Step 1
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Card
              icon="Bridge"
              title="Decentralized bridge"
              description="Bridge your crypto from Polkadot, Kusama & Parachains to Polkadex chain and vice versa."
            >
              <div className="flex justify-between gap-2 items-center">
                <Dropdown>
                  <Dropdown.Trigger className="flex-1 flex justify-between items-center text-sm bg-level-2 rounded-md px-2 py-1">
                    Polkadot-based
                    <ChevronDownIcon className="w-3 h-3" />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Label>Token/Chain</Dropdown.Label>
                    <Dropdown.Item>USDT (Asset Hub chain)</Dropdown.Item>
                    <Dropdown.Item>DOT (Polkadot chain)</Dropdown.Item>
                    <Dropdown.Item>PHA (Phala chain)</Dropdown.Item>
                    <Dropdown.Item>GLMR (Moombeam chain)</Dropdown.Item>
                    <Dropdown.Item>ASTR (Astar chain)</Dropdown.Item>
                    <Dropdown.Item>IBTC (Interlay chain)</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Trigger className="flex-1 flex justify-between items-center text-sm bg-level-2 rounded-md px-2 py-1">
                    Ethereym-based
                    <ChevronDownIcon className="w-3 h-3" />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Label>Token/Chain</Dropdown.Label>
                    <Dropdown.Item>Soon</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-4">
            <Typography.Text appearance="secondary">
              I have crypto asset in Polkadex chain
            </Typography.Text>
            <span className="bg-primary-base px-1 py-0.5 rounded-sm text-xs font-medium">
              Step 2
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Card
              icon="TransferToTrading"
              title="Transfer to trading account"
              description="Move funds from your funding account to your trading account."
              href="/transfer"
            />
            <Card
              icon="TransferToFunding"
              title="Transfer to funding account"
              description="Move funds from your trading account to your funding account."
              href="/transfer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="px-4">
            <Typography.Text appearance="secondary">
              I don&apos;t have crypto assets
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-2">
            <Card
              icon="FreeCoin"
              title="Get 1 PDEX for free"
              description="Complete some tasks and get 1 free PDEX!"
              href="/"
            />
            <Card
              icon="CreditCard"
              title="Credit card"
              description="Buy PDEX with one of our partners like Simplex."
              href="https://buy.simplex.com"
              target="_blank"
            />
            <Card
              icon="CentralizedExchange"
              title="Centralized exchanges"
              href="/"
            >
              <div className="flex items-center gap-2">
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                >
                  <Link href="/">Kucoin</Link>
                </Button.Solid>
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                >
                  <Link href="/">Gate.io</Link>
                </Button.Solid>
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                >
                  <Link href="/">AscendEX</Link>
                </Button.Solid>
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                >
                  <Link href="/">CoinDCX</Link>
                </Button.Solid>
              </div>
            </Card>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
