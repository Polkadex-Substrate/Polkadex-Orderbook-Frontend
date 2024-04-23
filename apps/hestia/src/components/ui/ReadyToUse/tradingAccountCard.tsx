import { RiMore2Line } from "@remixicon/react";
import { MouseEvent, useState } from "react";
import {
  Button,
  Copy,
  Dropdown,
  HoverCard,
  Skeleton,
  Typography,
  truncateString,
} from "@polkadex/ux";
import classNames from "classnames";
import { useExtensionAccounts } from "@polkadex/react-providers";
import { useExtensionAccountFromBrowserAccount } from "@orderbook/core/hooks";

export const TradingAccountCard = ({
  name,
  address,
  type,
  onSelect,
  onRemove,
  onExport,
  onBackupGDrive,
  enabledExtensionAccount = false,
}: {
  name: string;
  address: string;
  type?: string;
  onSelect?: (e: MouseEvent<HTMLElement>) => void;
  onRemove?: (e: MouseEvent<HTMLDivElement>) => void;
  onExport?: (e: MouseEvent<HTMLDivElement>) => void;
  onBackupGDrive?: (e: MouseEvent<HTMLDivElement>) => void;
  enabledExtensionAccount?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const shortAddress = truncateString(address);
  const hasRemove = typeof onRemove === "function";
  const hasSelect = typeof onSelect === "function";

  const customProps = hasSelect && {
    role: "button",
    onClick: onSelect,
  };

  const { extensionAccounts } = useExtensionAccounts();
  const { data, isLoading } = useExtensionAccountFromBrowserAccount(
    address,
    enabledExtensionAccount
  );

  const extensionAccounName = extensionAccounts?.find(
    (value) => value.address === data
  )?.name;

  const shortExtensionAccountAddress = data && truncateString(data);

  return (
    <div
      {...customProps}
      className={classNames(
        "w-full flex flex-col rounded-md border border-primary duration-300 transition-colors",
        hasSelect && "hover:bg-level-1"
      )}
    >
      <div className="flex flex-1 justify-between items-start gap-2 pt-4 pb-3 pl-4 pr-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Copy value={address} />
            <Skeleton loading={!address}>
              <Typography.Text bold size="md">
                {name}
              </Typography.Text>
            </Skeleton>
          </div>
          <Skeleton loading={!address}>
            <Typography.Text appearance="primary">
              {shortAddress}
            </Typography.Text>
          </Skeleton>
        </div>

        {(hasRemove || onExport) && (
          <Dropdown open={open} onOpenChange={setOpen}>
            <Dropdown.Trigger>
              <Button.Icon
                asChild
                size="sm"
                variant="ghost"
                className="p-1"
                rounded
              >
                <RiMore2Line className="text-primary group-hover:text-current duration-300 transition-colors" />
              </Button.Icon>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {hasRemove && (
                <Dropdown.Item
                  onClick={(e) => {
                    onRemove(e);
                    setOpen(false);
                  }}
                >
                  Remove
                </Dropdown.Item>
              )}
              {onExport && (
                <Dropdown.Item
                  onClick={(e) => {
                    onExport(e);
                    setOpen(false);
                  }}
                >
                  Export as JSON
                </Dropdown.Item>
              )}
              {onBackupGDrive && type === "Browser" && (
                <Dropdown.Item
                  onClick={(e) => {
                    onBackupGDrive(e);
                    setOpen(false);
                  }}
                >
                  Backup in Google Drive
                </Dropdown.Item>
              )}
            </Dropdown.Content>
          </Dropdown>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-grayscale">
        {type && (
          <div className="bg-level-1 px-2 py-1 rounded-full text-xs text-secondary">
            {type}
          </div>
        )}
        {enabledExtensionAccount ? (
          <Skeleton loading={isLoading} className="max-w-32 h-4">
            <HoverCard>
              <HoverCard.Trigger>
                <Typography.Text appearance="primary" size="xs">
                  {extensionAccounName ?? shortExtensionAccountAddress}
                </Typography.Text>
              </HoverCard.Trigger>
              <HoverCard.Content side="right">
                Funding Account
              </HoverCard.Content>
            </HoverCard>
          </Skeleton>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
