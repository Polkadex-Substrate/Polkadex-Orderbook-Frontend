import { Drawer, Token, TokenAppearance, Typography } from "@polkadex/ux";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Transaction, networks } from "@orderbook/core/index";

import { NetworkCard } from "./networkCard";

import { ResponsiveCard, StatusCard } from "@/components/ui/ReadyToUse";
import { formatedDate } from "@/helpers";

export const ResponsiveTable = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: Transaction | null;
}) => {
  const { asset, amount, status = "", from, to, timestamp } = data ?? {};
  const ready = useMemo(
    () => ["CLAIMED", "APPROVED", "READY"].includes(status),
    [status]
  );
  const polkadotNetwork = networks[0]; // temp

  const isFromPolkadotNetwork = useMemo(
    () => from?.genesis?.includes(polkadotNetwork),
    [from?.genesis, polkadotNetwork]
  );

  const isToPolkadotNetwork = useMemo(
    () => to?.genesis?.includes(polkadotNetwork),
    [to?.genesis, polkadotNetwork]
  );
  const date = useMemo(
    () => timestamp && formatedDate(new Date(timestamp), false),
    [timestamp]
  );

  if (!data) return null;

  return (
    <Drawer
      closeOnClickOutside
      shouldScaleBackground={false}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Drawer.Title className="px-4">Transaction info</Drawer.Title>
      <Drawer.Content className="flex flex-col gap-4 p-4">
        <ResponsiveCard label="Token">
          <div className="flex items-center gap-1">
            <Token name={asset?.ticker as TokenAppearance} size="xs" />
            <Typography.Text>{asset?.ticker}</Typography.Text>
          </div>
        </ResponsiveCard>
        <ResponsiveCard label="Status">
          <StatusCard status={ready ? "Completed" : "Pending"} />
        </ResponsiveCard>
        <ResponsiveCard label="Amount">{amount?.toFormat()}</ResponsiveCard>
        <ResponsiveCard label="From">
          <NetworkCard
            name={from?.name}
            isPolkadotEcosystem={isFromPolkadotNetwork}
          />
        </ResponsiveCard>
        <ResponsiveCard label="To">
          <NetworkCard
            name={to?.name}
            isPolkadotEcosystem={isToPolkadotNetwork}
          />
        </ResponsiveCard>
        <ResponsiveCard label="Destination address">
          0x00000000000
        </ResponsiveCard>
        <ResponsiveCard label="Date">{date}</ResponsiveCard>
      </Drawer.Content>
    </Drawer>
  );
};
