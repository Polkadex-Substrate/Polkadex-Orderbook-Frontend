import { Token, Tokens, Typography, tokenAppearance } from "@polkadex/ux";
export const MarketCard = ({
  icon,
  marketName,
  pairIcon,
}: {
  icon: keyof typeof Tokens;
  marketName: string;
  pairIcon: keyof typeof Tokens;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Token
          appearance={pairIcon as keyof typeof tokenAppearance}
          name={pairIcon}
          className="rounded-full"
          size="sm"
        />
        <div className="w-10 h-10 p-1.5 rounded-full bg-level-0 border border-secondary -ml-2">
          <Token name={icon} />
        </div>
      </div>
      <Typography.Text size="sm">{marketName}</Typography.Text>
    </div>
  );
};
