import { Icons, Typography, truncateString } from "@polkadex/ux";

export const AccountCard = ({ address }: { address: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex place-items-center">
        <Icons.Avatar className="w-6 h-6 text-red-500" />
      </div>
      <Typography.Text> {truncateString(address, 5)}</Typography.Text>
    </div>
  );
};
