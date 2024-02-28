import { ReactNode } from "react";
import { Typography } from "@polkadex/ux";
import { RiErrorWarningLine } from "@remixicon/react";

export const ErrorMessage = ({
  children,
  withIcon = true,
}: {
  children: ReactNode;
  withIcon?: boolean;
}) => {
  return (
    <div className="flex items-center gap-1">
      {withIcon && <RiErrorWarningLine className="text-danger-base w-3 h-3" />}
      <Typography.Paragraph className="text-danger-base" size="sm">
        {children}
      </Typography.Paragraph>
    </div>
  );
};
