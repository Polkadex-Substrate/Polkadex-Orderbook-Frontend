import { Button, Drawer } from "@polkadex/ux";
import { useRouter } from "next/navigation";

import { ResponsiveCard } from "./responsiveCard";

import { Data } from "./";

export const ResponsiveData = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: Data | null;
}) => {
  const router = useRouter();

  return (
    <Drawer closeOnClickOutside open={open} onClose={onClose}>
      <Drawer.Title className="px-4">
        {data?.ticker}/{data?.pair}
      </Drawer.Title>
      <Drawer.Content className="flex flex-col gap-2 p-4">
        <ResponsiveCard label="Score">{data?.score}</ResponsiveCard>
        <ResponsiveCard label="TVL">{data?.tvl}</ResponsiveCard>
        <ResponsiveCard label="APY">{data?.apy}</ResponsiveCard>
        <ResponsiveCard label="Volume 24h">{data?.vol24}</ResponsiveCard>
        <ResponsiveCard label="Volume 7d">{data?.vol7d}</ResponsiveCard>
      </Drawer.Content>
      <Drawer.Footer className="p-4">
        <Button.Solid
          appearance="secondary"
          className="w-full"
          onClick={() => router.push(`/analitycs/${data?.ticker}${data?.pair}`)}
        >
          Open metrics
        </Button.Solid>
      </Drawer.Footer>
    </Drawer>
  );
};
