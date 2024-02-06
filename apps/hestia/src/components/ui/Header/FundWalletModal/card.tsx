import { Typography } from "@polkadex/ux";
import classNames from "classnames";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import Link from "next/link";

import { Icons } from "../..";

interface CardProps extends ComponentPropsWithoutRef<"a"> {
  title: string;
  description?: string;
  icon?: keyof typeof Icons;
}

export const Card = ({
  title,
  description,
  children,
  href = "#",
  icon,
  ...props
}: PropsWithChildren<CardProps>) => {
  const IconComponent = Icons[icon ?? "Bridge"];
  return (
    <Link
      href={href}
      className={classNames(
        "flex items-center gap-4 p-4 hover:bg-level-1 transition-colors duration-200"
      )}
      {...props}
    >
      <div className="grid place-content-center min-w-[28px] min-h-[28px] w-7 h-7 rounded-md bg-level-2">
        <IconComponent className="w-4 h-4 text-primary" />
      </div>
      <div className="flex flex-col gap-1">
        <Typography.Text bold>{title}</Typography.Text>
        <div className="flex flex-col gap-2">
          {description && (
            <Typography.Text appearance="primary">
              {description}
            </Typography.Text>
          )}
          {children}
        </div>
      </div>
    </Link>
  );
};
