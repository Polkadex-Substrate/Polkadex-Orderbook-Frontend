"use client";

import { Bars2Icon, BellIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Button, Icons, Popover, Tooltip } from "@polkadex/ux";
import { useMemo } from "react";
import Link from "next/link";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useWindowSize } from "react-use";

import { Trigger } from "./trigger";
import { Content } from "./content";

export const Profile = ({
  onClick,
  onOpenMenu,
  onOpenNotifications,
  onOpenFundWallet,
}: {
  onClick: () => void;
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
  onOpenFundWallet: () => void;
  showFundingWallet: boolean;
}) => {
  const { width } = useWindowSize();
  const { selectedWallet, selectedAccount } = useConnectWalletProvider();

  // Move to useConnectWalletProvider
  const tradingWalletPresent = useMemo(
    () => !!Object.keys(selectedAccount ?? {})?.length,
    [selectedAccount]
  );
  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );
  const responsiveView = useMemo(() => width > 640, [width]);

  if (tradingWalletPresent || fundWalletPresent)
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button.Solid size="2sm" onClick={onOpenFundWallet}>
            Fund Account
          </Button.Solid>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button.Icon className="max-sm:p-0">
                <Link href="/balances">
                  <Icons.Wallet className="h-full w-full" />
                </Link>
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Balances</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button.Icon asChild>
                <Link href="/history">
                  <BookOpenIcon className="h-full w-full" />
                </Link>
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>History</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button.Icon onClick={onOpenNotifications}>
                <BellIcon className="h-full w-full" />
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Notifications</Tooltip.Content>
          </Tooltip>
        </div>
        {responsiveView && (
          <Popover>
            <Popover.Trigger superpositionTrigger>
              <Trigger
                browserAccountPresent={tradingWalletPresent}
                extensionAccountPresent={fundWalletPresent}
                extensionAccountName={selectedWallet?.name ?? ""}
                browserAccountAddress={selectedAccount?.address ?? ""}
              />
            </Popover.Trigger>
            <Popover.Content>
              <Content />
            </Popover.Content>
            <Popover.Overlay className="z-[10]" />
          </Popover>
        )}

        <Button.Icon variant="ghost" onClick={onOpenMenu}>
          <Bars2Icon className="h-full w-full" />
        </Button.Icon>
      </div>
    );
  return (
    <div>
      <Button.Solid size="2sm" className="font-medium" onClick={onClick}>
        Connect wallet
      </Button.Solid>
    </div>
  );
};
