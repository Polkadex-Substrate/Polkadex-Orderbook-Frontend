"use client";

import { Popover } from "@polkadex/ux";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { Content } from "./content";
import { Trigger } from "./trigger";

export const ResponsiveProfile = ({
  browserAccountPresent,
  extensionAccountPresent,
}: {
  browserAccountPresent: boolean;
  extensionAccountPresent: boolean;
}) => {
  const { selectedWallet, selectedAccount } = useConnectWalletProvider();

  return browserAccountPresent || extensionAccountPresent ? (
    <Popover>
      <Popover.Trigger>
        <Trigger
          responsive
          browserAccountPresent={browserAccountPresent}
          extensionAccountPresent={extensionAccountPresent}
          extensionAccountName={selectedWallet?.name ?? ""}
          browserAccountName={selectedAccount?.meta.name ?? ""}
        />
      </Popover.Trigger>
      <Popover.Content sideOffset={10}>
        <Content />
      </Popover.Content>
      <Popover.Overlay />
    </Popover>
  ) : null;
};
