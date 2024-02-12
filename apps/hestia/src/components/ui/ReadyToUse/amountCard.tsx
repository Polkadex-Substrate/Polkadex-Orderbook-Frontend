import { Typography } from "@polkadex/ux";
import { PropsWithChildren } from "react";

export const AmountCard = ({
  fiatAmount,
  children,
}: PropsWithChildren<{ fiatAmount?: string }>) => (
  <div className="flex flex-col">
    <Typography.Text>{children}</Typography.Text>
    {fiatAmount && (
      <Typography.Text appearance="secondary" size="xs">
        ≈ ${fiatAmount}
      </Typography.Text>
    )}
  </div>
);
