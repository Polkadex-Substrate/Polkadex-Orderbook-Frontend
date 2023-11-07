import { API } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import { READ_ONLY_TOKEN, USER_EVENTS } from "@orderbook/core/constants";

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
  TradeEvent,
  UserTradeEvent,
} from "./types";
export class AppsyncV1Subscriptions implements OrderbookSubscriptionStrategy {
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
    onUpdate: SubscriptionCallBack<Kline>
  ): Subscription {
    return undefined;
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
        const marketid = item.pair.base.asset + "-" + item.pair.quote.asset;
        const market = this._marketList.find((item) => item.id === marketid);
        if (!market) {
          throw new Error(`${this.constructor.name} ${marketid} not found`);
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
    return undefined;
  }

  subscribeTransactions(
    address: string,
    onUpdate: SubscriptionCallBack<Transaction>
  ): Subscription {
    return undefined;
  }

  subscribeAccountUpdate(
    address: string,
    onUpdate: SubscriptionCallBack<AccountUpdateEvent>
  ): Subscription {
    return undefined;
  }
}
