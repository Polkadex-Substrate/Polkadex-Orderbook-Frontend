import {
  Typography,
  HoverCard,
  Skeleton,
  Token,
  tokenAppearance,
} from "@polkadex/ux";

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
  return (
    <div className="flex items-center gap-2 px-4 md:border-r border-primary min-w-[10rem]">
      <div className="w-8 h-8">
        <Skeleton loading={!baseTicker}>
          <Token
            appearance={baseTicker as keyof typeof tokenAppearance}
            name={baseTicker}
            size="sm"
            className="rounded-full"
          />
        </Skeleton>
      </div>
      <HoverCard>
        <HoverCard.Trigger>
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
