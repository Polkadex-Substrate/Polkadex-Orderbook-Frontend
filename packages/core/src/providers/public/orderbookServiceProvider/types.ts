import { PropsWithChildren } from "react";
import {
  OrderbookService,
  Market,
  Asset,
} from "@orderbook/core/utils/orderbookService";

export type OrderbookServiceState = {
  isReady: boolean;
  service?: OrderbookService;
  markets: Market[];
  assets: Asset[];
};

export type OrderbookServiceContextProps = OrderbookServiceState & {
  enable: () => Promise<void>;
};
export type OrderbookServiceProviderProps = PropsWithChildren<{
  value: OrderbookServiceContextProps;
}>;
