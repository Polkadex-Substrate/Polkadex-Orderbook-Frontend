import { TokensTicker } from "@polkadex/web-helpers";

export type TokenProps = {
  tokenName: string;
  tokenTicker: TokensTicker;
  amount: string;
  amountInFiat?: string;
};
