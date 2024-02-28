import { RiArrowDownSLine } from "@remixicon/react";
import { Icons, Typography, truncateString } from "@polkadex/ux";
import classNames from "classnames";

export const Trigger = ({
  browserAccountPresent,
  extensionAccountPresent,
  extensionAccountName,
  browserAccountAddress,
  responsive,
}: {
  extensionAccountName: string;
  browserAccountAddress: string;
  browserAccountPresent: boolean;
  extensionAccountPresent: boolean;
  responsive?: boolean;
}) => {
  const extensionAccount = extensionAccountPresent
    ? extensionAccountName
    : "Wallet not present";

  const browserAccount = browserAccountPresent
    ? `Trading account (${truncateString(browserAccountAddress, 3)})`
    : "No trading account";

  return (
    <div
      className={classNames(
        "flex items-center pr-1 border-x border-primary hover:bg-level-1 duration-300 transition-colors",
        responsive ? "w-screen py-3 " : "py-1"
      )}
    >
      <div className="flex items-center justify-center mx-1 w-10 h-10 px-2">
        <Icons.Avatar className="w-7 h-7" />
      </div>
      <div className="flex flex-col w-full text-left">
        <Typography.Text size="xs" bold appearance="primary" className="p-1">
          {extensionAccount}
        </Typography.Text>
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
