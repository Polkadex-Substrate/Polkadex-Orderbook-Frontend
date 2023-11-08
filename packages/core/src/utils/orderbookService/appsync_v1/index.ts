import { appsyncOperations } from "@orderbook/core/utils/orderbookService/appsync_v1/writeStrategy";
import { appsyncReader } from "@orderbook/core/utils/orderbookService/appsync_v1/readStrategy";
import { appsyncSubscriptions } from "@orderbook/core/utils/orderbookService/appsync_v1/subscriptionStrategy";

import {
  OrderbookOperationStrategy,
  OrderbookReadStrategy,
  OrderbookService,
  OrderbookSubscriptionStrategy,
} from "./../interfaces";

type ConstructorArgs = {
  operation: OrderbookOperationStrategy;
  query: OrderbookReadStrategy;
  subscriber: OrderbookSubscriptionStrategy;
};

class AppsyncV1 implements OrderbookService {
  private _isReady: boolean;
  operation: OrderbookOperationStrategy;
  query: OrderbookReadStrategy;
  subscriber: OrderbookSubscriptionStrategy;
  async init(): Promise<void> {
    await Promise.all([
      this.operation.init,
      this.query.init,
      this.subscriber.init,
    ]);
    this._isReady = true;
  }

  isReady(): boolean {
    return this._isReady;
  }

  constructor({ operation, query, subscriber }: ConstructorArgs) {
    this.operation = operation;
    this.query = query;
    this.subscriber = subscriber;
  }
}

export const appsyncOrderbookService = new AppsyncV1({
  operation: appsyncOperations,
  query: appsyncReader,
  subscriber: appsyncSubscriptions,
});
