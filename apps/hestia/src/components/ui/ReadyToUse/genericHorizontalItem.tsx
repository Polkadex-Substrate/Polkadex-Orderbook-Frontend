import { ComponentProps } from "react";
import { Tooltip, Typography, typeofChildren } from "@polkadex/ux";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiInformationLine } from "@remixicon/react";

interface Props extends ComponentProps<"div"> {
  label: string;
  tooltip?: string;
}
export const GenericHorizontalItem = ({
  label,
  tooltip,
  children,
  className,
  ...props
}: Props) => {
  const isString = typeofChildren(children);
  return (
    <div
      className={twMerge(
        classNames("flex items-cneter justify-between gap-2 px-3 py-3"),
        className
      )}
      {...props}
    >
      {tooltip ? (
        <Tooltip>
          <Tooltip.Trigger>
            <div className="flex items-center gap-1">
              <RiInformationLine className="w-3.5 h-3.5 text-primary" />
              <Typography.Text appearance="primary">{label}</Typography.Text>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content className="max-w-[250px]" side="left">
            {tooltip}
          </Tooltip.Content>
        </Tooltip>
      ) : (
        <Typography.Text appearance="primary">{label}</Typography.Text>
      )}
      {isString ? <Typography.Text>{children}</Typography.Text> : children}
    </div>
  );
};
