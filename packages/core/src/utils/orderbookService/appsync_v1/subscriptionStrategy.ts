import { API } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import { READ_ONLY_TOKEN, USER_EVENTS } from "@orderbook/core/constants";
import { appsyncReader } from "@orderbook/core/utils/orderbookService/appsync_v1/readStrategy";
import { KlineIntervals } from "@orderbook/core/utils/orderbookService/appsync_v1/constants";

import {
  AccountUpdateEvent,
  Asset,
  Balance,
  Kline,
  PriceLevel,
  PublicTrade,
  Subscription,
  Ticker,
  Trade,
  Transaction,
  Order,
  OrderType,
  OrderStatus,
  MarketBase,
} from "./../types";
import {
  OrderbookReadStrategy,
  OrderbookSubscriptionStrategy,
  SubscriptionCallBack,
} from "./../interfaces";
import { Websocket_streamsSubscription } from "./API";
import * as SUBS from "./graphql/subscriptions";
import {
  convertBookUpdatesToPriceLevels,
  filterUserSubscriptionType,
} from "./helpers";
import {
  BalanceUpdateEvent,
  BookUpdateEvent,
  OrderUpdateEvent,
  CandleStickUpdateEvent,
  TradeEvent,
  TransactionUpdateEvent,
  UserTradeEvent,
} from "./types";
class AppsyncV1Subscriptions implements OrderbookSubscriptionStrategy {
  _assetList: Asset[];
  _marketList: MarketBase[];
  _isReady = false;
  readApi: OrderbookReadStrategy;
  constructor(readApi: OrderbookReadStrategy) {
    this.readApi = readApi;
  }

  async init() {
    await this.readApi.init();
    this._assetList = await this.readApi.getAssets();
    this._marketList = await this.readApi.getMarkets();
    this._isReady = true;
  }

  isReady() {
    return this._isReady;
  }

  subscribeBalances(
    address: string,
    cb: SubscriptionCallBack<Balance>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: address,
      },
      authToken: READ_ONLY_TOKEN,
    });
    const observable = subscription
      .filter((data) => {
        return filterUserSubscriptionType(data.value, USER_EVENTS.SetBalance);
      })
      .map((data) => {
        const eventData = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as BalanceUpdateEvent;
        const asset = this._assetList.find(
          (item) => item.id === eventData.asset.asset
        );
        if (!asset) {
          throw new Error(`Asset ${eventData.asset.asset} not found`);
        }
        return {
          asset,
          free: Number(eventData.free),
          reserved: Number(eventData.reserved),
        };
      });
    return observable.subscribe(cb);
  }

  subscribeOrderbook(
    market: string,
    cb: SubscriptionCallBack<PriceLevel[]>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: `${market}-ob-inc`,
      },
    });
    const observable = subscription
      .filter((data) => {
        return filterUserSubscriptionType(data.value, USER_EVENTS.Order);
      })
      .map((data) => {
        const eventData = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as BookUpdateEvent;
        return convertBookUpdatesToPriceLevels(eventData);
      });
    return observable.subscribe(cb);
  }

  subscribeUserTrades(
    market: string,
    cb: SubscriptionCallBack<Trade>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: market,
      },
    });
    const observable = subscription
      .filter((data) => {
        return filterUserSubscriptionType(data.value, USER_EVENTS.TradeFormat);
      })
      .map((data) => {
        const eventData = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as UserTradeEvent;
        return {
          tradeId: eventData.tid.toString(),
          price: Number(eventData.p),
          qty: Number(eventData.q),
          isReverted: false,
          fee: 0,
          timestamp: new Date(eventData.t),
        };
      });
    return observable.subscribe(cb);
  }

  subscribeKLines(
    market: string,
    interval: string,
    onUpdate: SubscriptionCallBack<Kline>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    // check if interval is valid
    if (!KlineIntervals.find((item) => item === interval)) {
      throw new Error(`${this.constructor.name}: Invalid interval`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: `${market}_${interval}`,
      },
    });
    const observable = subscription
      .filter((data) => Boolean(data?.value?.data?.websocket_streams?.data))
      .map((data): Kline => {
        const item = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as CandleStickUpdateEvent;
        return {
          open: Number(item.o),
          high: Number(item.h),
          low: Number(item.l),
          close: Number(item.c),
          baseVolume: Number(item.vb),
          quoteVolume: Number(item.vq),
          timestamp: new Date(item.t),
        };
      });
    return observable.subscribe(onUpdate);
  }

  subscribeLatestTrades(
    market: string,
    onUpdate: SubscriptionCallBack<PublicTrade>
  ): Subscription {
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: `${market}-recent-trades`,
      },
    });
    const observable = subscription
      .filter((data) => Boolean(data?.value?.data?.websocket_streams?.data))
      .map((data): PublicTrade => {
        const item = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as TradeEvent;
        return {
          price: Number(item.p),
          qty: Number(item.q),
          isReverted: false,
          timestamp: new Date(item.t),
        };
      });
    return observable.subscribe(onUpdate);
  }

  subscribeOrders(
    address: string,
    onUpdate: SubscriptionCallBack<Order>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: address,
      },
    });
    const observable = subscription
      .filter((data) => Boolean(data?.value?.data?.websocket_streams?.data))
      .map((data): Order => {
        const item = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as OrderUpdateEvent;
        const marketId = item.pair.base.asset + "-" + item.pair.quote.asset;
        const market = this._marketList.find((item) => item.id === marketId);
        if (!market) {
          throw new Error(`${this.constructor.name} ${marketId} not found`);
        }
        return {
          tradeAddress: item.user,
          market: market,
          orderId: item.id.toString(),
          price: Number(item.price),
          averagePrice: item.avg_filled_price,
          type: item.order_type as OrderType,
          status: item.status as OrderStatus,
          isReverted: false,
          fee: Number(item.fee),
          timestamp: new Date(item.timestamp),
        };
      });
    return observable.subscribe(onUpdate);
  }

  subscribeTicker(
    market: string,
    onUpdate: SubscriptionCallBack<Ticker>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: `${market}-ticker`,
      },
    });
    const observable = subscription
      .filter((data) => Boolean(data?.value?.data?.websocket_streams?.data))
      .map((data): Ticker => {
        const item = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as CandleStickUpdateEvent;
        return {
          open: Number(item.o),
          close: Number(item.c),
          high: Number(item.h),
          low: Number(item.l),
          baseVolume: Number(item.vb),
          quoteVolume: Number(item.vq),
          currentPrice: Number(item.c),
        };
      });
    return observable.subscribe(onUpdate);
  }

  subscribeTransactions(
    address: string,
    onUpdate: SubscriptionCallBack<Transaction>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: address,
      },
    });
    const observable = subscription
      .filter((data) => {
        return filterUserSubscriptionType(
          data.value,
          USER_EVENTS.SetTransaction
        );
      })
      .map((data): Transaction => {
        const item = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as TransactionUpdateEvent;
        const asset = this._assetList.find((a) => a.id === item.asset);
        if (!asset) {
          throw new Error(`Asset ${item.asset} not found`);
        }
        return {
          amount: 0,
          fee: 0,
          isReverted: false,
          status: item.status,
          timestamp: new Date(item.t),
          txType: item.txn_type === "DEPOSIT" ? "DEPOSIT" : "WITHDRAW",
          asset,
        };
      });
    return observable.subscribe(onUpdate);
  }

  subscribeAccountUpdate(
    address: string,
    onUpdate: SubscriptionCallBack<AccountUpdateEvent>
  ): Subscription {
    if (!this._isReady) {
      throw new Error(`${this.constructor.name}: Not Initialized`);
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: SUBS.websocket_streams,
      variables: {
        name: address,
      },
    });
    const observable = subscription
      .filter((data) => Boolean(data?.value?.data?.websocket_streams?.data))
      .filter((data) => {
        const item = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as AccountUpdateEvent;
        return (
          item.type === USER_EVENTS.AddProxy ||
          item.type === USER_EVENTS.RemoveProxy ||
          item.type === USER_EVENTS.RegisterAccount
        );
      })
      .map((data): AccountUpdateEvent => {
        const item = JSON.parse(
          data?.value?.data?.websocket_streams?.data as unknown as string
        ) as AccountUpdateEvent;
        return {
          address: item.address,
          type: item.type,
        };
      });
    return observable.subscribe(onUpdate);
  }
}

export const appsyncSubscriptions = new AppsyncV1Subscriptions(appsyncReader);
