import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Icon, Loading, Typography } from "@polkadex/ux";
import type { IconsProps } from "@polkadex/ux";

import { ErrorMessage } from ".";

interface GenericHorizontalCardProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  icon: IconsProps;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
}
export const GenericHorizontalCard = ({
  title,
  icon,
  children,
  loading,
  error,
  disabled,
  ...props
}: PropsWithChildren<GenericHorizontalCardProps>) => {
  const isStringType = typeof children === "string";

  return (
    <Loading.Spinner active={!!loading}>
      <div
        {...props}
        role="button"
        className={`flex flex-col gap-3 group cursor-pointer ${
          disabled && "opacity-40 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between p-2 rounded-md border border-primary group-hover:bg-level-1 duration-300 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4">
              <Icon
                name={icon}
                className="text-primary group-hover:text-current transition-colors duration-300"
              />
            </div>
            <Typography.Text
              appearance="primary"
              className="group-hover:text-current transition-colors duration-300"
            >
              {title}
            </Typography.Text>
          </div>
          {isStringType ? (
            <div className="bg-secondary-base text-sm px-2 py-1 rounded-sm">
              {children}
            </div>
          ) : (
            children
          )}
        </div>
        {error && !loading && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </Loading.Spinner>
  );
};
