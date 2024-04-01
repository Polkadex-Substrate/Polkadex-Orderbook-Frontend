import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Dropdown,
  Modal,
  Token,
  Typography,
  tokenAppearance,
} from "@polkadex/ux";
import { RiCloseLine, RiArrowDownSLine } from "@remixicon/react";
import Link from "next/link";
import { getChainFromTicker, useAssets } from "@orderbook/core/index";

import { Card } from "./card";

export const FundWalletModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const { assets } = useAssets();

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      placement="top right"
      closeOnClickOutside
      className="flex flex-col border-primary bg-level-0 border-x w-screen min-h-webKit md:max-w-md overflow-x-hidden overflow-y-auto"
    >
      <Modal.Title className="flex justify-between items-center py-4 pl-4">
        <Typography.Text size="lg" bold>
          Fund Account
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
      <Modal.Content className="flex flex-col flex-1 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-4">
            <Typography.Text appearance="secondary">
              I have crypto assets on another network
            </Typography.Text>
            <span className="bg-primary-base px-1 py-0.5 rounded-sm text-xs font-medium">
              Step 1
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Card
              icon="Bridge"
              title="Decentralized bridge"
              description="Bridge your crypto to Polkadex and vice versa."
            >
              <div className="flex justify-between gap-2 sm:items-center max-sm:flex-col">
                <Dropdown>
                  <Dropdown.Trigger className="flex-1 flex justify-between items-center text-sm bg-level-2 rounded-md px-2 py-1">
                    Polkadot-based
                    <RiArrowDownSLine className="w-3 h-3" />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Label className="[&>span]:text-sm">
                      Token/Chain
                    </Dropdown.Label>
                    {assets?.map((asset) => {
                      const chainName = getChainFromTicker(asset.ticker);
                      return (
                        !asset.isEvm && (
                          <Dropdown.Item
                            key={asset.id}
                            onClick={() =>
                              window.open(
                                `https://thea.polkadex.trade/?chain=${encodeURIComponent(chainName)}`
                              )
                            }
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Token
                                name={asset.ticker}
                                size="xs"
                                className="rounded-full border border-primary max-sm:w-5 max-sm:h-5"
                                appearance={
                                  asset.ticker as keyof typeof tokenAppearance
                                }
                              />
                              <Typography.Text size="sm">
                                {asset.ticker} ({chainName})
                              </Typography.Text>
                            </div>
                          </Dropdown.Item>
                        )
                      );
                    })}
                  </Dropdown.Content>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Trigger className="flex-1 flex justify-between items-center text-sm bg-level-2 rounded-md px-2 py-1">
                    EVM-based
                    <RiArrowDownSLine className="w-3 h-3" />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Label className="[&>span]:text-sm">
                      Token/Chain
                    </Dropdown.Label>
                    {assets?.map((asset) => {
                      const chainName = getChainFromTicker(asset.ticker);
                      return (
                        asset.isEvm && (
                          <Dropdown.Item
                            key={asset.id}
                            onClick={() =>
                              window.open(
                                `https://thea.polkadex.trade/?chain=${encodeURIComponent(chainName)}`
                              )
                            }
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Token
                                name={asset.ticker}
                                size="xs"
                                className="rounded-full border border-primary max-sm:w-5 max-sm:h-5"
                                appearance={
                                  asset.ticker as keyof typeof tokenAppearance
                                }
                              />
                              <Typography.Text size="sm">
                                {asset.ticker} ({chainName})
                              </Typography.Text>
                            </div>
                          </Dropdown.Item>
                        )
                      );
                    })}
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-4">
            <Typography.Text appearance="secondary">
              I have crypto assets on Polkadex
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
              href="/transfer/USDT?type=deposit"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="px-4">
            <Typography.Text appearance="secondary">
              I don&apos;t have crypto assets yet
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-2">
            <Card
              disabled
              icon="FreeCoin"
              title="Get 1 PDEX for free"
              description="Complete some tasks and get 1 free PDEX"
              href="/"
            />
            <Card
              icon="CreditCard"
              title="Credit card"
              description="Buy PDEX with our credit card partner Simplex"
              href="https://buy.simplex.com"
              target="_blank"
            />
            <Card icon="CentralizedExchange" title="Centralized exchanges">
              <div className="flex items-center gap-2 flex-wrap">
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link
                    href="https://www.kucoin.com/trade/PDEX-USDT?rcode=rPH7VCS"
                    target="_blank"
                  >
                    Kucoin
                  </Link>
                </Button.Solid>
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link
                    href="https://www.gate.io/trade/PDEX_USDT"
                    target="_blank"
                  >
                    Gate.io
                  </Link>
                </Button.Solid>
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link
                    href="https://ascendex.com/en/cashtrade-spottrading/usdt/pdex"
                    target="_blank"
                  >
                    AscendEX
                  </Link>
                </Button.Solid>
                <Button.Solid
                  appearance="secondary"
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link
                    href="https://coindcx.com/trade/PDEXINR"
                    target="_blank"
                  >
                    CoinDCX
                  </Link>
                </Button.Solid>
              </div>
            </Card>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
