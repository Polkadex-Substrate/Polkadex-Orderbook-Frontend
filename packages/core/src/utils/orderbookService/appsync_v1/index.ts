import { appsyncOperations } from "./writeStrategy";
import { appsyncReader } from "./readStrategy";
import { appsyncSubscriptions } from "./subscriptionStrategy";
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
      this.operation.init(),
      this.query.init(),
      this.subscriber.init(),
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
