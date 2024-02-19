import { forwardRef } from "react";

type Props = {
  maxHeight: string;
};

export const TradeHistory = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight }, ref) => {
    return <h1>Trade History</h1>;
  }
);
TradeHistory.displayName = "TradeHistory";
