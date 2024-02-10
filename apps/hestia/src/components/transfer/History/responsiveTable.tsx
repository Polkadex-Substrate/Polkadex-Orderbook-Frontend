import { Drawer, Token, Typography, truncateString } from "@polkadex/ux";
import { Dispatch, SetStateAction } from "react";

import { DepositData } from "./columns";

import {
  ResponsiveCard,
  StatusCard,
  TransactionDirection,
} from "@/components/ui/ReadyToUse";
export const ResponsiveTable = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: DepositData | null;
}) => {
  if (!data) return null;
  const { token, status, amount, fee, wallets, timestamp } = data;
  return (
    <Drawer closeOnClickOutside open={open} onOpenChange={onOpenChange}>
      <Drawer.Title className="px-4">
        {token.ticker}/{token.name}
      </Drawer.Title>
      <Drawer.Content className="flex flex-col gap-4 p-4">
        <ResponsiveCard label="Token">
          <div className="flex items-center gap-1">
            <Token name={token.ticker} size="xs" />
            <Typography.Text>{token.ticker}</Typography.Text>
          </div>
        </ResponsiveCard>
        <ResponsiveCard label="Status">
          <StatusCard status={status} />
        </ResponsiveCard>
        <ResponsiveCard label="Amount">{amount}</ResponsiveCard>
        <ResponsiveCard label="Fees">{fee}</ResponsiveCard>
        <ResponsiveCard label="From/To">
          <TransactionDirection
            tooltipable={wallets.fromWalletType === "Trading Account"}
            fromType={wallets.fromWalletType}
            fromName={wallets.fromWalletName}
            fromAddress={truncateString(wallets.fromWalletAddress)}
            toType={wallets.toWalletType}
          />
        </ResponsiveCard>
        <ResponsiveCard label="Date">{timestamp}</ResponsiveCard>
      </Drawer.Content>
    </Drawer>
  );
};
