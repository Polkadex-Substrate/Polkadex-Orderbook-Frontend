"use client";

import { Button } from "@polkadex/ux";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";

import { Card } from "./card";

export const Help = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex items-center max-md:flex-col">
      <Card title="Having Trouble?" description="Feel free to get in touch.">
        <Button.Icon variant="outline">
          <ArrowTopRightOnSquareIcon />
        </Button.Icon>
      </Card>
      <Card
        title="Deposit, Withdrawal, and Transfer differences"
        description="We'll guide you through these new processes on a quick tour."
      >
        <Button.Outline
          appearance="secondary"
          onClick={() => window.alert("Testing")}
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
