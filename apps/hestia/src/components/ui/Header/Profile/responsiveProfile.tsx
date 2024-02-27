"use client";

import { Popover } from "@polkadex/ux";
import { useMemo } from "react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { Content } from "./content";
import { Trigger } from "./trigger";

export const ResponsiveProfile = () => {
  const { selectedWallet, selectedAccount } = useConnectWalletProvider();

  const tradingWalletPresent = useMemo(
    () => !!Object.keys(selectedAccount ?? {})?.length,
    [selectedAccount]
  );

  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );
  return (
    <Popover>
      <Popover.Trigger superpositionTrigger>
        <Trigger
          responsive
          browserAccountPresent={tradingWalletPresent}
          extensionAccountPresent={fundWalletPresent}
          extensionAccountName={selectedWallet?.name ?? ""}
          browserAccountAddress={selectedAccount?.address ?? ""}
        />
      </Popover.Trigger>
      <Popover.Content sideOffset={10}>
        <Content />
      </Popover.Content>
      <Popover.Overlay className="z-[10]" />
    </Popover>
  );
};
