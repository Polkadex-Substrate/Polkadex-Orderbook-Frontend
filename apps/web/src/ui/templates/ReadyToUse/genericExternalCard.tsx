import { PropsWithChildren } from "react";
import { Icon, Typography } from "@polkadex/ux";
import type { IconsProps } from "@polkadex/ux";

export const GenericExternalCard = ({
  icon,
  href,
  children,
}: PropsWithChildren<{
  icon: IconsProps;
  href: string;
}>) => {
  return (
    <a
      href={href}
      target="_blank"
      className="group flex items-center justify-between gap-2 rounded-md p-3 border border-level-5 hover:bg-level-4 duration-300 transition-colors"
      rel="noreferrer"
    >
      <div className="flex items-center gap-3">
        <Icon name={icon} className="w-4 h-4 text-primary " />
        <Typography.Text
          appearance="primary"
          className="group-hover:text-current duration-300 transition-colors"
        >
          {children}
        </Typography.Text>
      </div>
      <Icon
        name="Export"
        className="w-3 h-3 text-secondary group-hover:text-current duration-300 transition-colors"
      />
    </a>
  );
};
