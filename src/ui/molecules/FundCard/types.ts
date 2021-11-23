import { TokensTicker } from "@polkadex/web-helpers";

export type Props = {
  tokenTicker: TokensTicker;
  tokenName: string;
  totalAmount?: string;
  totalAmountFiat?: string;
  availableAmount?: string;
  availableAmountFiat?: string;
  reservedAmount?: string;
  reservedAmountFiat?: string;
  handleTransfer: () => void;
  handleTrade: () => void;
};
