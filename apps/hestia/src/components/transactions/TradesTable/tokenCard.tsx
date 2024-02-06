import { Token, Tokens, Typography } from "@polkadex/ux";

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
    <div className="flex items-center gap-1">
      <div className="flex items-center justify-center w-6 h-6 p-0.5 rounded-full border border-secondary">
        <Token name={icon} />
      </div>
      <div className="flex items-center gap-1">
        <Typography.Text>{tokenName}</Typography.Text>
        <Typography.Text appearance="primary" size="sm">
          / {ticker}
        </Typography.Text>
      </div>
    </div>
  );
};
