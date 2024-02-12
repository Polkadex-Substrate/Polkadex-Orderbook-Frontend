import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { Skeleton, Typography } from "@polkadex/ux";

export const LastPrice = ({
  lastPrice,
  isPriceUp,
  loading,
}: {
  lastPrice: number;
  isPriceUp: boolean;
  loading: boolean;
}) => {
  return (
    <div className="flex justify-between gap-2 px-2 py-4 bg-level-1">
      <Typography.Text appearance="secondary" className="whitespace-nowrap">
        Last price
      </Typography.Text>
      <Skeleton loading={loading}>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-sm font-semibold leading-none">
            {isPriceUp ? (
              <ArrowUpIcon className="w-4 h-4 text-success-base" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-danger-base" />
            )}
            <Typography.Text appearance={!isPriceUp ? "danger" : "success"}>
              {lastPrice}
            </Typography.Text>
          </div>
          <Typography.Text appearance="primary" className="leading-none">
            ≈ $0.0
          </Typography.Text>
        </div>
      </Skeleton>
    </div>
  );
};
