import { Button } from "@polkadex/ux";
import Link from "next/link";
import { RiExternalLinkLine } from "@remixicon/react";

import { Card } from "./card";

export const HowItWorks = () => {
  return (
    <div className="flex gap-4 p-8">
      <Card
        title="1. Trade on Orderbook 📈"
        description="Begin your journey by trading on the Orderbook platform, featuring 5 active pairs for a diverse trading experience."
      >
        <Button.Underline asChild className="p-0 gap-2 justify-start text-sm">
          <Link href="/">
            Start trading
            <RiExternalLinkLine className="w-3 h-3" />
          </Link>
        </Button.Underline>
      </Card>
      <Card
        title="2. Accumulate Points 🥇"
        description="Earn points as you trade, the amount of points changes based on factors like volume, participants, and more."
      >
        <Button.Underline asChild className="p-0 gap-2 justify-start text-sm">
          <Link href="/">
            Discover how the points are calculated
            <RiExternalLinkLine className="w-3 h-3" />
          </Link>
        </Button.Underline>
      </Card>
      <Card
        title="3. Claim your rewards 🏆"
        description="Claim your well-deserved rewards every 28 days based on the points you've accumulated from trading."
      />
    </div>
  );
};
