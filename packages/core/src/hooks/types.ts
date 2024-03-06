import { TradeAccount } from "@orderbook/core/providers/types";
import { Market, Ticker } from "@orderbook/core/utils/orderbookService";

export type IUserTradeAccount = {
  address: string;
  isPresentInBrowser: boolean;
  account?: TradeAccount;
};

export type LmpMarketConfig = Market &
  Ticker & {
    score: string;
    rewards: { marketMaking: number; trading: number; isClaimed: boolean };
  };

export type LmpLeaderboard = {
  rank: number;
  address: string;
  rewards: number;
  token: string;
  score: string;
};

export type ClaimRewardArgs = { market: string; epoch: number; reward: number };

export interface MutateHookProps {
  onSuccess?: (message?: string) => void;
  onError?: (error: Error) => void;
}
