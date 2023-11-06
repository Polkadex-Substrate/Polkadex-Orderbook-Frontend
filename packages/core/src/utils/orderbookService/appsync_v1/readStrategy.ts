import { GraphQLResult } from "@aws-amplify/api";

import { OrderbookReadStrategy } from "./../interfaces";
import {
  Asset,
  Kline,
  UserHistoryProps,
  Balance,
  Market,
  Order,
  Orderbook,
  Ticker,
  Trade,
  PublicTrade,
  Transaction,
  KlineHistoryProps,
  OrderStatus,
  OrderType,
  OrderHistoryProps,
  BookLevel,
  MaybePaginated,
  LatestTradesPropsForMarket,
} from "./../types";
import {
  fetchBatchFromAppSync,
  fetchFullListFromAppSync,
  sendQueryToAppSync,
} from "./helpers";
import * as QUERIES from "./graphql";
import {
  FindUserByMainAccountQuery,
  FindUserByProxyAccountQuery,
  GetAllAssetsQuery,
  GetAllBalancesByMainAccountQuery,
  GetAllMarketsQuery,
  GetKlinesbyMarketIntervalQuery,
  GetMarketTickersQuery,
  Order as APIOrder,
  Trade as APITrade,
  Transaction as APITransaction,
  SetPriceLevel,
} from "./API";

export class AppsyncV1Reader implements OrderbookReadStrategy {
  ready = false;
  _assetsList: Asset[] = [];
  _marketList: Market[] = [];
  public isReady(): boolean {
    return this.ready;
  }

  public async init(): Promise<void> {
    this._assetsList = await this.getAssets();
    this._marketList = await this.getMarkets();
    this.ready = true;
  }

  public async getAssets(): Promise<Asset[]> {
    if (this.isReady()) {
      return this._assetsList;
    }
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
          const asset = this._assetsList.find((x) => x.id === item?.a);
          if (!asset) {
            throw new Error(
              `[${this.constructor.name}:getBalance] cannot find asset`
            );
          }
          return {
            asset,
            free: Number(item?.f) || 0,
            reserved: Number(item?.r) || 0,
          };
        }
      );
    return balances || [];
  }

  async getCandles(args: KlineHistoryProps): Promise<Kline[]> {
    const candlesQueryResult = await sendQueryToAppSync<
      GraphQLResult<GetKlinesbyMarketIntervalQuery>
    >({
      query: QUERIES.getKlinesbyMarketInterval,
      variables: {
        from: args.from.toISOString(),
        to: args.to.toUTCString(),
        market: args.market,
        interval: args.interval,
      },
    });
    const candles =
      candlesQueryResult?.data?.getKlinesbyMarketInterval?.items?.map(
        (item): Kline => {
          return {
            high: Number(item?.h) || 0,
            low: Number(item?.l) || 0,
            open: Number(item?.o) || 0,
            close: Number(item?.c) || 0,
            baseVolume: Number(item?.vb) || 0,
            quoteVolume: Number(item?.vq) || 0,
            timestamp: new Date(item?.t || 0),
          };
        }
      );
    return candles || [];
  }

  async getMarkets(): Promise<Market[]> {
    if (this.isReady()) {
      return this._marketList;
    }
    const assetList = await this.getAssets();
    const marketsQueryResult = await sendQueryToAppSync<
      GraphQLResult<GetAllMarketsQuery>
    >({
      query: QUERIES.getAllMarkets,
    });
    const markets = marketsQueryResult?.data?.getAllMarkets?.items?.map(
      (item): Market => {
        const market = item?.market || "";
        const [baseAssetId, quoteAssetId] = market.split("-");
        const baseAsset = assetList.find((x) => x.id === baseAssetId);
        if (!baseAsset) {
          throw new Error(
            `[${this.constructor.name}:getMarkets] cannot find base asset`
          );
        }
        const quoteAsset = this._assetsList.find((x) => x.id === quoteAssetId);
        if (!quoteAsset) {
          throw new Error(
            `[${this.constructor.name}:getMarkets] cannot find quote asset`
          );
        }

        return {
          id: market || "",
          name: `${baseAsset.ticker}/${quoteAsset.ticker}`,
          baseAsset,
          quoteAsset,
          minQty: Number(item?.min_order_qty) || 0,
          minPrice: Number(item?.min_order_price) || 0,
          maxPrice: Number(item?.max_order_price) || 0,
          maxQty: Number(item?.max_order_qty) || 0,
          basePrecision: Number(item?.base_asset_precision) || 0,
          quotePrecision: Number(item?.quote_asset_precision) || 0,
          maxVolume:
            Number(item?.max_order_price) * Number(item?.max_order_qty),
          minVolume:
            Number(item?.min_order_price) * Number(item?.min_order_qty),
        };
      }
    );
    return markets || [];
  }

  async getOpenOrders(args: OrderHistoryProps): Promise<Order[]> {
    if (!this.isReady()) {
      await this.init();
    }
    const openOrderQueryResult = await fetchFullListFromAppSync<APIOrder>(
      QUERIES.listOpenOrdersByMainAccount,
      {
        main_account: args.address,
        limit: args.limit,
      },
      "listOpenOrdersByMainAccount"
    );
    const openOrders = openOrderQueryResult?.map((item): Order => {
      return this.mapApiOrderToOrder(item, this._marketList);
    });
    return openOrders || [];
  }

  async getOrderHistory(
    args: UserHistoryProps
  ): Promise<MaybePaginated<Order[]>> {
    if (!this.isReady()) {
      await this.init();
    }
    const orderHistoryQueryResult = await fetchBatchFromAppSync<APIOrder>(
      QUERIES.listOrderHistorybyMainAccount,
      {
        main_account: args.address,
        limit: args.limit,
        from: args.from.toISOString(),
        to: args.to.toISOString(),
      },
      "listOrderHistorybyMainAccount"
    );
    if (!orderHistoryQueryResult) {
      return { data: [], nextToken: null };
    }
    const orderHistory = orderHistoryQueryResult?.response?.map(
      (item): Order => {
        return this.mapApiOrderToOrder(item, this._marketList);
      }
    );
    return {
      data: orderHistory || [],
      nextToken: orderHistoryQueryResult?.nextToken,
    };
  }

  async getOrderbook(market: string): Promise<Orderbook> {
    const queryResult = await fetchFullListFromAppSync<SetPriceLevel | null>(
      QUERIES.getOrderbook,
      {
        m: market,
      },
      "getOrderbook"
    );
    const bids: BookLevel[] = [];
    const asks: BookLevel[] = [];
    if (queryResult) {
      queryResult.forEach((item) => {
        if (item) {
          const level: BookLevel = {
            price: Number(item.p),
            qty: Number(item.q),
          };
          if (item.s === "Bid") {
            bids.push(level);
          } else {
            asks.push(level);
          }
        }
      });
    }
    return {
      bids: bids || [],
      asks: asks || [],
    };
  }

  async getTicker(market: string): Promise<Ticker> {
    // get tickers for the last 24 hours
    const to = new Date();
    // subtract 1 day
    const from = new Date(new Date().setDate(new Date().getDate() - 1));
    const tickersQueryResult = await sendQueryToAppSync<
      GraphQLResult<GetMarketTickersQuery>
    >({
      query: QUERIES.getMarketTickers,
      variables: { market, from: from.toISOString(), to: to.toISOString() },
    });
    const tickerItem = tickersQueryResult?.data?.getMarketTickers?.items;
    return {
      open: Number(tickerItem?.o) || 0,
      close: Number(tickerItem?.c) || 0,
      high: Number(tickerItem?.h) || 0,
      low: Number(tickerItem?.l) || 0,
      baseVolume: Number(tickerItem?.vb) || 0,
      quoteVolume: Number(tickerItem?.vq) || 0,
      currentPrice: Number(tickerItem?.c) || 0,
    };
  }

  async getTradeHistory(
    args: UserHistoryProps
  ): Promise<MaybePaginated<Trade[]>> {
    const queryResult = await fetchBatchFromAppSync<APITrade>(
      QUERIES.listTradesByMainAccount,
      {
        main_account: args.address,
        limit: args.limit,
        from: args.from.toISOString(),
        to: args.to.toISOString(),
      },
      "listTradesByMainAccount"
    );
    if (!queryResult) {
      return { data: [], nextToken: null };
    }
    const trades = queryResult.response.map((item: APITrade): Trade => {
      return {
        price: Number(item?.p) || 0,
        qty: Number(item?.q) || 0,
        isReverted: item?.isReverted || false,
        timestamp: new Date(item?.t || 0),
        takerOrderId: item?.t_id || "",
        makerOrderId: item?.m_id || "",
        fee: 0,
      };
    });
    return { data: trades, nextToken: queryResult.nextToken };
  }

  async getLatestTradesForMarket(
    args: LatestTradesPropsForMarket
  ): Promise<PublicTrade[]> {
    const queryResult = await fetchBatchFromAppSync<APITrade>(
      QUERIES.getRecentTrades,
      {
        m: args.market,
        limit: args.limit,
      },
      "getRecentTrades"
    );
    if (!queryResult) {
      return [];
    }
    return queryResult.response.map((item: APITrade): PublicTrade => {
      return {
        price: Number(item?.p) || 0,
        qty: Number(item?.q) || 0,
        isReverted: item?.isReverted || false,
        timestamp: new Date(item?.t || 0),
      };
    });
  }

  async getTradingAddresses(fundingAddress: string): Promise<string[]> {
    const queryResult = await sendQueryToAppSync<
      GraphQLResult<FindUserByMainAccountQuery>
    >({
      query: QUERIES.findUserByMainAccount,
      variables: {
        main_account: fundingAddress,
      },
    });
    return (
      (queryResult?.data?.findUserByMainAccount?.proxies as string[]) || []
    );
  }

  async getTransactions(
    args: UserHistoryProps
  ): Promise<MaybePaginated<Transaction[]>> {
    if (!this.isReady()) {
      await this.init();
    }
    const queryResult = await fetchBatchFromAppSync<APITransaction>(
      QUERIES.listTransactionsByMainAccount,
      {
        main_account: args.address,
        limit: args.limit,
        from: args.from.toISOString(),
        to: args.to.toISOString(),
      },
      "listTransactionsByMainAccount"
    );
    if (!queryResult) {
      return { data: [], nextToken: null };
    }
    const transactions = queryResult.response.map(
      (item: APITransaction): Transaction => {
        const asset = this._assetsList.find((x) => x.id === item?.a);
        if (!asset) {
          throw new Error(
            `[${this.constructor.name}:getTransactions] cannot find asset`
          );
        }
        return {
          txType: (item?.tt as Transaction["txType"]) || "",
          amount: Number(item?.a) || 0,
          fee: Number(item?.fee) || 0,
          timestamp: new Date(item?.t || 0),
          isReverted: item?.isReverted || false,
          status: (item?.st as Transaction["status"]) || "",
          asset,
        };
      }
    );
    return { data: transactions, nextToken: queryResult.nextToken };
  }

  async getFundingAddress(
    tradeAddress: string
  ): Promise<string | null | undefined> {
    const queryResult = await sendQueryToAppSync<
      GraphQLResult<FindUserByProxyAccountQuery>
    >({
      query: QUERIES.findUserByProxyAccount,
      variables: {
        proxy_account: tradeAddress,
      },
    });
    return queryResult?.data?.findUserByProxyAccount?.items?.[0]?.hash_key;
  }

  private mapApiOrderToOrder(item: APIOrder, marketList: Market[]): Order {
    const market = marketList.find((x) => x.id === item?.m);
    if (!market) {
      throw new Error(
        `[${this.constructor.name}:getOpenOrders] cannot find market`
      );
    }
    return {
      market,
      tradeAddress: item?.u || "",
      orderId: item?.id || "",
      price: item?.p || "",
      averagePrice: Number(item?.afp) || 0,
      type: (item?.t as OrderType) || "LIMIT",
      status: (item?.s as OrderStatus) || "CLOSED",
      isReverted: item?.isReverted || false,
      fee: Number(item?.fee) || 0,
      timestamp: new Date(item?.t || 0),
    };
  }
}
