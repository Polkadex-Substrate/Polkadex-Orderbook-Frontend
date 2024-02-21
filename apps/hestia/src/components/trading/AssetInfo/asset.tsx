import {
  Typography,
  HoverCard,
  Skeleton,
  Token,
  tokenAppearance,
} from "@polkadex/ux";
import { useState } from "react";

import { TokenInfo } from "./tokenInfo";
export const Asset = ({
  baseTicker,
  quoteTicker,
  tokenName,
  loading,
}: {
  baseTicker: string;
  quoteTicker: string;
  tokenName: string;
  loading: boolean;
}) => {
  const [state, setState] = useState(false);
  return (
    <div className="flex items-center gap-2 px-4 md:border-r border-primary min-w-[10rem]">
      <Skeleton loading={!baseTicker} className="w-full h-full">
        <Token
          appearance={baseTicker as keyof typeof tokenAppearance}
          name={baseTicker}
          size="sm"
          className="rounded-full border border-primary"
        />
      </Skeleton>
      <HoverCard open={!loading && state} onOpenChange={setState}>
        <HoverCard.Trigger className="flex flex-1 w-full h-full">
          <div className="flex flex-col gap-0.5 flex-1 h-full justify-center">
            <Skeleton loading={loading}>
              <div className="flex items-center gap-1 cursor-default">
                <Typography.Text size="xs" appearance="primary" bold>
                  {tokenName}
                </Typography.Text>
              </div>
            </Skeleton>
            <Skeleton loading={!baseTicker || !quoteTicker}>
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
