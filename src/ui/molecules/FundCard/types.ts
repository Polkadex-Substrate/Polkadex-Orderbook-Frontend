import { ITokens } from "src/utils/types";

export type Props = {
  tokenTicker: ITokens;
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
