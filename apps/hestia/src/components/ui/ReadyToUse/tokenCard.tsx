import { Token, Tokens, Typography, tokenAppearance } from "@polkadex/ux";

export const TokenCard = ({
  icon,
  ticker,
  tokenName,
}: {
  icon: keyof typeof Tokens;
  ticker: string;
  tokenName: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Token
        name={icon}
        size="md"
        className="p-0.5 rounded-full border border-primary"
        appearance={icon as keyof typeof tokenAppearance}
      />
      <div className="flex flex-col gap-0.5">
        <Typography.Text>{ticker}</Typography.Text>
        <Typography.Text
          appearance="primary"
          size="xs"
          className="whitespace-nowrap"
        >
          {tokenName}
        </Typography.Text>
      </div>
    </div>
  );
};
