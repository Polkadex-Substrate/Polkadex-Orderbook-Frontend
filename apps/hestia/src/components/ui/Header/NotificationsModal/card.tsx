import { Button, Typography } from "@polkadex/ux";
import {
  RiArrowRightSLine,
  RiExternalLinkLine,
  RiDeleteBin5Line,
  RiCheckDoubleFill,
} from "@remixicon/react";
import classNames from "classnames";
import { ComponentProps, PropsWithChildren } from "react";

interface CardProps extends ComponentProps<"div"> {
  date: string;
  title: string;
  active?: boolean;
  href?: string;
}

export const Card = ({
  date,
  title,
  active,
  href,
  children,
  ...props
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-4 p-4 hover:bg-level-1 transition-colors duration-200 cursor-pointer group",
        !active && "opacity-40"
      )}
      {...props}
    >
      <div
        className={classNames(
          "min-w-[10px] min-h-[10px] w-2.5 h-2.5 rounded-full",
          active ? "bg-primary-base" : "bg-secondary-base"
        )}
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <div className="flex max-sm:flex-col-reverse sm:items-center justify-between gap-2">
            <Typography.Text bold>{title}</Typography.Text>
            <Typography.Text size="xs" appearance="secondary">
              {date}
            </Typography.Text>
          </div>
          <div className="opacity-0 group-hover:opacity-100 flex bg-level-2/50 rounded shadow-lg">
            {active && (
              <Button.Icon size="2sm" variant="ghost">
                <RiCheckDoubleFill className="w-full h-full" />
              </Button.Icon>
            )}
            <Button.Icon size="2sm" variant="ghost">
              <RiDeleteBin5Line className="w-full h-full" />
            </Button.Icon>
            {href && (
              <Button.Icon size="2sm" variant="ghost">
                <RiExternalLinkLine className="w-full h-full" />
              </Button.Icon>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Typography.Text appearance="primary">{children}</Typography.Text>
          <RiArrowRightSLine className="min-w-[16px] min-h-[16px] w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
};
