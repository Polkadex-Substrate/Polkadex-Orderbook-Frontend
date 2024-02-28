"use client";

import classNames from "classnames";
import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { ElementType } from "react";
import { Typography } from "@polkadex/ux";

export const ProviderCard = ({
  selected,
  title,
  action,
  installed = true,
  icon,
}: {
  selected?: boolean;
  title: string;
  action: () => void;
  icon: string;
  installed?: boolean;
}) => {
  const IconComponent = getExtensionIcon(icon) as ElementType;
  return (
    <div
      className={classNames(
        "flex justify-between items-center gap-3 px-4 py-2 rounded-sm",
        installed &&
          !selected &&
          "hover:bg-level-3 duration-300 transition-colors",
        selected && "bg-level-4"
      )}
      role="button"
      onClick={installed ? action : undefined}
    >
      <div
        className={classNames(
          "flex justify-between items-center gap-3",
          !installed && "opacity-30"
        )}
      >
        <div className="w-5 h-5">
          <IconComponent />
        </div>
        <Typography.Text size="xs" className="whitespace-nowrap max-sm:hidden">
          {title}
        </Typography.Text>
      </div>
    </div>
  );
};
