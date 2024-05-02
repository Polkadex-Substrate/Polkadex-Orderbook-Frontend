import { Token, Typography, TokenAppearance } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";

export const TokenCard = ({
  icon,
  ticker,
  tokenName,
}: {
  icon: TokenAppearance;
  ticker: string;
  tokenName: string;
}) => {
  const { width } = useWindowSize();
  return (
    <div className="flex items-center gap-3">
      <Token
        name={icon}
        size={width <= 600 ? "xs" : "md"}
        className="p-0.5 rounded-full border border-primary max-sm:w-5 max-sm:h-5"
        appearance={icon as TokenAppearance}
      />
      <div className="flex flex-col gap-0.5">
        <Typography.Text>{ticker}</Typography.Text>
        <Typography.Text
          appearance="primary"
          size="xs"
          className="whitespace-nowrap lowercase first-letter:uppercase max-sm:hidden"
        >
          {tokenName}
        </Typography.Text>
      </div>
    </div>
  );
};
