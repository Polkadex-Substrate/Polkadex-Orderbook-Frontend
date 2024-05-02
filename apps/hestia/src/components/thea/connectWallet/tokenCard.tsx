"use client";

import {
  Button,
  Skeleton,
  Token,
  Typography,
  tokenAppearance,
} from "@polkadex/ux";
import classNames from "classnames";
import { RiAddLine } from "@remixicon/react";
import { useMemo } from "react";
import Link from "next/link";
import { trimFloat } from "@polkadex/numericals";
import { parseScientific } from "@orderbook/core/helpers";
import { useTheaProvider } from "@orderbook/core/providers";

export const TokenCard = ({
  icon,
  ticker,
  tokenName,
  disabled,
}: {
  icon: string;
  ticker: string;
  tokenName: string;
  disabled?: boolean;
}) => {
  const { balances, balancesLoading } = useTheaProvider();

  const amount = useMemo(
    () => balances?.find((e) => e.ticker.includes(ticker))?.amount,
    [balances, ticker]
  );
  const balance = useMemo(() => {
    const trimmedBalance = trimFloat({ value: amount?.toString() ?? "" });
    return parseScientific(trimmedBalance);
  }, [amount]);

  console.log("balance", balance);
  return (
    <div
      className={classNames(
        "flex-1 flex item-center justify-between gap-2",
        disabled && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        <Token
          name={icon}
          size="md"
          className="p-0.5 rounded-full border border-primary max-sm:w-5 max-sm:h-5"
          appearance={icon as keyof typeof tokenAppearance}
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <Typography.Text>{ticker}</Typography.Text>
            {disabled && (
              <div className="flex items-center gap-1">
                <Typography.Text size="xs" appearance="primary">
                  No liquidty
                </Typography.Text>
                <Button.Solid size="2xs" appearance="secondary" asChild>
                  <Link
                    href="/pools"
                    className="group flex shrink-0 items-center gap-0.5 transition-transform"
                  >
                    Add
                    <RiAddLine className="w-0 h-0 invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-hover:w-3 group-hover:h-3" />
                  </Link>
                </Button.Solid>
              </div>
            )}
          </div>
          <Typography.Text
            appearance="primary"
            size="xs"
            className="whitespace-nowrap lowercase first-letter:uppercase max-sm:hidden"
          >
            {tokenName}
          </Typography.Text>
        </div>
      </div>
      <Skeleton loading={balancesLoading} className="max-w-20 max-h-5">
        <Typography.Text size="xs" appearance="primary" className="self-center">
          {balance} {ticker}
        </Typography.Text>
      </Skeleton>
    </div>
  );
};
