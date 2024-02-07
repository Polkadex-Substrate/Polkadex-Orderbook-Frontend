"use client";

import { Icons, Skeleton, Typography, truncateString } from "@polkadex/ux";
import { Fragment, PropsWithChildren } from "react";
export const AccountInfo = ({
  name,
  address,
  ticker,
  balance,
  children,
}: PropsWithChildren<{
  name?: string;
  address?: string;
  ticker: string;
  balance: string | number;
}>) => {
  const shortAddress = address && truncateString(address);
  return (
    <div className="flex justify-between gap-2 flex-wrap px-5 py-3 border-t border-primary">
      <div className="flex gap-2 flex-1">
        {children ?? (
          <div className="flex items-center justify-center bg-level-2 w-6 h-6 rounded-md">
            <Icons.Wallet className="w-3 h-3 text-primary" />
          </div>
        )}
        <Skeleton
          loading={children ? false : !address && !name}
          className="h-auto"
        >
          <Typography.Text className="self-center whitespace-nowrap">
            {children ? (
              name
            ) : (
              <Fragment>
                <strong>{name}</strong> {shortAddress}
              </Fragment>
            )}
          </Typography.Text>
        </Skeleton>
      </div>
      <Skeleton loading={!ticker} className="h-auto max-w-20">
        <Typography.Text
          appearance="primary"
          size="xs"
          className="self-center whitespace-nowrap"
        >
          {balance} {ticker}
        </Typography.Text>
      </Skeleton>
    </div>
  );
};
