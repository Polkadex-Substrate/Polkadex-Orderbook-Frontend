import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, Typography, truncateString, Tooltip } from "@polkadex/ux";

export const RemoveWalletCard = ({
  address,
  onClick,
  showTooltip,
}: {
  onClick: () => void;
  address: string;
  showTooltip?: boolean;
}) => {
  const shortAddress = truncateString(address, 12);

  return (
    <div className="flex items-center gap-2">
      {showTooltip ? (
        <Tooltip>
          <Tooltip.Trigger>
            <Button.Icon onClick={undefined} rounded disabled>
              <TrashIcon />
            </Button.Icon>
          </Tooltip.Trigger>
          <Tooltip.Content className=" max-w-[14rem]">
            You need to keep at least one trading account; removing it is not
            allowed.
          </Tooltip.Content>
        </Tooltip>
      ) : (
        <Button.Icon onClick={onClick} rounded>
          <TrashIcon />
        </Button.Icon>
      )}
      <Typography.Text appearance="primary">{shortAddress}</Typography.Text>
    </div>
  );
};
