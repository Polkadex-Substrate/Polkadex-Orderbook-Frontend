import { Typography } from "@polkadex/ux";
import { RiArrowRightSLine } from "@remixicon/react";
import classNames from "classnames";
import { ComponentProps, PropsWithChildren } from "react";

interface CardProps extends ComponentProps<"div"> {
  date: string;
  title: string;
  active?: boolean;
}

export const Card = ({
  date,
  title,
  active,
  children,
  ...props
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-4 p-4 hover:bg-level-1 transition-colors duration-200 cursor-pointer",
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
        <div className="flex max-sm:flex-col-reverse sm:items-center justify-between gap-2">
          <Typography.Text bold>{title}</Typography.Text>
          <Typography.Text size="xs" appearance="secondary">
            {date}
          </Typography.Text>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Typography.Text appearance="primary">{children}</Typography.Text>
          <RiArrowRightSLine className="min-w-[16px] min-h-[16px] w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
};
