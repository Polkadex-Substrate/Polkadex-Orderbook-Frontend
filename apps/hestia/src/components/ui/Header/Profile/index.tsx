"use client";

import { Button, Popover, Tooltip } from "@polkadex/ux";
import { useMemo } from "react";
import Link from "next/link";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useWindowSize } from "react-use";
import {
  RiBookReadLine,
  RiMenuLine,
  RiNotification3Line,
  RiWalletLine,
} from "@remixicon/react";

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
  const {
    selectedWallet,
    selectedAccount,
    browserAccountPresent,
    extensionAccountPresent,
  } = useConnectWalletProvider();

  const responsiveView = useMemo(() => width > 640, [width]);

  if (browserAccountPresent || extensionAccountPresent)
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
                  <RiWalletLine className="h-full w-full" />
                </Link>
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Balances</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button.Icon asChild>
                <Link href="/history">
                  <RiBookReadLine className="h-full w-full" />
                </Link>
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>History</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button.Icon onClick={onOpenNotifications}>
                <RiNotification3Line className="h-full w-full" />
              </Button.Icon>
            </Tooltip.Trigger>
            <Tooltip.Content>Notifications</Tooltip.Content>
          </Tooltip>
        </div>
        {responsiveView && (
          <Popover>
            <Popover.Trigger superpositionTrigger>
              <Trigger
                browserAccountPresent={browserAccountPresent}
                extensionAccountPresent={extensionAccountPresent}
                extensionAccountName={selectedWallet?.name ?? ""}
                browserAccountAddress={selectedAccount?.address ?? ""}
              />
            </Popover.Trigger>
            <Popover.Content>
              <Content />
            </Popover.Content>
            <Popover.Overlay />
          </Popover>
        )}

        <Button.Icon variant="ghost" onClick={onOpenMenu}>
          <RiMenuLine className="h-full w-full" />
        </Button.Icon>
      </div>
    );
  return (
    <div className="flex items-center gap-2">
      <Button.Solid size="2sm" className="font-medium" onClick={onClick}>
        Connect wallet
      </Button.Solid>
      <Button.Icon variant="ghost" onClick={onOpenMenu}>
        <RiMenuLine className="h-full w-full" />
      </Button.Icon>
    </div>
  );
};
