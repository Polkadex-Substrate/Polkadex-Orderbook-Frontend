"use client";

import { Button } from "@polkadex/ux";
import { forwardRef } from "react";
import { RiExternalLinkLine } from "@remixicon/react";
import Link from "next/link";

import { Card } from "./card";

export const Help = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center max-md:flex-col border-t border-primary"
    >
      <Card title="Having Trouble?" description="Feel free to get in touch.">
        <Link href="https://discord.gg/G4KMw2sGGe" target="_blank">
          <Button.Icon variant="outline">
            <RiExternalLinkLine className="w-full h-full" />
          </Button.Icon>
        </Link>
      </Card>
      <Card
        title="Deposit, Withdrawal, and Transfer differences"
        description="We'll guide you through these new processes on a quick tour."
      >
        <Button.Outline
          appearance="secondary"
          disabled
          className="w-fit"
          size="sm"
        >
          Open tour
        </Button.Outline>
      </Card>
    </div>
  );
});
Help.displayName = "Help";
