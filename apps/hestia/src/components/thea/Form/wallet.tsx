import { Button, Typography, typeofChildren } from "@polkadex/ux";
import { RiWalletLine } from "@remixicon/react";
import { ComponentProps } from "react";

export const WalletCard = ({
  children,
  ...props
}: ComponentProps<typeof Button.Outline>) => {
  const isString = typeofChildren(children);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 p-1.5 flex items-center justify-center rounded-sm bg-level-2">
          <RiWalletLine className="w-full h-full" />
        </div>
        {isString ? <Typography.Text>{children}</Typography.Text> : children}
      </div>
      <Button.Solid appearance="secondary" size="xs" {...props}>
        Change
      </Button.Solid>
    </div>
  );
};
