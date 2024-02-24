import {
  Typography,
  HoverCard,
  Skeleton,
  Token,
  tokenAppearance,
} from "@polkadex/ux";
import { useState } from "react";
import classNames from "classnames";

import { TokenInfo } from "./tokenInfo";
export const Asset = ({
  baseTicker,
  quoteTicker,
  tokenName,
  loading,
  inlineView,
}: {
  baseTicker: string;
  quoteTicker: string;
  tokenName: string;
  loading: boolean;
  inlineView?: boolean;
}) => {
  const [state, setState] = useState(false);
  return (
    <div
      className={classNames(
        "flex items-center gap-2 px-4  min-w-[10rem]",
        inlineView ? "py-1" : "md:border-r border-primary"
      )}
    >
      <Skeleton loading={!baseTicker} className="w-full h-8 max-w-8">
        <Token
          appearance={baseTicker as keyof typeof tokenAppearance}
          name={baseTicker}
          size="md"
          className="rounded-full border border-primary"
        />
      </Skeleton>
      <HoverCard open={false} onOpenChange={setState}>
        <HoverCard.Trigger className="flex h-full flex-1">
          <div
            className={classNames(
              "flex flex-row-reverse gap-0.5 flex-1 h-full",
              inlineView
                ? "items-center justify-between"
                : "flex-col justify-center"
            )}
          >
            <Skeleton loading={loading} className="h-4 max-h-4 max-w-12">
              <div className="flex items-center gap-1 cursor-default">
                <Typography.Text size="xs" appearance="primary">
                  {tokenName}
                </Typography.Text>
              </div>
            </Skeleton>
            <Skeleton
              loading={!baseTicker || !quoteTicker}
              className="h-4 max-h-4 max-w-8 "
            >
              <Typography.Text size="md" bold className="leading-none">
                {baseTicker}/{quoteTicker}
              </Typography.Text>
            </Skeleton>
          </div>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <TokenInfo baseTicker={baseTicker} tokenName={tokenName} />
        </HoverCard.Content>
      </HoverCard>
    </div>
  );
};
