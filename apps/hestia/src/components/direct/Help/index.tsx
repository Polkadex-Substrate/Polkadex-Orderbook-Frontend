"use client";

import { Button } from "@polkadex/ux";
import { forwardRef } from "react";
import { RiBookOpenLine, RiFeedbackLine } from "@remixicon/react";

import { Card } from "./card";

export const Help = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-start max-md:flex-col max-md:gap-4 w-full max-lg:pb-4 border-t border-primary"
    >
      <Card
        title="Having Trouble?"
        description="Feel free to get in touch."
        href="https://discord.gg/G4KMw2sGGe"
        target="_blank"
      >
        <Button.Icon
          size="2sm"
          appearance="secondary"
          className="rounded-md bg-secondary-base pointer-events-none"
        >
          <RiFeedbackLine className="w-full h-full" />
        </Button.Icon>
      </Card>
    </div>
  );
});
Help.displayName = "Help";
