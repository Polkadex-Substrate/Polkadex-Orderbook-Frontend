"use client";

import { Button } from "@polkadex/ux";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";

import { Card } from "./card";

export const Help = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex items-center">
      <Card title="Having Trouble?" description="Feel free to get in touch.">
        <Button.Icon variant="outline">
          <ArrowTopRightOnSquareIcon />
        </Button.Icon>
      </Card>
    </div>
  );
});

Help.displayName = "Help";
