import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { MouseEvent } from "react";
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
  enabledExtensionAccount = false,
}: {
  name: string;
  address: string;
  type: string;
  onSelect?: (e: MouseEvent<HTMLElement>) => void;
  onRemove?: (e: MouseEvent<HTMLDivElement>) => void;
  onExport?: (e: MouseEvent<HTMLDivElement>) => void;
  enabledExtensionAccount?: boolean;
}) => {
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
        "flex flex-col rounded-md border border-level-5 duration-300 transition-colors",
        hasSelect && "hover:bg-level-4"
      )}
    >
      <div className="flex flex-1 justify-between gap-2 items-center p-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Copy value={address} />
            <Skeleton loading={!address}>
              <Typography.Text bold size="md">
                {shortAddress}
              </Typography.Text>
            </Skeleton>
          </div>
          <Skeleton loading={!address}>
            <Typography.Text variant="primary">{name}</Typography.Text>
          </Skeleton>
        </div>

        {(hasRemove || onExport) && (
          <div className="flex gap-1">
            <Dropdown>
              <Dropdown.Trigger>
                <Button.Icon asChild size="sm" variant="ghost">
                  <EllipsisVerticalIcon className="text-primary group-hover:text-current duration-300 transition-colors" />
                </Button.Icon>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {hasRemove && (
                  <Dropdown.Item onClick={onRemove}>Remove</Dropdown.Item>
                )}
                {onExport && (
                  <Dropdown.Item onClick={onExport}>
                    Export as JSON
                  </Dropdown.Item>
                )}
              </Dropdown.Content>
            </Dropdown>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-grayscale">
        <div className="bg-level-1 px-2 py-1 rounded-full text-xs text-secondary">
          {type}
        </div>
        {enabledExtensionAccount ? (
          <Skeleton loading={isLoading} className="w-20 h-4">
            <HoverCard>
              <HoverCard.Trigger>
                <Typography.Text variant="primary" size="xs">
                  {extensionAccounName ?? shortExtensionAccountAddress}
                </Typography.Text>
              </HoverCard.Trigger>
              <HoverCard.Content side="right">Funding Wallet</HoverCard.Content>
            </HoverCard>
          </Skeleton>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
