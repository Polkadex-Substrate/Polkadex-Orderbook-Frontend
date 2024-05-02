import {
  Button,
  Typography,
  truncateString,
  typeofChildren,
} from "@polkadex/ux";
import { RiWalletLine } from "@remixicon/react";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Button.Outline> {
  name?: string;
}
export const WalletCard = ({ name, children, ...props }: Props) => {
  const isString = typeofChildren(children);
  const shortAddress =
    isString && typeof children === "string" && truncateString(children);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 p-1.5 flex items-center justify-center rounded-sm bg-level-2">
          <RiWalletLine className="w-full h-full" />
        </div>
        {isString ? (
          <div className="flex items-center gap-1">
            {name && <Typography.Text>{name}</Typography.Text>}
            <Typography.Text appearance={name ? "primary" : "base"}>
              {name ? `(${shortAddress})` : shortAddress}
            </Typography.Text>
          </div>
        ) : (
          children
        )}
      </div>
      <Button.Solid appearance="secondary" size="xs" {...props}>
        Change
      </Button.Solid>
    </div>
  );
};
