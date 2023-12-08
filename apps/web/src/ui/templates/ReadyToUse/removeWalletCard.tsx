import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, Typography, truncateString } from "@polkadex/ux";

export const RemoveWalletCard = ({
  address,
  onClick,
}: {
  onClick: () => void;
  address: string;
}) => {
  const shortAddress = truncateString(address, 12);

  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <Button.Icon onClick={onClick} rounded>
        <TrashIcon />
      </Button.Icon>
      <Typography.Text
        variant="primary"
        className="group-hover:text-current transition-colors duration-300"
      >
        {shortAddress}
      </Typography.Text>
    </div>
  );
};
