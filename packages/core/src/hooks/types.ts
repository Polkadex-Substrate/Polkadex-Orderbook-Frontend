import { TradeAccount } from "@orderbook/core/providers/types";
import { Asset } from "@orderbook/core/utils/orderbookService";

export type IUserTradeAccount = {
  address: string;
  isPresentInBrowser: boolean;
  account?: TradeAccount;
};

export type LmpMarketConfig = {
  makerScore: number;
  traderScore: number;
  baseAsset?: Asset;
  quoteAsset?: Asset;
  rewards: { marketMaking: number; trading: number; isClaimed: boolean };
  baseVolume24h: number;
  quoteVolume24h: number;
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
