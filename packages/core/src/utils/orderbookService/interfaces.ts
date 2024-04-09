import { ApiPromise } from "@polkadot/api";
import { ExtensionAccount } from "@polkadex/react-providers";
import { SignatureEnumSr25519 } from "@orderbook/core/helpers";
import { LmpApi } from "@polkadex/polkadex-api";
import { Signer } from "@polkadot/types/types";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

import {
  AccountUpdateEvent,
  UserAllHistoryProps,
  Asset,
  Balance,
  Kline,
  KlineHistoryProps,
  LatestTradesPropsForMarket,
  Market,
  MaybePaginated,
  Order,
  Orderbook,
  OrderHistoryProps,
  PriceLevel,
  PublicTrade,
  Subscription,
  Ticker,
  Trade,
  Transaction,
  TransactionHistoryProps,
  UserHistoryProps,
} from "./types";

export interface BaseStrategy {
  init: () => Promise<void>;
  isReady: () => boolean;
}

export interface OrderbookReadStrategy extends BaseStrategy {
  getOrderbook: (market: string) => Promise<Orderbook>;
  getMarkets: () => Promise<Market[]>;
  getTicker: (market: string) => Promise<Ticker>;
  getAssets: () => Promise<Asset[]>;
  getOpenOrders: (args: OrderHistoryProps) => Promise<Order[]>;
  getOrderHistory: (args: UserHistoryProps) => Promise<MaybePaginated<Order[]>>;
  getAllOrderHistory: (args: UserAllHistoryProps) => Promise<Order[]>;
  getTradeHistory: (args: UserHistoryProps) => Promise<MaybePaginated<Trade[]>>;
  getAllTradeHistory: (args: UserAllHistoryProps) => Promise<Trade[]>;
  getLatestTradesForMarket: (
    args: LatestTradesPropsForMarket
  ) => Promise<PublicTrade[]>;
  getBalance: (fundingAddress: string) => Promise<Balance[]>;
  getTradingAddresses: (fundingAddress: string) => Promise<string[]>;
  getFundingAddress: (
    tradeAddress: string
  ) => Promise<string | null | undefined>;
  getCandles: (args: KlineHistoryProps) => Promise<Kline[]>;
  getTransactions: (
    args: TransactionHistoryProps
  ) => Promise<MaybePaginated<Transaction[]>>;
}

export type SubscriptionCallBack<T> = (data: T) => void;

export interface OrderbookSubscriptionStrategy extends BaseStrategy {
  subscribeOrderbook(
    market: string,
    onUpdate: SubscriptionCallBack<PriceLevel[]>
  ): Subscription;

  subscribeBalances(
    address: string,
    onUpdate: SubscriptionCallBack<Balance>
  ): Subscription;

  subscribeTicker(
    market: string,
    onUpdate: SubscriptionCallBack<Ticker>
  ): Subscription;

  subscribeUserTrades(
    address: string,
    onUpdate: SubscriptionCallBack<Trade>
  ): Subscription;

  subscribeLatestTrades(
    market: string,
    onUpdate: SubscriptionCallBack<PublicTrade>
  ): Subscription;

  subscribeOrders(
    address: string,
    onUpdate: SubscriptionCallBack<Order>
  ): Subscription;

  subscribeTransactions(
    address: string,
    onUpdate: SubscriptionCallBack<Transaction>
  ): Subscription;

  subscribeKLines(
    market: string,
    interval: string,
    onUpdate: SubscriptionCallBack<Kline>
  ): Subscription;

  subscribeAccountUpdate(
    address: string,
    onUpdate: SubscriptionCallBack<AccountUpdateEvent>
  ): Subscription;
}

export type ExecuteArgs = {
  payload: string;
  token?: string;
};

export type WithdrawArgs = {
  payload: [string, string, object, SignatureEnumSr25519];
  address: string;
};

export type DepositArgs = {
  api: ApiPromise;
  amount: string | number;
  asset: Record<string, string | null>;
  account: ExtensionAccount;
  tokenFeeId?: string;
};

export type RemoveAccountArgs = {
  api: ApiPromise;
  account: ExtensionAccount;
  proxyAddress: string;
  tokenFeeId?: string;
};

export type CreateProxyAcccountArgs = {
  api: ApiPromise;
  account: ExtensionAccount;
  tokenFeeId?: string;
  proxyAddress: string;
  firstAccount?: boolean;
};

export type ClaimRewardArgs = {
  lmp: LmpApi;
  signer: Signer;
  address: string;
  epoch: number;
  market: string;
  tokenFeeId?: string;
};

export type TransferArgs = {
  api: ApiPromise;
  account: ExtensionAccount;
  asset: Record<string, string | null>;
  amount: string;
  dest: string;
  tokenFeeId?: string;
};

export type ClaimWithdrawArgs = {
  api: ApiPromise;
  account: ExtensionAccount;
  sid: number;
  tokenFeeId?: string;
};

export interface OrderbookOperationStrategy extends BaseStrategy {
  placeOrder: (args: ExecuteArgs) => Promise<void>;
  cancelOrder: (args: ExecuteArgs) => Promise<void>;
  cancelAll: (args: ExecuteArgs) => Promise<void>;
  withdraw: (args: WithdrawArgs) => Promise<void>;
  removeAccount: (args: RemoveAccountArgs) => Promise<SubmittableExtrinsic>;
  createProxyAcccount: (
    args: CreateProxyAcccountArgs
  ) => Promise<SubmittableExtrinsic>;

  deposit: (args: DepositArgs) => Promise<SubmittableExtrinsic>;
  claimReward: (args: ClaimRewardArgs) => Promise<SubmittableExtrinsic>;
  transfer: (args: TransferArgs) => Promise<SubmittableExtrinsic>;
  claimWithdrawal: (args: ClaimWithdrawArgs) => Promise<SubmittableExtrinsic>;
}

export interface OrderbookService {
  init: () => Promise<void>;
  query: OrderbookReadStrategy;
  operation: OrderbookOperationStrategy;
  subscriber: OrderbookSubscriptionStrategy;
}
