"use client";

import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { ElementType } from "react";
import { Typography } from "@polkadex/ux";
import classNames from "classnames";

import { Button } from "@/components/ui/Temp/button";

export const ProviderCard = ({
  title,
  action,
  installed = true,
  icon,
  href,
}: {
  title: string;
  action: () => void;
  icon: string;
  installed?: boolean;
  href?: string;
}) => {
  const IconComponent = getExtensionIcon(icon) as ElementType;
  return (
    <Button.Ghost
      appearance="quaternary"
      className="flex justify-between items-center gap-3 px-4 py-3.5 h-auto"
      onClick={action}
      disabled={!installed}
    >
      <div className="flex justify-between items-center gap-3">
        <div className={classNames("w-5 h-5", !installed && "opacity-50")}>
          <IconComponent />
        </div>
        <Typography.Text appearance={installed ? "base" : "secondary"}>
          {title}
        </Typography.Text>
      </div>
      {!installed && (
        <Button.Light asChild size="xs">
          <a href={`//${href}`} target="_blank" rel="noreferrer">
            Setup wallet
          </a>
        </Button.Light>
      )}
    </Button.Ghost>
  );
};
