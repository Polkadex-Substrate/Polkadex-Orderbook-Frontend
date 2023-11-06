import { GraphQLResult } from "@aws-amplify/api";

import { OrderbookReadStrategy } from "./../interfaces";
import {
  Asset,
  Kline,
  MarketConfig,
  MarketHistoryProps,
  UserHistoryProps,
  Balance,
  Market,
  Order,
  Orderbook,
  Ticker,
  Trade,
  PublicTrade,
  Transaction,
} from "./../types";
import { fetchAllFromAppSync, sendQueryToAppSync } from "./helpers";
import * as QUERIES from "./graphql";
import { GetAllAssetsQuery, GetAllBalancesByMainAccountQuery } from "./API";

export class AppsyncV1Reader implements OrderbookReadStrategy {
  ready = false;
  assetsList: Asset[] = [];
  public async isReady(): boolean {
    return this.ready;
  }

  public async init(): Promise<void> {
    this.assetsList = await this.getAssets();
    this.ready = true;
  }

  public async getAssets(): Promise<Asset[]> {
    const allAssets = await sendQueryToAppSync<
      GraphQLResult<GetAllAssetsQuery>
    >({
      query: QUERIES.getAllAssets,
    });
    const assets = allAssets?.data?.getAllAssets?.items?.map((item): Asset => {
      return {
        ticker: item?.symbol || "",
        name: item?.name || "",
        decimal: 8,
        id: item?.asset_id || "",
      };
    });
    return assets || [];
  }

  public async getBalance(fundingAddress: string): Promise<Balance[]> {
    // make sure assets are already fetched
    if (!this.isReady()) {
      await this.init();
    }
    const balancesQueryResult = await sendQueryToAppSync<
      GraphQLResult<GetAllBalancesByMainAccountQuery>
    >({
      query: QUERIES.getAllBalancesByMainAccount,
      variables: {
        main_account: fundingAddress,
      },
    });
    const balances =
      balancesQueryResult?.data?.getAllBalancesByMainAccount?.items?.map(
        (item): Balance => {
          return {
            asset: this.assetsList.find((x) => x.id === item.a),
            free: item.f,
            reserved: item.r,
          };
        }
      );
    return balances || [];
  }

  getCandles(args: MarketHistoryProps): Promise<Kline[]> {
    if (!this.isReady()) {
      await this.init();
    }
    return Promise.resolve([]);
  }

  getMarkets(): Promise<Market[]> {
    return Promise.resolve([]);
  }

  getMarketsConfig(): Promise<MarketConfig[]> {
    return Promise.resolve([]);
  }

  getOpenOrders(args: UserHistoryProps): Promise<Order[]> {
    return Promise.resolve([]);
  }

  getOrderHistory(args: UserHistoryProps): Promise<Order[]> {
    return Promise.resolve([]);
  }

  getOrderbook(market: string): Promise<Orderbook> {
    return Promise.resolve(undefined);
  }

  getTickers(): Promise<Ticker[]> {
    return Promise.resolve([]);
  }

  getTradeHistory(args: UserHistoryProps): Promise<Trade[]> {
    return Promise.resolve([]);
  }

  getTrades(args: UserHistoryProps): Promise<PublicTrade[]> {
    return Promise.resolve([]);
  }

  getTradingAddresses(fundingAddress: string): Promise<string[]> {
    return Promise.resolve([]);
  }

  getTransactions(args: UserHistoryProps): Promise<Transaction[]> {
    return Promise.resolve([]);
  }

  getFundingAddress(tradeAddress: string): Promise<string> {
    return Promise.resolve("");
  }
}
