import { Button, Drawer, TokenAppearance } from "@polkadex/ux";
import { Dispatch, SetStateAction, useMemo } from "react";
import Link from "next/link";
import { getChainFromTicker } from "@orderbook/core/helpers";
import { useTheaProvider } from "@orderbook/core/providers";

import { AssetsProps } from "./columns";

import { ResponsiveCard, TokenCard } from "@/components/ui/ReadyToUse";
import { formatAmount } from "@/helpers";
export const ResponsiveTable = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: AssetsProps | null;
}) => {
  const { sourceChain, destinationChain } = useTheaProvider();
  const formattedSourceBalance = useMemo(
    () => formatAmount(data?.sourceBalance ?? 0),
    [data?.sourceBalance]
  );

  const formattedDestinationBalance = useMemo(
    () => formatAmount(data?.destinationBalance ?? 0),
    [data?.destinationBalance]
  );
  const name = useMemo(
    () => getChainFromTicker(data?.ticker ?? ""),
    [data?.ticker]
  );

  if (!data) return null;

  return (
    <Drawer
      closeOnClickOutside
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <Drawer.Content className="flex flex-col gap-4 p-4">
        <ResponsiveCard label="Asset">
          <TokenCard
            tokenName={name}
            ticker={data.ticker}
            icon={data.ticker as TokenAppearance}
          />
        </ResponsiveCard>
        <ResponsiveCard label={`${sourceChain?.name} Balance`}>
          {formattedSourceBalance}
        </ResponsiveCard>
        <ResponsiveCard label={`${destinationChain?.name} Balance`}>
          {formattedDestinationBalance}
        </ResponsiveCard>
      </Drawer.Content>
      <Drawer.Footer className="flex flex-col gap-2 p-4">
        <Button.Solid asChild>
          <Link href="/">Bridge</Link>
        </Button.Solid>
        <Button.Solid appearance="secondary" asChild>
          <Link href="/">Trade</Link>
        </Button.Solid>
      </Drawer.Footer>
    </Drawer>
  );
};
