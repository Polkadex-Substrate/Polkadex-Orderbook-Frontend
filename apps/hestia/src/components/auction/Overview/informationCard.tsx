import { Token, Typography } from "@polkadex/ux";

export const InformationCard = ({
  name,
  ticker,
  amount,
  amountFiat,
}: {
  name: string;
  ticker: string;
  amount: number;
  amountFiat: number;
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-primary/40">
      <div className="flex items-center gap-2">
        <Token name={ticker} appearance={ticker} rounded />
        <div className="flex flex-col">
          <Typography.Text>{name}</Typography.Text>
          <Typography.Text appearance="primary">{ticker}</Typography.Text>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Typography.Text bold>{amount}</Typography.Text>
        <Typography.Text appearance="secondary" size="xs">
          {amountFiat}
        </Typography.Text>
      </div>
    </div>
  );
};
