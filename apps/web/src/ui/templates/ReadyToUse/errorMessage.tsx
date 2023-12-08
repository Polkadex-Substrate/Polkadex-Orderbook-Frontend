import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import { Typography } from "@polkadex/ux";

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-1">
      <ExclamationCircleIcon className="text-danger-base w-3 h-3" />
      <Typography.Paragraph className="text-danger-base" size="sm">
        {children}
      </Typography.Paragraph>
    </div>
  );
};
