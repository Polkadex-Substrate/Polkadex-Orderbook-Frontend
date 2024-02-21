"use client";

import { Button } from "@polkadex/ux";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import Link from "next/link";

import { Card } from "./card";

export const Help = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex items-center">
      <Card title="Having Trouble?" description="Feel free to get in touch.">
        <Link
          href="https://discord.com/channels/859180272335323166/1034160372954964089"
          target="_blank"
        >
          <Button.Icon variant="outline">
            <ArrowTopRightOnSquareIcon />
          </Button.Icon>
        </Link>
      </Card>
    </div>
  );
});

Help.displayName = "Help";
