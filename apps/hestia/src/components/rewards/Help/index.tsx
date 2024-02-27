"use client";

import { Button } from "@polkadex/ux";
import { forwardRef } from "react";
import { RiExternalLinkLine } from "@remixicon/react";

import { Card } from "./card";

export const Help = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex items-center">
      <Card title="Having Trouble?" description="Feel free to get in touch.">
        <Button.Icon variant="outline">
          <RiExternalLinkLine className="w-full h-full" />
        </Button.Icon>
      </Card>
    </div>
  );
});

Help.displayName = "Help";
