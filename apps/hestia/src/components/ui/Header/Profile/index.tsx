"use client";

import { Bars2Icon, BellIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Button, Icons, Popover, Tooltip } from "@polkadex/ux";
import { useMemo } from "react";
import Link from "next/link";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

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

  if (tradingWalletPresent || fundWalletPresent)
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button.Solid size="2sm" onClick={onOpenFundWallet}>
            Fund wallet
          </Button.Solid>
          <Tooltip>
            <Tooltip.Trigger>
              <Button.Icon asChild>
                <Link href="/balances">
                  <Icons.Wallet />
                </Link>
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Balances</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger>
              <Button.Icon asChild>
                <Link href="/transactions">
                  <BookOpenIcon />
                </Link>
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Transactions</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger>
              <Button.Icon onClick={onOpenNotifications}>
                <BellIcon />
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Notifications</Tooltip.Content>
          </Tooltip>
        </div>
        <Popover>
          <Popover.Trigger>
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
        </Popover>
        <Button.Icon variant="ghost" onClick={onOpenMenu}>
          <Bars2Icon />
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
