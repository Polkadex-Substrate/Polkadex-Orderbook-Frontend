import {
  Accordion,
  Typography,
  Interaction,
  Dropdown,
  Token,
  TokenAppearance,
  HoverCard,
  Separator,
} from "@polkadex/ux";
import { MINIMUM_PDEX_REQUIRED } from "@orderbook/core/constants";
import { useState } from "react";
import { getChainFromTicker, useAssets } from "@orderbook/core/index";
import Link from "next/link";
import classNames from "classnames";

import { GenericInfoCard, GenericExternalCard } from "../ReadyToUse";
import { Icons } from "..";

const filteredAssets = [
  "222121451965151777636299756141619631150",
  "95930534000017180603917534864279132680",
  "226557799181424065994173367616174607641",
  "3496813586714279103986568049643838918",
];

const activeAssets = ["95930534000017180603917534864279132680"];

export const InsufficientBalance = ({
  onClose,
  balance,
  fee = MINIMUM_PDEX_REQUIRED,
}: {
  balance?: number;
  fee?: number;
  onClose: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { assets } = useAssets();

  return (
    <Interaction className="w-full gap-3">
      <Interaction.Content className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-5 border-b border-primary">
          <div className="flex flex-col gap-2 items-center text-center">
            <Icons.PdexToken className="max-w-[4rem] w-full" />
            <Typography.Heading size="lg">
              The CEXier DEX runs on PDEX
            </Typography.Heading>
            <Typography.Text appearance="primary">
              You need some PDEX to cover the existential deposit and the small
              transaction fee to create your trading account.
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-1 pb-3">
            <GenericInfoCard label="Your balance">
              {balance} PDEX
            </GenericInfoCard>
            <GenericInfoCard label="Balance required">
              {fee} PDEX
            </GenericInfoCard>
          </div>
        </div>
        <Accordion type="single" defaultValue="accordion1">
          <Accordion.Item value="accordion1">
            <Accordion.Trigger>
              <Typography.Heading type="h4" size="sm" className="mb-4">
                Explore ways to get PDEX
              </Typography.Heading>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-2">
                <div className="group flex flex-col gap-1 rounded-md py-2 border border-primary hover:bg-level-1 duration-300 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 px-3">
                    <div className="grid place-content-center w-7 h-7 rounded-md bg-level-1">
                      <Icons.Bridge className="w-4 h-4 text-primary" />
                    </div>
                    <Typography.Text className="group-hover:text-current duration-300 transition-colors">
                      THEA - Decentralized bridge
                    </Typography.Text>
                  </div>
                  <Separator.Horizontal />
                  <div className="flex flex-col">
                    <Typography.Text
                      appearance="primary"
                      size="xs"
                      className="self-center"
                    >
                      Activate your account with a transfer of:
                    </Typography.Text>
                    <div className="flex flex-items gap-1">
                      {assets
                        ?.filter((e) => filteredAssets.includes(e.id))
                        .sort(
                          (a, b) =>
                            (activeAssets.includes(a.id) ? 0 : -1) -
                            (activeAssets.includes(b.id) ? 0 : -1)
                        )
                        .map((asset) => {
                          const chainName = getChainFromTicker(asset.ticker);
                          const active = activeAssets.includes(asset.id);
                          if (asset.isEvm || asset.id === "PDEX") return null;
                          return (
                            <HoverCard key={asset.id}>
                              <HoverCard.Trigger asChild>
                                <Link
                                  href={`https://thea.polkadex.trade/?chain=${encodeURIComponent(chainName)}`}
                                  target="_blank"
                                  className={classNames(
                                    !active &&
                                      "pointer-events-none grayscale opacity-30",
                                    "flex flex-col items-center gap-1 px-3 pt-2 pb-1 hover:bg-level-3 rounded-sm duration-200 transition-colors"
                                  )}
                                >
                                  <Token
                                    name={asset.ticker}
                                    appearance={asset.ticker as TokenAppearance}
                                    size="xs"
                                    className="rounded-full border border-secondary"
                                  />
                                  <Typography.Text
                                    appearance="primary"
                                    size="xs"
                                  >
                                    {asset.ticker}
                                  </Typography.Text>
                                </Link>
                              </HoverCard.Trigger>
                              <HoverCard.Content side="top">
                                {chainName}
                              </HoverCard.Content>
                            </HoverCard>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <GenericExternalCard
                  title="Centralized exchanges"
                  icon="CentralizedExchange"
                  onClick={() => setOpen(true)}
                >
                  <Dropdown open={open} onOpenChange={setOpen}>
                    <Dropdown.Trigger className="gap-1">
                      <Typography.Text size="sm">All</Typography.Text>
                      <Dropdown.Icon />
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      {exchanges.map((e) => (
                        <Dropdown.Item
                          key={e.name}
                          onSelect={() =>
                            window.open(
                              e.href,
                              "_blank",
                              "noopener, noreferrer"
                            )
                          }
                        >
                          {e.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Content>
                  </Dropdown>
                </GenericExternalCard>
                <GenericExternalCard
                  title="Credit Card"
                  href="https://buy.simplex.com/"
                  icon="CreditCard"
                />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};

const exchanges = [
  {
    name: "Kucoin",
    href: "https://www.kucoin.com/trade/PDEX-USDT",
  },
  {
    name: "Gate.io",
    href: "https://www.gate.io/trade/PDEX_USDT",
  },
  {
    name: "AscendEX",
    href: "https://ascendex.com/en/cashtrade-spottrading/usdt/pdex",
  },
  {
    name: "CoinDCX",
    href: "https://coindcx.com/trade/PDEXINR",
  },
];
