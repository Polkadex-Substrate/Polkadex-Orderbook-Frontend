import { TrashIcon } from "@heroicons/react/24/solid";
import { MouseEvent } from "react";
import { Button, Copy, Typography, truncateString } from "@polkadex/ux";

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

  return (
    <div
      role={hasSelect ? "button" : "none"}
      onClick={hasSelect ? onSelect : undefined}
      className="flex flex-col rounded-md border border-primary hover:border-secondary duration-300 transition-colors"
    >
      <div className="flex flex-1 justify-between gap-2 items-center p-4">
        <div className="flex items-center gap-2">
          <Copy value={address} />
          <Typography.Text bold size="md">
            {shortAddress}
          </Typography.Text>
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
        <Typography.Text variant="primary">{name}</Typography.Text>
        <div className="bg-level-3 px-2 py-1 rounded-full text-xs text-secondary">
          {type}
        </div>
      </div>
    </div>
  );
};
