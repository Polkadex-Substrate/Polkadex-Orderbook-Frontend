import { RiArrowDownSLine } from "@remixicon/react";
import { HoverCard, Icons, Typography } from "@polkadex/ux";
import classNames from "classnames";

export const Trigger = ({
  browserAccountPresent,
  extensionAccountPresent,
  extensionAccountName,
  browserAccountName,
  responsive,
}: {
  extensionAccountName: string;
  browserAccountName: string;
  browserAccountPresent: boolean;
  extensionAccountPresent: boolean;
  responsive?: boolean;
}) => {
  const extensionAccount = extensionAccountPresent
    ? extensionAccountName
    : "Wallet not present";

  const browserAccount = browserAccountPresent
    ? `Trading account (${browserAccountName})`
    : "No trading account";

  return (
    <div
      className={classNames(
        "flex items-center  hover:bg-level-1 duration-300 transition-colors",
        responsive ? "w-full" : "border-x border-primary pr-1"
      )}
    >
      <div className="flex items-center justify-center mx-1 w-10 h-10 px-2">
        <Icons.Avatar className="w-7 h-7" />
      </div>
      <div className="flex flex-col w-full text-left">
        <HoverCard>
          <HoverCard.Trigger>
            <Typography.Text
              size="xs"
              bold
              appearance="primary"
              className="p-1"
            >
              {extensionAccount}
            </Typography.Text>
          </HoverCard.Trigger>
          <HoverCard.Content side="right" className="text-xs p-1 font-semibold">
            Funding account
          </HoverCard.Content>
        </HoverCard>

        <div className="flex items-center justify-between gap-2 p-1 bg-level-2 rounded-sm w-full">
          <Typography.Text size="xs" bold className="whitespace-nowrap">
            {browserAccount}
          </Typography.Text>
          <RiArrowDownSLine className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
