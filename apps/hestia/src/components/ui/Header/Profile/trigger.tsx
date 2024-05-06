import { HoverCard, Icons, Typography } from "@polkadex/ux";
import classNames from "classnames";

export const Trigger = ({
  extensionAccountPresent,
  extensionAccountName,
  responsive,
}: {
  extensionAccountName: string;
  extensionAccountPresent: boolean;
  responsive?: boolean;
}) => {
  const extensionAccount = extensionAccountPresent
    ? extensionAccountName
    : "Wallet not present";

  return (
    <div
      className={classNames(
        "flex items-center  hover:bg-level-1 duration-300 transition-colors",
        responsive ? "w-full" : "border-x border-primary pr-1"
      )}
    >
      <div className="flex items-center justify-center pl-2">
        <Icons.Avatar className="w-6 h-6" />
      </div>
      <div className="flex flex-col w-full h-full py-3 text-left">
        <HoverCard>
          <HoverCard.Trigger>
            <Typography.Text
              size="xs"
              bold
              appearance="primary"
              className="p-2"
            >
              {extensionAccount}
            </Typography.Text>
          </HoverCard.Trigger>
        </HoverCard>
      </div>
    </div>
  );
};
