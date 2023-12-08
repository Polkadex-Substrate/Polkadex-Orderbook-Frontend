import { Icon, Separator, Typography } from "@polkadex/ux";

export const ConnectTradingAccountCard = ({
  onOpenInteraction,
  tradingAccountLentgh = 0,
}: {
  onOpenInteraction: () => void;
  tradingAccountLentgh: number;
}) => {
  return (
    <div className="px-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 px-4">
          <Separator.Horizontal />
          <Typography.Text variant="secondary" size="xs">
            Or access with
          </Typography.Text>
        </div>
        <div
          role="button"
          onClick={onOpenInteraction}
          className="flex items-center gap-2 p-4 hover:bg-level-3 duration-300 transition-colors rounded-md"
        >
          <Icon name="Wallet" className="w-7 h-7 p-1" />

          <Typography.Text>
            Trading account{" "}
            <Typography.Text variant="secondary">
              ({tradingAccountLentgh} available)
            </Typography.Text>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};
