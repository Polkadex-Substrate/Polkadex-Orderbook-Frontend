import { TrashIcon } from "@heroicons/react/24/solid";
import { MouseEvent } from "react";
import {
  Button,
  Copy,
  Skeleton,
  Typography,
  truncateString,
} from "@polkadex/ux";
import classNames from "classnames";

export const TradingAccountCard = ({
  name,
  address,
  type,
  onSelect,
  onRemove,
}: {
  name: string;
  address: string;
  type: string;
  onSelect?: (e: MouseEvent<HTMLElement>) => void;
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const shortAddress = truncateString(address);
  const hasRemove = typeof onRemove === "function";
  const hasSelect = typeof onSelect === "function";

  const customProps = hasSelect && {
    role: "button",
    onClick: onSelect,
  };

  return (
    <div
      {...customProps}
      className={classNames(
        "flex flex-col rounded-md border border-level-5 duration-300 transition-colors",
        hasSelect && "hover:bg-level-4"
      )}
    >
      <div className="flex flex-1 justify-between gap-2 items-center p-4">
        <div className="flex items-center gap-2">
          <Copy value={address} />
          <Skeleton loading={!address}>
            <Typography.Text bold size="md">
              {shortAddress}
            </Typography.Text>
          </Skeleton>
        </div>
        {hasRemove && (
          <div className="flex gap-1">
            <Button.Icon size="sm" variant="ghost" onClick={onRemove}>
              <TrashIcon className="text-primary group-hover:text-current duration-300 transition-colors" />
            </Button.Icon>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4 bg-grayscale">
        <Skeleton loading={!address}>
          <Typography.Text variant="primary">{name}</Typography.Text>
        </Skeleton>
        <div className="bg-level-3 px-2 py-1 rounded-full text-xs text-secondary">
          {type}
        </div>
      </div>
    </div>
  );
};
