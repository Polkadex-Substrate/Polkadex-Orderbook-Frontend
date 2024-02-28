import { Skeleton, Typography } from "@polkadex/ux";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import classNames from "classnames";

export const LastPrice = ({
  lastPrice,
  isPriceUp,
  loading,
  inverted,
}: {
  lastPrice: number;
  isPriceUp: boolean;
  loading: boolean;
  inverted: boolean;
}) => {
  return (
    <div
      className={classNames(
        inverted && "order-1",
        "flex items-center justify-between gap-2 p-2 border-y border-primary bg-level-1"
      )}
    >
      <Typography.Text
        size="xs"
        appearance="primary"
        className="whitespace-nowrap"
      >
        Last price
      </Typography.Text>
      <Skeleton loading={loading} className="h-4 max-w-20">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-sm font-semibold leading-none">
            <Typography.Text
              size="lg"
              appearance={!isPriceUp ? "danger" : "success"}
            >
              {lastPrice}
            </Typography.Text>
            {isPriceUp ? (
              <RiArrowUpLine className="w-4 h-4 text-success-base" />
            ) : (
              <RiArrowDownLine className="w-4 h-4 text-danger-base" />
            )}
          </div>
          <Typography.Text
            size="sm"
            appearance="primary"
            className="leading-none"
          >
            ≈ $0.0
          </Typography.Text>
        </div>
      </Skeleton>
    </div>
  );
};
